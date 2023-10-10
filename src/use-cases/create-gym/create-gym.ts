import { Gym } from "@prisma/client";
import { GymsRepository } from "../../repositories/gyms-repository";

interface CreateGymCaseRequest {
  title: string;
  description?: string | null;
  phone?: string | null;
  latitude: string;
  longitude: string;
}

interface CreateGymCaseResponse {
  gym: Gym;
}

export class CreateGymUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    title,
    phone,
    description,
    latitude,
    longitude,
  }: CreateGymCaseRequest): Promise<CreateGymCaseResponse> {
    const gym = await this.gymsRepository.create({
      title,
      latitude,
      longitude,
      description: description ?? "",
      phone: phone ?? "",
    });

    return {
      gym,
    };
  }
}
