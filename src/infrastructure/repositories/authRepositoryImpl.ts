import { prisma } from "../../config/prisma";
import { User } from "../../domain/entities/users";
import { AuthRepository } from "../../domain/repositories/authRepository";

export class AuthRepositoryImpl implements AuthRepository {
  async getAllUser(): Promise<User[]> {
    const users = await prisma.user.findMany({
      where: {
        NOT: {
          role: "ADMIN",
        },
      },
    });
    return users;
  }
  async updateStatus(id: number, status: boolean): Promise<User> {
    const userUpdate = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        status: status,
      },
    });
    return userUpdate;
  }
  async updateUser(userId: number, data: Partial<User>): Promise<User> {
    const updated = await prisma.user.update({
      where: {
        id: userId,
      },
      data,
    });

    return updated as User;
  }
  async findUser(userId: number): Promise<User | null> {
    const foundUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    return foundUser as User;
  }
  async findByUsername(username: string): Promise<User | null> {
    return (await prisma.user.findUnique({
      where: {
        username: username,
      },
    })) as User;
  }
  async createUser(user: Partial<User>): Promise<User> {
    const userCrated = await prisma.user.create({
      data: user as any,
    });

    return userCrated as User;
  }
  async blaclistToken(token: string, expiredAt: Date): Promise<void> {
    await prisma.blacklistedToken.create({
      data: {
        token,
        expiredAt,
      },
    });
  }
  async isTokenBlacklisted(token: string): Promise<boolean> {
    const blackListed = await prisma.blacklistedToken.findUnique({
      where: {
        token: token,
      },
    });
    return !!blackListed;
  }
}
