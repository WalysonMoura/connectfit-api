import { Gym, Prisma } from "@prisma/client";
import { GymsRepository } from "../gyms-repository";
import { randomUUID } from "crypto";

export class InMemoryGymsRepositories implements GymsRepository {
  public gyms: Gym[] = [];

  async create({
    latitude,
    title,
    longitude,
    description,
    phone,
    id,
  }: Prisma.GymCreateInput) {
    const gym = {
      id: id ?? randomUUID(),
      description: description ?? null,
      latitude: new Prisma.Decimal(latitude.toString()),
      longitude: new Prisma.Decimal(longitude.toString()),
      title,
      phone: phone ?? null,
    };

    await this.gyms.push(gym);

    return gym;
  }

  async searchMany(query: string, page: number) {
    return this.gyms
      .filter((gym) => gym.title.includes(query))
      .slice((page - 1) * 20, page * 20);
  }
}
