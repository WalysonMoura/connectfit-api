import { FastifyInstance } from "fastify";
import { register } from "./register";
import { authenticate } from "./authenticate";
import { profile } from "./profile";

export async function userRoutes(app: FastifyInstance) {
  app.post("/user", profile);
  app.post("/sessions", authenticate);
}
