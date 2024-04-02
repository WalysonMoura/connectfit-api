import { FastifyInstance } from "fastify";
import { register } from "./register";
import { authenticate } from "./authenticate";
import { profile } from "./profile";

import { refresh } from "./refresh";
import { verifyTwt } from "../../middlewares/verify-jwt";

export async function userRoutes(app: FastifyInstance) {
  app.post("/user", profile);
  app.post("/sessions", authenticate);

  app.patch("token/refresh", refresh);

  // Authenticated
  app.get("/me", profile);
}
