import { GymsRepository } from "@/repositories/gyms-repository";
import { Gym } from "@prisma/client";

interface FetchNearbyGymsUseCaseRequest {
  userLatitude: number;
  userLogitude: number;
}

interface FetchNearbyGymsUseCaseResponse {
  gyms: Gym[];
}
export class FetchNearbyGymsUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute() {}
}
