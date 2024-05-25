import { FastifyInstance } from "fastify";
import createApiRoutes from "./api";

export default function createRoutes(server: FastifyInstance) {
  server.get("/", () => "/");
  server.get("/health", () => "health check OK!");

  createApiRoutes(server);
}
