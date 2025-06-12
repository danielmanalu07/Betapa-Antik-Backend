import { EducationRepository } from "../domain/repositories/education_repository";
import { HttpError } from "../utils/HttpError";
import { Education } from "../domain/entities/education";

class EducationUsecase {
  constructor(private repo: EducationRepository) {}

  async getAll(): Promise<Education[]> {
    const educations = await this.repo.findAll();
    const data = educations.map((education) => ({
      ...education,
      images:
        education.images?.map((imgWrapper) => ({
          id: imgWrapper.id,
          imagePath: imgWrapper.imagePath,
          createdAt: imgWrapper.createdAt,
          updatedAt: imgWrapper.updatedAt,
        })) || [],
    }));
    return data;
  }

  async getById(id: number): Promise<Education> {
    const education = await this.repo.findById(id);
    if (!education) throw new HttpError("Education not found", 404);
    return education;
  }

  async create(
    data: Omit<Education, "id" | "createdAt" | "updatedAt">,
    imagePaths: string[]
  ): Promise<Education> {
    const newEducation = await this.repo.create(data, imagePaths);
    return newEducation;
  }

  async update(
    id: number,
    data: Partial<Omit<Education, "images" | "createdAt" | "updatedAt">>,
    imagePathsToLink?: string[],
    imageIdsToUnlink?: number[]
  ) {
    const existingEducation = await this.repo.findById(id);
    if (!existingEducation) throw new HttpError("Education not found", 404);

    const updatedEducation = await this.repo.update(
      id,
      data,
      imagePathsToLink,
      imageIdsToUnlink
    );
    if (!updatedEducation)
      throw new HttpError("Failed to update education", 400);
    const res = {
      ...updatedEducation,
    };

    return res;
  }

  async delete(id: number) {
    const existingEducation = await this.repo.findById(id);
    if (!existingEducation) throw new HttpError("Education not found", 404);
    return await this.repo.delete(id);
  }
}

export default EducationUsecase;
