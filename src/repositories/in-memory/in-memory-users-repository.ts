import { Prisma,  User } from "@prisma/client";
import { UsersRepository } from "../users-repository";
import { randomUUID } from "crypto";

export class InMemoryUsersRepositories implements UsersRepository {
  public users: User[] = [];

  async create({ email, name, password_hash }: Prisma.UserCreateInput) {
    const user: User = {
      id: randomUUID(),
      name,
      email,
      password_hash,
      created_at: new Date(),
    };

    await this.users.push(user);

    return user;
  }

  async findByEmail(email: string) {
    const user = this.users.find((user) => {
      user.email === email;
    });

    if (!user) {
      return null;
    }

    return user;
  }
}
