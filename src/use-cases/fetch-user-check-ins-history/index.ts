import { CheckInRepository } from "@/repositories/checkin-repository";
import { CheckIn } from "@prisma/client";

export interface FetchUserCheckInsHistoryUseCaseRequest {
  userId: string;
  page: number;
}

export interface FetchUserCheckInsHistoryUseCaseResponse {
  checkIns: CheckIn[];
}

export class FetchUserCheckInsHistoryUseCase {
  constructor(private checkInRepository: CheckInRepository) {}

  async execute({
    page,
    userId,
  }: FetchUserCheckInsHistoryUseCaseRequest): Promise<FetchUserCheckInsHistoryUseCaseResponse> {
    const checkIns = await this.checkInRepository.findManyByUserId(
      userId,
      page
    );

    return { checkIns };
  }
}
