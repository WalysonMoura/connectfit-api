import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { FetchNearbyGymsUseCase } from "../fetch-nearby-gyms";

export function makeFetchNearbyGyms() {
  const gymsRepository = new PrismaGymsRepository();
  const fetchNearbyGyms = new FetchNearbyGymsUseCase(gymsRepository);
  return fetchNearbyGyms;
}
