import { prisma } from "../../config/prisma";
import { Video } from "../../domain/entities/video";
import { VideoRepository } from "../../domain/repositories/video_repository";

export class VideoRepositoryImpl implements VideoRepository {
  async findAll(): Promise<Video[]> {
    return await prisma.video.findMany();
  }
  async findById(id: number): Promise<Video | null> {
    const video = await prisma.video.findUnique({
      where: { id: id },
    });
    return video;
  }
  async create(
    data: Omit<Video, "id" | "createdAt" | "updatedAt">
  ): Promise<Video> {
    const created = await prisma.video.create({
      data: {
        title: data.title,
        url: data.url,
      },
    });
    return created;
  }
  async update(id: number, data: Partial<Video>): Promise<Video | null> {
    const updated = await prisma.video.update({
      where: {
        id: id,
      },
      data: {
        title: data.title,
        url: data.url,
      },
    });

    return updated;
  }
  async delete(id: number): Promise<void> {
    await prisma.video.delete({
      where: {
        id: id,
      },
    });
  }
}

export default VideoRepositoryImpl;
