import { ChechIn } from "@prisma/client";
import { CheckInsRepository } from "../../repositories/check-ins-repository";

interface CheckInUseCaseRequest {
  userId: string;
  gymId: string;

  userLatitude: string;
  userLongitude: string;
}

interface CheckInUseCaseResponse {
  checkIn: ChechIn;
}

export class CheckInUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    gymId,
    userId,
    userLatitude,
    userLongitude,
  }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {


    
  }
}
