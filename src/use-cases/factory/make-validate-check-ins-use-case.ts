import { PrimsCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";
import { ValidateCheckInsUseCase } from "../validate-check-ins";

export function makeValidateCheckInUseCase() {
  const checkInsRepository = new PrimsCheckInsRepository();
  const validateCheckInUseCase = new ValidateCheckInsUseCase(
    checkInsRepository
  );
  return validateCheckInUseCase;
}
