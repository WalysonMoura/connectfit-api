import { expect, describe, it, beforeEach } from "vitest";
import { CreateGymUseCase } from ".";
import { InMemoryGymsRepositories } from "@/repositories/in-memory/in-memory-gyms-repository";

let gymsRepository: InMemoryGymsRepositories;
let sut: CreateGymUseCase;

describe("Create Gym Use Case", () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepositories();
    sut = new CreateGymUseCase(gymsRepository);
  });

  it("should be able to create gum", async () => {
    const { gym } = await sut.execute({
      title: "JavaScript Gym",
      description: null,
      latitude: "-27.2092052",
      longitude: "-49.6401091",
      phone: null,
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});
