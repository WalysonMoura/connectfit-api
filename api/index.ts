import { app } from "@/app";
import { FastifyRequest, FastifyReply } from "fastify";


  export default async function handler(request: FastifyRequest, reply: FastifyReply) {
    await app.ready()
    app.server.emit('request', request, reply)
  }