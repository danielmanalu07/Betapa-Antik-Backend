import { HealthCenter } from "@prisma/client";

export interface HealthCenterRepository {
  findAll(): Promise<HealthCenter[]>;
  findById(id: number): Promise<HealthCenter | null>;
  create(
    data: Omit<HealthCenter, "id" | "createdAt" | "updatedAt">
  ): Promise<HealthCenter>;
  update(id: number, data: Partial<HealthCenter>): Promise<HealthCenter | null>;
  delete(id: number): Promise<void>;
  updateImage(id: number, fileName: string): Promise<HealthCenter | null>;
}
