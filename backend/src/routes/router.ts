import { FastifyInstance } from "fastify";

export default function createRoutes(server: FastifyInstance) {
  server.get("/health", () => "health check OK!");
}
