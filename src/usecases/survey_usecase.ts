import { Survey } from "@prisma/client";
import { SurveyRepository } from "../domain/repositories/survey_repository";
import { HttpError } from "../utils/HttpError";

class SurveyUseCase {
  constructor(private repo: SurveyRepository) {}

  async getAll(healthCenterId: number) {
    const surveys = await this.repo.findAll(healthCenterId);
    if (!surveys) {
      throw new HttpError("Survey list is empty!", 404);
    }
    return surveys;
  }

  async getById(id: number) {
    const survey = await this.repo.findById(id);
    if (!survey) {
      throw new HttpError("Survey not found!", 404);
    }
    return survey;
  }

  async create(data: Omit<Survey, "id" | "createdAt" | "updatedAt">) {
    const created = await this.repo.create(data);
    if (!created) throw new HttpError("Creation failed", 400);
    return created;
  }

  async update(id: number, data: Partial<Survey>) {
    const survey = await this.repo.findById(id);
    if (!survey) throw new HttpError("Survey not found!", 404);
    const updated = await this.repo.update(id, data);
    if (!updated) throw new HttpError("Update failed", 400);
    return updated;
  }

  async delete(id: number) {
    return await this.repo.delete(id);
  }

  async updateImage(id: number, fileName: string) {
    return await this.repo.updateImage(id, fileName);
  }
}

export default SurveyUseCase;
