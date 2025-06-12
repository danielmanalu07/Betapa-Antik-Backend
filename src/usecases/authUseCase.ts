import { AuthRepository } from "../domain/repositories/authRepository";
import { comparePassword, hashPassword } from "../utils/hash";
import Jwt from "jsonwebtoken";
import { HttpError } from "../utils/HttpError";

class AuthUseCase {
  constructor(private repo: AuthRepository) {}

  async register(
    username: string,
    password: string,
    name?: string,
    email?: string
  ) {
    const hashed = await hashPassword(password);
    return await this.repo.createUser({
      username,
      password: hashed,
      name,
      email,
    });
  }

  async login(username: string, password: string) {
    const user = await this.repo.findByUsername(username);
    if (!user) throw new HttpError("User not found", 404);

    const matched = await comparePassword(password, user.password);
    if (!matched) throw new HttpError("Invalid password", 400);

    const token = Jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" }
    );

    return { token, user };
  }

  async logout(token: string) {
    const decoded: any = Jwt.decode(token);
    const expiredAt = new Date(decoded.exp * 1000);
    await this.repo.blaclistToken(token, expiredAt);
  }

  async isTokenBlacklisted(token: string) {
    return await this.repo.isTokenBlacklisted(token);
  }

  async findUser(userId: number) {
    const user = await this.repo.findUser(userId);
    if (!user) throw new HttpError("User not found", 404);
    return user;
  }

  async updateUser(userId: number, data: Partial<any>) {
    const user = await this.repo.findUser(userId);
    if (!user) throw new HttpError("User not found", 404);
    const updated = await this.repo.updateUser(userId, data);
    if (!updated) throw new HttpError("Updated failed", 400);
    return updated;
  }

  async getAllUser() {
    const users = await this.repo.getAllUser();
    return users;
  }

  async updateStatus(id: number, status: boolean) {
    const user = await this.repo.findUser(id);
    if (!user) throw new HttpError("User not found", 404);
    const updated = await this.repo.updateStatus(id, status);
    if (!updated) throw new HttpError("Updated failed", 400);
    return updated;
  }
}

export default AuthUseCase;
