import { InMemoryUsersRepositories } from "@/repositories/in-memory/in-memory-users-repository";
import { expect, describe, it, beforeEach } from "vitest";
import { AuthenticateUseCase } from ".";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "../erros/invalid-credentials-error";

let userRepository: InMemoryUsersRepositories;
let sut: AuthenticateUseCase;

describe("", () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepositories();
    sut = new AuthenticateUseCase(userRepository);
  });

  it("", async () => {
    await userRepository.create({
      name: "John",
      email: "John@gmail.com",
      password_hash: await hash("12345", 6),
    });

    const { user } = await sut.execute({
      email: "John@gmail.com",
      password: "12345",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("", async () => {
    await userRepository.create({
      name: "John",
      email: "john@gmail.com",
      password_hash: await hash("12345", 6),
    });

    await expect(async () => {
      await sut.execute({
        email: "john@mgmail.com",
        password: "12345",
      });
    }).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("", async () => {
    await expect(async () => {
      await sut.execute({ email: "john@gmail.com", password: "12345" });
    }).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
