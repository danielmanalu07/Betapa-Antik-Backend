import { Image } from "./image";

export interface Mosquito {
  id: number;
  title: string;
  images?: Image[];
  createdAt: Date;
  updatedAt: Date;
}
