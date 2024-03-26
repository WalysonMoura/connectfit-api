import { FastifyReply, FastifyRequest } from "fastify";

export async function profile(request: FastifyRequest, reply: FastifyReply) {
    return reply.status(201).send({mesage:"deu certo bb😎"})
}
