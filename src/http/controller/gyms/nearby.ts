import { makeFetchNearbyGyms } from "@/use-cases/factory/make-fetch-nearby-gyms-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
  const nearbyGymsQuerySchema = z.object({
    latitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    longitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180;
    }),
  });

  const { latitude, longitude } = nearbyGymsQuerySchema.parse(request.query);

  const searchGymUseCase = makeFetchNearbyGyms();
  const { gyms } = await searchGymUseCase.execute({
    userLatitude: latitude,
    userLogitude: longitude,
  });
  
  return reply.status(201).send({ gyms });
}
