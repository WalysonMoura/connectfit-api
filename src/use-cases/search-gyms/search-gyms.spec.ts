import { InMemoryGymsRepositories } from "@/repositories/in-memory/in-memory-gyms-repository";
import { expect, describe, it, beforeEach } from "vitest";
import { SearchGymUseCase } from ".";

let gymRepository: InMemoryGymsRepositories;
let sut: SearchGymUseCase;

describe("", () => {
  beforeEach(async () => {
    gymRepository = new InMemoryGymsRepositories();
    sut = new SearchGymUseCase(gymRepository);
  });

  it("", async () => {
    await gymRepository.create({
      title: "JavaScript Gym",
      description: null,
      phone: null,
      latitude: -27.2092052,
      longitude: -49.6401091,
    });

    await gymRepository.create({
      title: "TypeScript Gym",
      description: null,
      phone: null,
      latitude: -27.2092052,
      longitude: -49.6401091,
    });

    const { gyms } = await sut.execute({ page: 1, query: "JavaScript Gym" });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([
      expect.objectContaining({ title: "JavaScript Gym" }),
    ]);
  });

  it("", async () => {
    for (let i = 1; i <= 22; i++) {
      await gymRepository.create({
        title: `JavaScript Gym ${i}`,
        description: null,
        phone: null,
        latitude: -27.2092052,
        longitude: -49.6401091,
      });
    }

    const { gyms } = await sut.execute({
      page: 2,
      query: "JavaScript",
    });


    console.log(gyms);
    
   // expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ title: "JavaScript Gym 21" }),
      expect.objectContaining({ title: "JavaScript Gym 22" })
    ]);
  });
});
