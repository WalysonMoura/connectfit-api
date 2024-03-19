import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-in-repository";
import { expect, describe, it, beforeEach, vi, afterEach } from "vitest";
import { ValidateCheckInsUseCase } from ".";
import { LateCheckInValidateError } from "../erros/late-check-in-validate-error";

let checkInRepository: InMemoryCheckInsRepository;
let sut: ValidateCheckInsUseCase;

describe("", () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInsRepository();
    sut = new ValidateCheckInsUseCase(checkInRepository);

    await vi.useFakeTimers();
  });

  afterEach(async () => {
    await vi.useRealTimers();
  });

  it("", async () => {
    const createdCheckIn = await checkInRepository.create({
      gym_id: "gym-01",
      user_id: "user-01",
    });

    const { checkIn } = await sut.execute({ checkInId: createdCheckIn.id });

    expect(checkIn.validated_at).toEqual(expect.any(Date));
    expect(checkInRepository.checkIns[0].validated_at).toEqual(
      expect.any(Date)
    );
  });

  it("", async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 13, 40));

    const createdCheckIn = await checkInRepository.create({
      gym_id: "gym-01",
      user_id: "user-01",
    });

    const twentyOneMinutesInMs = 1000 * 60 * 21;

    vi.advanceTimersByTime(twentyOneMinutesInMs);

    await expect(async () => {
      await sut.execute({ checkInId: createdCheckIn.id });
    }).rejects.toBeInstanceOf(LateCheckInValidateError);
  });
});
