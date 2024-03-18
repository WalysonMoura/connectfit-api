import { CheckInRepository } from "@/repositories/checkin-repository";
import { CheckIn } from "@prisma/client";
import { ResourceNotFound } from "../erros/resource-not-found-error";
import dayjs from "dayjs";
import { LateCheckInValidateError } from "../erros/late-check-in-validate-error";

interface ValidateCheckInsUseCaseRequest {
  checkInId: string;
}

interface ValidateCheckInsUseCaseResponse {
  checkIn: CheckIn;
}

class ValidateCheckInsUseCase {
  constructor(private checkInsRepository: CheckInRepository) {}

  async execute({
    checkInId,
  }: ValidateCheckInsUseCaseRequest): Promise<ValidateCheckInsUseCaseResponse> {
    const checkIn = await this.checkInsRepository.findById(checkInId);

    if (!checkIn) {
      throw new ResourceNotFound();
    }

    const distaceInMinutesFromInCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      "minutes"
    );

    if (distaceInMinutesFromInCreation > 20) {
      throw new LateCheckInValidateError();
    }

    checkIn.validated_at = new Date();

    await this.checkInsRepository.save(checkIn);

    return {
      checkIn,
    };
  }
}
