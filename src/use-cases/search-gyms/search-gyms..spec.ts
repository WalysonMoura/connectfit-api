import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryGymsRepository } from "../../repositories/in-memory/in-memory-gyms-repository";
import { SearchGymsUseCase } from "./search-gyms";

let gymsRepository: InMemoryGymsRepository;
let sut: SearchGymsUseCase;

describe("", () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new SearchGymsUseCase(gymsRepository);
  });

  it("", async () => {
    await gymsRepository.create({
      title: "JavaScript Gym",
      description: "",
      phone: "85921212121",
      latitude: "-27.2092052",
      longitude: "-49.6401091",
    });

    const { gyms } = await sut.execute({
      page: 1,
      query: "JavaScript",
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([
      expect.objectContaining({ title: "JavaScript Gym" }),
    ]);
  });

  it("", async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `JavaScript Gym ${i}`,
        description: "",
        phone: "",
        latitude: "-27.2092052",
        longitude: "-49.6401091",
      });
    }

    const { gyms } = await sut.execute({
      page: 2,
      query: "JavaScript",
    });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ title: "JavaScript Gym 21" }),
      expect.objectContaining({ title: "JavaScript Gym 22" }),
    ]);
  });
});
