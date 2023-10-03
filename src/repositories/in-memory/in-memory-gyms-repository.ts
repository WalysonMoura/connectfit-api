import { Gym, Prisma } from "@prisma/client";
import { GymsRepository } from "../gyms-repository";
import { randomUUID } from "node:crypto";

export class InMemoryGymsRepository implements GymsRepository {
  public gyms: Gym[] = [];

  async create(data: Prisma.GymCreateInput) {
    const gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
      created_at: new Date(),
    };

    this.gyms.push(gym);

    return gym;
  }

  async findById(id: string) {
    const gym = await this.gyms.find((gym) => {
      gym.id === id;
    });

    if (!gym) {
      return null;
    }

    return gym;
  }

  async findManyNearby(id: string) {}

  async searchMany(query: string, page: number) {
    return this.gyms
      .filter((gym) => {
        gym.title.includes(query);
      })
      .splice((page - 1) * 20, page * 20);
  }
}
