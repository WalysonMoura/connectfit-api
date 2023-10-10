import { ChechIn, Gym } from "@prisma/client";
import { GymsRepository } from "../../repositories/gyms-repository";
import { CheckInsRepository } from "../../repositories/check-ins-repository";

interface FetchUserCheckInsHistoryUseCaseRequest {
  userId: string;
  page: number;
}

interface FetchUserCheckInsHistoryUseCaseRespose {
  checkIns: ChechIn[];
}

export class FetchUserCheckInsHistoryUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    page,
    userId,
  }: FetchUserCheckInsHistoryUseCaseRequest): Promise<FetchUserCheckInsHistoryUseCaseRespose> {
    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page
    );

    return {
      checkIns,
    };
  }
}
