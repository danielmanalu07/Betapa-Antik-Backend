import { prisma } from "../../config/prisma";
import { Education } from "../../domain/entities/education";
import { EducationRepository } from "../../domain/repositories/education_repository";

export class EducationRepositoryImpl implements EducationRepository {
  async findAll(): Promise<Education[]> {
    const educations = await prisma.education.findMany({
      include: {
        images: {
          select: {
            image: true,
          },
        },
      },
    });
    const mapped = educations.map((education) => ({
      ...education,
      images: education.images?.map((ei) => ei.image) || [],
    }));

    return mapped;
  }
  async findById(id: number): Promise<Education | null> {
    const education = await prisma.education.findUnique({
      where: { id },
      include: {
        images: {
          select: {
            image: true,
          },
        },
      },
    });

    if (!education) return null;

    return {
      ...education,
      images: education.images?.map((ei) => ei.image) || [],
    };
  }

  async create(
    data: Omit<Education, "id" | "createdAt" | "updatedAt">,
    imagePaths: string[]
  ): Promise<Education> {
    const education = await prisma.education.create({
      data: {
        title: data.title,
      },
    });
    // Step 2: create Images
    const createdImages = await prisma.image.createMany({
      data: imagePaths.map((path) => ({
        imagePath: path,
      })),
      skipDuplicates: true,
    });
    // Step 3: fetch created images
    const images = await prisma.image.findMany({
      where: {
        imagePath: {
          in: imagePaths,
        },
      },
    });

    // Step 4: create relation in EducationImage
    await prisma.educationImage.createMany({
      data: images.map((img) => ({
        educationId: education.id,
        imageId: img.id,
      })),
    });

    // Step 5: return with included images
    const result = await prisma.education.findUnique({
      where: { id: education.id },
      include: {
        images: {
          select: {
            image: true,
          },
        },
      },
    });

    return {
      ...result!,
      images: result!.images.map((ei) => ei.image),
    };
  }

  async update(
    id: number,
    data: Partial<Omit<Education, "images" | "createdAt" | "updatedAt">>,
    imagePathsToLink?: string[],
    imageIdsToUnlink?: number[]
  ): Promise<Education | null> {
    // Step 1: Update data Education
    const updatedEducation = await prisma.education.update({
      where: { id },
      data: {
        title: data.title,
      },
    });

    // Step 2: Hapus relasi yang tidak diinginkan
    if (imageIdsToUnlink && imageIdsToUnlink.length > 0) {
      await prisma.educationImage.deleteMany({
        where: {
          educationId: id,
          imageId: { in: imageIdsToUnlink },
        },
      });
    }

    // Step 3: Tambahkan gambar baru dan relasinya
    if (imagePathsToLink && imagePathsToLink.length > 0) {
      // Buat gambar baru
      const createdImages = await prisma.image.createMany({
        data: imagePathsToLink.map((path) => ({
          imagePath: path,
        })),
        skipDuplicates: true,
      });

      // Ambil gambar yang baru dibuat
      const images = await prisma.image.findMany({
        where: {
          imagePath: {
            in: imagePathsToLink,
          },
        },
      });

      // Buat relasi di EducationImage
      await prisma.educationImage.createMany({
        data: images.map((img) => ({
          educationId: id,
          imageId: img.id,
        })),
        skipDuplicates: true,
      });
    }

    // Step 4: Ambil data Education yang diperbarui dengan gambar
    const educationWithImages = await prisma.education.findUnique({
      where: { id },
      include: {
        images: {
          select: {
            image: true,
          },
        },
      },
    });

    if (!educationWithImages) return null;

    return {
      ...educationWithImages,
      images: educationWithImages.images.map((ei) => ei.image),
    };
  }

  async delete(id: number): Promise<void> {
    await prisma.educationImage.deleteMany({
      where: { educationId: id },
    });
    await prisma.education.delete({ where: { id: id } });
  }
}
