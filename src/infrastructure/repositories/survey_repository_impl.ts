import { Survey } from "@prisma/client";
import { prisma } from "../../config/prisma";
import { SurveyRepository } from "../../domain/repositories/survey_repository";

export class SurveyRepositoryImpl implements SurveyRepository {
  async updateImage(id: number, fileName: string): Promise<Survey | null> {
    return await prisma.survey.update({
      where: { id },
      data: { bukti_gambar: fileName },
    });
  }
  async findAll(healthCenterId: number): Promise<Survey[]> {
    return await prisma.survey.findMany({
      where: {
        healthCenterId: healthCenterId,
      },
    });
  }
  async findById(id: number): Promise<Survey | null> {
    const data = await prisma.survey.findUnique({
      where: {
        id: id,
      },
    });
    return data;
  }
  async create(
    data: Omit<Survey, "id" | "createdAt" | "updatedAt">
  ): Promise<Survey> {
    const created = await prisma.survey.create({
      data: data,
    });
    return created;
  }
  async update(id: number, data: Partial<Survey>): Promise<Survey | null> {
    const updated = await prisma.survey.update({
      where: {
        id: id,
      },
      data: data,
    });
    return updated;
  }
  async delete(id: number): Promise<void> {
    await prisma.survey.delete({ where: { id: id } });
  }
}
