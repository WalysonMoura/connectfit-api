import { makeValidateCheckInUseCase } from "@/use-cases/factory/make-validate-check-ins-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function validade(request: FastifyRequest, reply: FastifyReply) {
  const validadeCheckInParamsSchema = z.object({
    checkInId: z.string().uuid(),
  });

  const { checkInId } = validadeCheckInParamsSchema.parse(request.params);

  const validadeCheckInUseCase = makeValidateCheckInUseCase();

  const {} = await validadeCheckInUseCase.execute({
    checkInId,
  });

  return reply.status(204).send();
}
