import { type FastifyInstance } from "fastify";
import createSynonymRoutes from "./synonym/synonym";

export default function createApiRoutes(server: FastifyInstance) {
  server.register(
    (server, _, next) => {
      createSynonymRoutes(server);
      next();
    },
    { prefix: "/api" }
  );
}
