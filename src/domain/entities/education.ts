import { Image } from "./image";

export interface Education {
  id: number;
  title: string;
  images?: Image[];
  createdAt: Date;
  updatedAt: Date;
}
