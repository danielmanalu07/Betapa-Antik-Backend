import { Education } from "../entities/education";

export interface EducationRepository {
  findAll(): Promise<Education[]>;
  findById(id: number): Promise<Education | null>;
  create(
    data: Omit<Education, "id" | "createdAt" | "updatedAt" | "images">,
    imagePaths: string[] // To create and link images
  ): Promise<Education>;
  update(
    id: number,
    data: Partial<Omit<Education, "images" | "createdAt" | "updatedAt">>,
    imagePathsToLink?: string[],
    imageIdsToUnlink?: number[]
  ): Promise<Education | null>;
  delete(id: number): Promise<void>;
}
