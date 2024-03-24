import { makeSearchGymsUseCase } from "@/use-cases/factory/make-search-gyms-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchGymBodySchema = z.object({
    q: z.string(),
    page: z.coerce.number().min(1).default(1),
  });

  const { page, q } = searchGymBodySchema.parse(request.body);

  const searchUseCase = makeSearchGymsUseCase();

  const { gyms } = await searchUseCase.execute({
    page,
    query: q,
  });
  return reply.status(200).send({ gyms });
}
