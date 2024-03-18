import { CheckInRepository } from "@/repositories/checkin-repository";
import { GymsRepository } from "@/repositories/gyms-repository";
import { CheckIn } from "@prisma/client";
import { ResourceNotFound } from "../erros/resource-not-found-error";
import { getDistaceBetweenCoordinates } from "@/utils/get-distance-between-coordinates";
import { MaxDistanceError } from "../erros/max-distance-erros";

interface CheckInUseCaseResquest {
  userId: string;
  gymId: string;
  userLatitude: number;
  userLongitude: number;
}

interface CheckInUseCaseResponse {
  checkIn: CheckIn;
}
export class CheckInUseCase {
  constructor(
    private checkInsRepository: CheckInRepository,
    private gymsRepository: GymsRepository
  ) {}

  async execute({
    gymId,
    userId,
    userLatitude,
    userLongitude,
  }: CheckInUseCaseResquest): Promise<CheckInUseCaseResponse> {
    const gym = await this.gymsRepository.findById(gymId);

    if (!gym) {
      throw new ResourceNotFound();
    }

    const distance = await getDistaceBetweenCoordinates(
      { latitude: userLatitude, longitude: userLongitude },
      { latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber() }
    );

    const MAX_DISTANCE_IN_KILOMETERS = 0.1;

    if (distance > MAX_DISTANCE_IN_KILOMETERS) {
        throw new MaxDistanceError()
    }

    const checkInOnSameDay = await this.checkInsRepository.

    const checkIn = await this.checkInsRepository.create({
      gym_id: gymId,
      user_id: userId,
    });

    return {
      checkIn,
    };
  }
}
