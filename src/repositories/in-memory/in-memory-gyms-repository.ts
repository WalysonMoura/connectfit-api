import { Gym, Prisma } from "@prisma/client";
import { FindManyNearby, GymsRepository } from "../gyms-repository";
import { randomUUID } from "crypto";
import { getDistaceBetweenCoordinates } from "@/utils/get-distance-between-coordinates";

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

  async findById(id: string) {
    const gym = await this.gyms.find((gym) => gym.id === id);

    if (!gym) {
      return null;
    }

    return gym;
  }
  async searchMany(query: string, page: number) {
    return this.gyms
      .filter((gym) => gym.title.includes(query))
      .slice((page - 1) * 20, page * 20);
  }

  async findManyNearby(params: FindManyNearby) {
    return this.gyms.filter((gym) => {
      const distance = getDistaceBetweenCoordinates(
        {
          latitude: params.latitude,
          longitude: params.longitude,
        },
        {
          latitude: gym.latitude.toNumber(),
          longitude: gym.longitude.toNumber(),
        }
      );

      return distance < 10;
    });
  }
}
