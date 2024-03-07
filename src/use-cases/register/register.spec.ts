import { beforeEach, describe } from "vitest";
import { InMemoryUserRepositories } from "../../repositories/in-memory/in-memory-users-repositories";
import { RegisterUseCase } from "./register";

let userRepository: InMemoryUserRepositories;
let sut: RegisterUseCase;

describe("Register Use Case", () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepositories();
    sut = new RegisterUseCase(userRepository);
  });
});
