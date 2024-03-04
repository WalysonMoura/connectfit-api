import { Gym, Prisma } from "@prisma/client";

export interface FindyManyNearbyParams {
  latitude: number;
  longitude: number;
}

export interface GymsRepository {
  findById: (id: string) => Promise<Gym | null>;
  findManyNearby: (params: FindyManyNearbyParams) => Promise<Gym[]>;
  searchMany: () => Promise<Gym[]>;
  create: (data: Prisma.GymCreateInput) => Promise<Gym>;
}
