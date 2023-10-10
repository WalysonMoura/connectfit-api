import { beforeEach, describe, expect, it } from "vitest";
import { GetUserProfileUseCase } from "./get-user-profile";
import { UsersRepository } from "../../repositories/users-repository";
import { InMemoryUsersRepository } from "../../repositories/in-memory/in-memory-users-repository";
import { hash } from "bcryptjs";
import { ResourceNotFoundErro } from "../errors/resource-not-found-error";
import { AuthenticateUseCase } from "./authenticate";
import { invalidCredentialsError } from "../errors/invalid-credentials-error";

let usersRepository: InMemoryUsersRepository;
let sut: AuthenticateUseCase;

describe("Authenticate Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new AuthenticateUseCase(usersRepository);
  });

  it("should ", async () => {
    const createUser = await usersRepository.create({
      name: "John",
      email: "johndoe@example.com",
      password_hash: await hash("12345", 6),
    });

    await expect(async () => {
      const { user } = await sut.execute({
        email: createUser.email,
        password: createUser.email,
      });
    });
  });

  it("should be able to authenticate ", async () => {
    const createUser = await usersRepository.create({
      name: "John",
      email: "johndoe@example.com",
      password_hash: await hash("12345", 6),
    });

    await expect(createUser.id).toEqual(expect.any(String));
  });

  it("should not be able to authenticate with wrong email ", async () => {
    await expect(async () => {
      await sut.execute({
        email: "johndoe@example.com",
        password: "12345678",
      });
    }).rejects.toBeInstanceOf(invalidCredentialsError);
  });

  it("", async () => {
    const createUser = await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: await hash("12345678", 6),
    });

    await expect( () => {
      sut.execute({ email: createUser.email, password: "123123" });
    }).rejects.toBeInstanceOf(invalidCredentialsError);
  });
});
