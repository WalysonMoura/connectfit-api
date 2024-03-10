import { expect, describe, it, beforeEach } from "vitest";
import { RegisterUseCase } from "./register";
import { InMemoryUsersRepositories } from "@/repositories/in-memory/in-memory-users-repository";

let usersRepository;
let sut: RegisterUseCase;

describe("Register Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepositories();
    sut = new RegisterUseCase(usersRepository);
  });

  it("", async () => {
    const {} = sut.execute({});
  });
});
