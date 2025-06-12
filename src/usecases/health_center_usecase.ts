import { HealthCenter } from "@prisma/client";
import { HealthCenterRepository } from "../domain/repositories/health_center_repository";
import { HttpError } from "../utils/HttpError";

class HealthCenterUsecase {
  constructor(private repo: HealthCenterRepository) {}

  async getAll() {
    const healthCenters = await this.repo.findAll();
    if (!healthCenters) {
      throw new HttpError("Health Center Is Empty!", 404);
    }
    return healthCenters;
  }

  async getById(id: number) {
    const healthCenter = await this.repo.findById(id);
    if (!healthCenter) {
      throw new HttpError("Health Center Not Found!", 404);
    }
    return healthCenter;
  }

  async create(data: Omit<HealthCenter, "id" | "createdAt" | "updatedAt">) {
    const created = await this.repo.create(data);
    if (!created) throw new HttpError("Created Failed", 400);
    return created;
  }

  async update(id: number, data: Partial<HealthCenter>) {
    const healthCenter = await this.repo.findById(id);
    if (!healthCenter) throw new HttpError("Health Center Not Found!", 404);
    const updated = await this.repo.update(id, data);
    if (!updated) throw new HttpError("Updated failed", 400);
    return updated;
  }

  async delete(id: number) {
    return await this.repo.delete(id);
  }

  async updateImage(id: number, fileName: string) {
    return await this.repo.updateImage(id, fileName);
  }
}

export default HealthCenterUsecase;
