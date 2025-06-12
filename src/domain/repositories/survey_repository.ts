import { Survey } from "@prisma/client";

export interface SurveyRepository {
  findAll(healthCenterId: number): Promise<Survey[]>;
  findById(id: number): Promise<Survey | null>;
  create(data: Omit<Survey, "id" | "createdAt" | "updatedAt">): Promise<Survey>;
  update(id: number, data: Partial<Survey>): Promise<Survey | null>;
  delete(id: number): Promise<void>;
  updateImage(id: number, fileName: string): Promise<Survey | null>;
}
