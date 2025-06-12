import { HealthCenter } from "@prisma/client";
import { HealthCenterRepository } from "../../domain/repositories/health_center_repository";
import { prisma } from "../../config/prisma";

export class HealthCenterRepositoryImpl implements HealthCenterRepository {
  async updateImage(
    id: number,
    fileName: string
  ): Promise<HealthCenter | null> {
    return await prisma.healthCenter.update({
      where: { id },
      data: { image: fileName },
    });
  }
  async findAll(): Promise<HealthCenter[]> {
    return await prisma.healthCenter.findMany();
  }
  async findById(id: number): Promise<HealthCenter | null> {
    const data = await prisma.healthCenter.findUnique({
      where: {
        id: id,
      },
    });
    return data;
  }
  async create(
    data: Omit<HealthCenter, "id" | "createdAt" | "updatedAt">
  ): Promise<HealthCenter> {
    const dataCreated = await prisma.healthCenter.create({
      data: {
        name: data.name,
        image: data.image,
      },
    });
    return dataCreated;
  }
  async update(
    id: number,
    data: Partial<HealthCenter>
  ): Promise<HealthCenter | null> {
    const updated = await prisma.healthCenter.update({
      where: {
        id: id,
      },
      data: {
        name: data.name,
        image: data.image,
      },
    });
    return updated;
  }
  async delete(id: number): Promise<void> {
    await prisma.healthCenter.delete({ where: { id: id } });
  }
}
