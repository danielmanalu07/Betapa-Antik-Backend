import { User } from "../entities/users";

export interface AuthRepository {
  findByUsername(username: string): Promise<User | null>;
  createUser(user: Partial<User>): Promise<User>;
  blaclistToken(token: string, expiredAt: Date): Promise<void>;
  isTokenBlacklisted(token: string): Promise<boolean>;
  findUser(userId: number): Promise<User | null>;
  updateUser(userId: number, data: Partial<User>): Promise<User>;

  getAllUser(): Promise<User[]>;
  updateStatus(id: number, status: boolean): Promise<User>;
}
