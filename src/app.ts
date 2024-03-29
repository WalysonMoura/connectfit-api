import fastifyCookie from "@fastify/cookie";
import fastifyJwt from "@fastify/jwt";
import fastify from "fastify";
import { userRoutes } from "./http/controller/user/routes";
import { ZodError } from "zod";
import { env } from "./env";
import { gymsRoutes } from "./http/controller/gyms/routes";
import { checkInsRoutes } from "./http/controller/check-ins/routes";

export const app = fastify({
  logger: true,
});

app.get("/", async (req, reply) => {
  return reply.status(200).type("text/html").send("Hello World");
});

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  sign: {
    expiresIn: "10m",
  },
  cookie: {
    cookieName: "refreshToken",
    signed: false,
  },
});
app.register(fastifyCookie);

app.register(userRoutes);
app.register(gymsRoutes);
app.register(checkInsRoutes);

app.setErrorHandler((error, request, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: "Validate error.", issue: error.format() });
  }

  if (env.NODE_ENV !== "production") {
    console.error(error);
  } else {
    // TODO: Here we should log to an external tool like DataDog/NewRelic/Sentry
  }

  return reply.status(500).send({ message: "Internal server error." });
});
