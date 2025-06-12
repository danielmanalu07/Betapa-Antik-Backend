import { Mosquito } from "../entities/mosquito";

export interface MosquitoRepository {
  findAll(): Promise<Mosquito[]>;
  findById(id: number): Promise<Mosquito | null>;
  create(
    data: Omit<Mosquito, "id" | "createdAt" | "updatedAt" | "images">,
    imagePaths: string[]
  ): Promise<Mosquito>;
  update(
    id: number,
    data: Partial<Omit<Mosquito, "id" | "createdAt" | "updatedAt" | "images">>,
    newImages?: string[],
    imageIdsToUnlink?: number[]
  ): Promise<Mosquito | null>;
  delete(id: number): Promise<void>;
}
