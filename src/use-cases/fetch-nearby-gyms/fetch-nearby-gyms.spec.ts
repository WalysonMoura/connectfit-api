import { InMemoryGymsRepositories } from "@/repositories/in-memory/in-memory-gyms-repository";
import { expect, describe, it, beforeEach } from "vitest";
import { FetchNearbyGymsUseCase } from ".";

let gymsRepository: InMemoryGymsRepositories;
let sut: FetchNearbyGymsUseCase;

describe("", () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepositories();
    sut = new FetchNearbyGymsUseCase(gymsRepository);
  });

  it("", async () => {
    await gymsRepository.create({
      title: "Near Gym",
      description: null,
      phone: null,
      latitude: -27.2092052,
      longitude: -49.6401091,
    });

    await gymsRepository.create({
      title: "Far Gym",
      description: null,
      phone: null,
      latitude: -27.2092052,
      longitude: -49.6401091,
    });

    const { gyms } = await sut.execute({
      userLatitude: -27.2092052,
      userLogitude: -49.6401091,
    });


    
  });
});
