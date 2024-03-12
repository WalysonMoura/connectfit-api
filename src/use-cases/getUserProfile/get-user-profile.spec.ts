import { InMemoryUsersRepositories } from "@/repositories/in-memory/in-memory-users-repository";
import { expect, describe, it, beforeEach } from "vitest";
import { GetUserProfileUserCase } from "./get-user-profile";
import { hash } from "bcryptjs";
import { ResourceNotFound } from "../erros/resource-not-found-error";

let usersRepository: InMemoryUsersRepositories;
let sut: GetUserProfileUserCase;

describe("Get User Profile Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepositories();
    sut = new GetUserProfileUserCase(usersRepository);
  });

  it("1", async () => {
    const createUser = await usersRepository.create({
      name: "John",
      email: "john@gmail.com",
      password_hash: await hash("12345", 6),
    });

    const { user } = await sut.execute({ userId: createUser.id });

    expect(user.name).toEqual("John");
  });

  it("2", async () => {
    await expect(async () => {
      await sut.execute({ userId: "non-existing-id" });
    }).rejects.toBeInstanceOf(ResourceNotFound);
  });
});
