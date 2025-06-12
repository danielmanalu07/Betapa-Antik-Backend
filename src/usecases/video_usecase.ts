import { Video } from "../domain/entities/video";
import { VideoRepository } from "../domain/repositories/video_repository";
import { HttpError } from "../utils/HttpError";

class VideoUsecase {
  constructor(private repo: VideoRepository) {}

  async getAll() {
    const videos = await this.repo.findAll();
    if (!videos) {
      throw new HttpError("Video is empty", 404);
    }
    return videos;
  }

  async getById(id: number) {
    const video = await this.repo.findById(id);
    if (!video) {
      throw new HttpError("Video Not Found", 404);
    }
    return video;
  }

  async create(data: Omit<Video, "id" | "createdAt" | "updatedAt">) {
    const created = await this.repo.create(data);
    if (!created) throw new HttpError("Created Failed", 400);
    return created;
  }

  async update(id: number, data: Partial<Video>) {
    const video = await this.repo.findById(id);
    if (!video) throw new HttpError("Video Not Found", 404);
    const updated = await this.repo.update(id, data);
    if (!updated) throw new HttpError("Updated Failed", 400);
    return updated;
  }

  async delete(id: number) {
    return await this.repo.delete(id);
  }
}

export default VideoUsecase;
