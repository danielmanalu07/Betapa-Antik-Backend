export type Role = "ADMIN" | "TENAGA_PUSKESMAS";

export interface User {
  id: number;
  username: string;
  name: string | null;
  email: string | null;
  password: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}
