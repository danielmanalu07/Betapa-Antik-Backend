import { Video } from "../entities/video";

export interface VideoRepository {
  findAll(): Promise<Video[]>;
  findById(id: number): Promise<Video | null>;
  create(data: Omit<Video, "id" | "createdAt" | "updatedAt">): Promise<Video>;
  update(id: number, data: Partial<Video>): Promise<Video | null>;
  delete(id: number): Promise<void>;
}
