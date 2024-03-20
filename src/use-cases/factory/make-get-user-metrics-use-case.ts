import { PrimsCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";
import { GetUserMetricsUseCase } from "../get-user-metrics";

export function makeGetUserMetricsUseCase() {
  const checkInRepository = new PrimsCheckInsRepository();
  const getUserMetricsUseCase = new GetUserMetricsUseCase(checkInRepository);
  return getUserMetricsUseCase;
}
