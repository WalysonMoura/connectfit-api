import { userRoutes } from "@/http/controller/user/routes";
import fastify from "fastify";
import { env } from "process";
import { ZodError } from "zod";

export const app = fastify({
  logger: true,
});

app.get("/", async (req, reply) => {
  return reply.status(200).type("text/html").send("Hello World");
});

app.register(userRoutes);

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

app
  .listen({
    host: "0.0.0.0",
    port: 3001,
  })
  .then(() => {
    console.log("🚀 HTTP Server Running!");
  });
