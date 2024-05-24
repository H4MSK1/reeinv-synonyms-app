import { FastifyInstance } from "fastify";
import createSynonymsRoutes from "./synonym/synonym";

export default function createRoutes(server: FastifyInstance) {
  server.get("/", () => "/");
  server.get("/health", () => "health check OK!");

  createSynonymsRoutes(server);
}
