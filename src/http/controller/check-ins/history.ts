import { makeFetchUserCheckInsHistoryUseCase } from "@/use-cases/factory/make-fetch-user-check-ins-history-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function histo(request: FastifyRequest, reply: FastifyReply) {
  const checkInsHitorySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  });

  const { page } = checkInsHitorySchema.parse(request.query);
  const fetchCheckInsHistoryUseCase = makeFetchUserCheckInsHistoryUseCase();

  const { checkIns } = await fetchCheckInsHistoryUseCase.execute({
    page,
    userId: request.user.sub,
  });

  return reply.status(200).send({ checkIns });
}
