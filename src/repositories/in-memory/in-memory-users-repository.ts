import { Prisma, $Enums, User } from "@prisma/client";
import { UsersRepository } from "../users-repository";
import { randomUUID } from "crypto";

export class InMemoryUsersRepositories implements UsersRepository {
  public users: User[] = [];

  async create({ email, name, password_hash }: Prisma.UserCreateInput) {
    const user = {
      id: randomUUID(),
      name,
      email,
      password_hash,
      created_at: new Date(),
    };

    return user;
  }
}
