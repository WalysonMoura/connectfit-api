import { describe, beforeEach, it, expect } from "vitest";
import { UsersRepository } from "../../repositories/users-repository";
import { AuthenticateUseCase } from "./authenticate";
import { InMemoryUsersRepository } from "../../repositories/in-memory/in-memory-users-repository";
import { hash } from "bcryptjs";
import { invalidCredentialsError } from "../errors/invalid-credentials-error";

let usersRepository: UsersRepository;
let sut: AuthenticateUseCase;

describe("Authenticate UseCase", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new AuthenticateUseCase(usersRepository);
  });

  it("should not be possible to authenticate with the wrong email", async () => {
    await expect(async () => {
      await sut.execute({
        email: "johndoe@example.com",
        password: "12345",
      });
    });
  });

  it("it should not be possible to authenticate with the wrong password", async () => {
    await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: await hash("12345", 6),
    });

    await expect(async () => {
      await sut.execute({
        email: "johndoe@example.com",
        password: "123",
      });
    }).rejects.toBeInstanceOf(invalidCredentialsError);
  });

  it("should be able to authenticate", async () => {
    await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: await hash("123456", 6),
    });

    const { user } = await sut.execute({
      email: "johndoe@example.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });
});
