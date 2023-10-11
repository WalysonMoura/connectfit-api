import { ChechIn, Gym } from "@prisma/client";
import { CheckInsRepository } from "../../repositories/check-ins-repository";
import { ResourceNotFoundErro } from "../errors/resource-not-found-error";

interface ValidateCheckInUseCaseRequest {
  checkInId: string;
}

interface ValidateCheckInUseCaseResponse {
  checIn: ChechIn;
}

export class ValidateCheckInUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    checkInId,
  }: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse> {
    const checkIn = await this.checkInsRepository.findById(checkInId);

    if (!checkIn) {
      throw new ResourceNotFoundErro();
    }

    return {
      checkIn,
    };
  }
}
