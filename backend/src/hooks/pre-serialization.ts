import { type FastifyInstance } from "fastify";

export default function preSerialization(server: FastifyInstance) {
  server.addHook("preSerialization", async (_request, _reply, payload) => ({
    data: payload,
  }));
}
