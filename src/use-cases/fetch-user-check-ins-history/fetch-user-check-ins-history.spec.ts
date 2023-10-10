import { beforeAll, beforeEach, describe, expect, it } from "vitest";
import { FetchUserCheckInsHistoryUseCase } from "./fetch-user-check-ins-history";

let checkInsRepository: InM;
let sut: FetchUserCheckInsHistoryUseCase;

describe("Create Gym Use Case", () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new CreateGymUseCase(gymsRepository);
  });

  it("should to create use case", async () => {
    const { gym } = await sut.execute({
      title: "JavaScripr Gym",
      description: "",
      phone: "123",
      latitude: -27.2092052,
      longitude: -49.6401091,
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});
