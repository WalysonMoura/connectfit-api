import { beforeEach, describe, expect, it } from "vitest";
import { GetUserProfileUseCase } from "./get-user-profile";
import { UsersRepository } from "../../repositories/users-repository";
import { InMemoryUsersRepository } from "../../repositories/in-memory/in-memory-users-repository";
import { hash } from "bcryptjs";
import { ResourceNotFoundErro } from "../errors/resource-not-found-error";

let usersRepository: InMemoryUsersRepository;
let sut: GetUserProfileUseCase;

describe("Get User Profile Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new GetUserProfileUseCase(usersRepository);
  });

  it("should be able to get user profile", async () => {
    const createUser = await usersRepository.create({
      name: "John",
      email: "johndoe@example.com",
      password_hash: await hash("12345", 6),
    });

    const { user } = await sut.execute({ userId: createUser.id });
    
  });

  it("should not be able to get user profile with wrong id", async () => {
    await expect(async () => {
      await sut.execute({
        userId: "non-existing-id",
      });
    }).rejects.toBeInstanceOf(ResourceNotFoundErro);
  });
});
