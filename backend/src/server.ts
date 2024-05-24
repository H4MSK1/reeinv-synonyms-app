import "@/config";
import Fastify, { FastifyInstance } from "fastify";
import cors from "@fastify/cors";
import Helmet from "@fastify/helmet";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import createRoutes from "@/routes/router";
import { envLoggerOptions } from "@/config";
import registerHooks from "./hooks";

/**
 * Builds and configures the server instance.
 * @returns {Promise<FastifyInstance>} A promise that resolves the server instance.
 */
export async function buildServer(): Promise<FastifyInstance> {
  const server = Fastify({
    trustProxy: process.env?.TRUST_PROXY === "true",
    logger: envLoggerOptions[process.env?.NODE_ENV ?? "dev"],
    ignoreTrailingSlash: true,
  }).withTypeProvider<TypeBoxTypeProvider>();

  await server.register(Helmet, { global: true, contentSecurityPolicy: false });
  await server.register(cors, {
    origin: process.env.ALLOWED_ORIGIN?.split(",") ?? "http://localhost",
  });

  registerHooks(server);
  createRoutes(server);
  return server;
}

export async function runServer(): Promise<FastifyInstance> {
  const port = process.env.PORT ?? 3000;
  const host = process.env.HOST ?? "127.0.0.1";
  const server = await buildServer();

  // Gracefully handle shutdown signals
  for (const signal of ["SIGINT", "SIGTERM"]) {
    process.on(signal, () =>
      server.close().then((err) => {
        process.exit(err ? 1 : 0);
      })
    );
  }

  const address = await server.listen({ host, port: Number(port) });
  server.log.info(`server listening on ${address}`);
  return server;
}
