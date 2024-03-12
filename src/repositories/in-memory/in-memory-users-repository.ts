import { Prisma, User } from "@prisma/client";
import { UsersRepository } from "../users-repository";
import { randomUUID } from "crypto";

export class InMemoryUsersRepositories implements UsersRepository {
  public users: User[] = [];

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
    };

    await this.users.push(user);

    return user;
  }

  async findByEmail(email: string) {
    const user = await this.users.find((user) => user.email === email);

    if (!user) {
      return null;
    }

    return user;
  }

  async findById(userId: string): Promise<User | null> {
    const user = await this.users.find((user) => user.id === userId);

    if (!user) {
      return null;
    }

    return user;
  }
}
