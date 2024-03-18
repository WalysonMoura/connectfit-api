import { CheckInRepository } from "@/repositories/checkin-repository";
import { GymsRepository } from "@/repositories/gyms-repository";
import { expect, describe, it, beforeEach, vi, afterEach } from "vitest";
import { CheckInUseCase } from ".";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-in-repository";
import { InMemoryGymsRepositories } from "@/repositories/in-memory/in-memory-gyms-repository";
import { MaxDistanceError } from "../erros/max-distance-erros";
import { MaxNumberCheckInsError } from "../erros/max-number-check-ins-error";
import { Decimal } from "@prisma/client/runtime/library";

let gymsRepository: InMemoryGymsRepositories;
let checkInsRepository: InMemoryCheckInsRepository;
let sut: CheckInUseCase;

describe("", () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    gymsRepository = new InMemoryGymsRepositories();
    sut = new CheckInUseCase(checkInsRepository, gymsRepository);

    await gymsRepository.create({
      id: "gym-01",
      title: "JavaScript Gym",
      description: "",
      phone: "",
      latitude: -27.2092052,
      longitude: -49.6401091,
    });

    await vi.useFakeTimers();
  });

  afterEach(async () => {
    await vi.useRealTimers();
  });

  it("", async () => {
    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -27.2092052,
      userLongitude: -49.6401091,
    });
    expect(checkIn.id).toEqual(expect.any(String));
  });
  /* 
  it("", async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0, 0));

    await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -27.2092052,
      userLongitude: -49.6401091,
    });

   await expect(async () => {
      await sut.execute({
        gymId: "gym-01",
        userId: "user-01",
        userLatitude: -27.2092052,
        userLongitude: -49.6401091,
      });
    }).rejects.toBeInstanceOf(MaxNumberCheckInsError);
  }); */

  it("", async () => {
    await gymsRepository.create({
      id: "gym-01",
      title: "JavaScript Gym",
      description: "",
      phone: "",
      latitude: -27.0747279,
      longitude: -49.4889672,
    });

    await expect(async () => {
      await sut.execute({
        gymId: "gym-01",
        userId: "user-01",
        userLatitude: -27.2092052,
        userLongitude: -49.6401091,
      });
    }).rejects.toBeInstanceOf(MaxDistanceError);
  });
});
