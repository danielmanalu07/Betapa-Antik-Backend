import { prisma } from "../../config/prisma";
import { Mosquito } from "../../domain/entities/mosquito";
import { MosquitoRepository } from "../../domain/repositories/mosquito_repository";

export class MosquitoRepositoryImpl implements MosquitoRepository {
  async findAll(): Promise<Mosquito[]> {
    const mosquitos = await prisma.mosquito.findMany({
      include: {
        images: {
          select: {
            image: true,
          },
        },
      },
    });
    const mapped = mosquitos.map((mosquito) => ({
      ...mosquito,
      images: mosquito.images?.map((img) => img.image) || [],
    }));

    return mapped;
  }
  async findById(id: number): Promise<Mosquito | null> {
    const mosquito = await prisma.mosquito.findUnique({
      where: {
        id: id,
      },
      include: {
        images: {
          select: {
            image: true,
          },
        },
      },
    });

    if (!mosquito) return null;

    const mapped = {
      ...mosquito,
      images: mosquito.images.map((img) => img.image) || [],
    };

    return mapped;
  }
  async create(
    data: Omit<Mosquito, "id" | "createdAt" | "updatedAt" | "images">,
    imagePaths: string[]
  ): Promise<Mosquito> {
    const mosquito = await prisma.mosquito.create({
      data: {
        title: data.title,
      },
    });
    const createdImages = await prisma.image.createMany({
      data: imagePaths.map((path) => ({
        imagePath: path,
      })),
    });

    const images = await prisma.image.findMany({
      where: {
        imagePath: {
          in: imagePaths,
        },
      },
    });

    await prisma.mosquitoImage.createMany({
      data: images.map((img) => ({
        mosquitoId: mosquito.id,
        imageId: img.id,
      })),
    });

    const result = await prisma.mosquito.findUnique({
      where: { id: mosquito.id },
      include: {
        images: {
          select: {
            image: true,
          },
        },
      },
    });

    const mapped = {
      ...result!,
      images: result?.images.map((img) => img.image),
    };

    return mapped;
  }
  async update(
    id: number,
    data: Partial<Omit<Mosquito, "id" | "createdAt" | "updatedAt" | "images">>,
    newImages?: string[],
    imageIdsToUnlink?: number[]
  ): Promise<Mosquito | null> {
    const updateMosquito = await prisma.mosquito.update({
      where: { id: id },
      data: {
        title: data.title,
      },
    });

    if (imageIdsToUnlink && imageIdsToUnlink.length > 0) {
      await prisma.mosquitoImage.deleteMany({
        where: {
          mosquitoId: id,
          imageId: { in: imageIdsToUnlink },
        },
      });
    }

    if (newImages && newImages.length > 0) {
      const createdImages = await prisma.image.createMany({
        data: newImages.map((path) => ({
          imagePath: path,
        })),
        skipDuplicates: true,
      });

      const images = await prisma.image.findMany({
        where: {
          imagePath: {
            in: newImages,
          },
        },
      });

      await prisma.mosquitoImage.createMany({
        data: images.map((img) => ({
          mosquitoId: id,
          imageId: img.id,
        })),
        skipDuplicates: true,
      });
    }

    const mosquitoWithImages = await prisma.mosquito.findUnique({
      where: { id },
      include: {
        images: {
          select: {
            image: true,
          },
        },
      },
    });

    if (!mosquitoWithImages) return null;

    const mapped = {
      ...mosquitoWithImages,
      images: mosquitoWithImages.images.map((img) => img.image),
    };

    return mapped;
  }
  async delete(id: number): Promise<void> {
    await prisma.mosquitoImage.deleteMany({
      where: { mosquitoId: id },
    });
    await prisma.mosquito.delete({ where: { id: id } });
  }
}
