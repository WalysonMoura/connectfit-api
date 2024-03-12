import { expect, describe, it, beforeEach } from "vitest";
import { RegisterUseCase } from "./register";
import { InMemoryUsersRepositories } from "@/repositories/in-memory/in-memory-users-repository";
import { compare } from "bcryptjs";
import { UserAlreadyExists } from "../erros/user-already-exists";

let usersRepository: InMemoryUsersRepositories;
let sut: RegisterUseCase;

describe("Register Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepositories();
    sut = new RegisterUseCase(usersRepository);
  });

  it("should be able to register", async () => {
    const { user } = await sut.execute({
      email: "john@gmail.com",
      name: "John",
      password: "12345",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("", async () => {
    const { user } = await sut.execute({
      name: "John",
      email: "john@gmail.com",
      password: "12345",
    });

    const isPasswordCorrectYHashed = await compare("12345", user.password_hash);

    expect(isPasswordCorrectYHashed).toBeTruthy();
  });

  it("", async () => {
    const email = "john@gmail.com";

    await sut.execute({
      name: "john",
      email,
      password: "12345",
    });

    await expect(async () => {
      await sut.execute({
        name: "john",
        email,
        password: "12345",
      });
    }).rejects.toBeInstanceOf(UserAlreadyExists);
  });
});
