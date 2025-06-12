import { Mosquito } from "../domain/entities/mosquito";
import { MosquitoRepository } from "../domain/repositories/mosquito_repository";
import { HttpError } from "../utils/HttpError";

class MosquitoUsecase {
  constructor(private repo: MosquitoRepository) {}

  async getAll(): Promise<Mosquito[]> {
    const mosquitos = await this.repo.findAll();
    const data = mosquitos.map((mosquito) => ({
      ...mosquito,
      images:
        mosquito.images?.map((img) => ({
          id: img.id,
          imagePath: img.imagePath,
          createdAt: img.createdAt,
          updatedAt: img.updatedAt,
        })) || [],
    }));
    return data;
  }

  async getById(id: number): Promise<Mosquito> {
    const mosquito = await this.repo.findById(id);
    if (!mosquito) throw new HttpError("Mosquito Not Found", 404);
    return mosquito;
  }

  async create(
    data: Omit<Mosquito, "id" | "createdAt" | "updatedAt">,
    imagePaths: string[]
  ): Promise<Mosquito> {
    const newMosquito = await this.repo.create(data, imagePaths);
    return newMosquito;
  }

  async update(
    id: number,
    data: Partial<Omit<Mosquito, "images" | "createdAt" | "updatedAt">>,
    newImages?: string[],
    imageIdsToUnlink?: number[]
  ) {
    const existingMosquito = await this.repo.findById(id);
    if (!existingMosquito) throw new HttpError("Mosquito Not Found", 404);

    const updatedMosquito = await this.repo.update(
      id,
      data,
      newImages,
      imageIdsToUnlink
    );

    if (!updatedMosquito) throw new HttpError("Failed to update mosquito", 400);
    const res = {
      ...updatedMosquito,
    };

    return res;
  }

  async delete(id: number) {
    const existingMosquito = await this.repo.findById(id);
    if (!existingMosquito) throw new HttpError("Mosquito Not Found", 404);
    return await this.repo.delete(id);
  }
}

export default MosquitoUsecase;
