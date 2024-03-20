import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { CheckInUseCase } from "../check-in";
import { PrimsCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";

export function makeCheckInUseCase() {
  const gymsRepository = new PrismaGymsRepository();
  const checkInsRepository = new PrimsCheckInsRepository();
  const checkInUseCase = new CheckInUseCase(checkInsRepository, gymsRepository);
  return checkInUseCase;
}
