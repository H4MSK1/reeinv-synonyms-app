import { type FastifyInstance } from "fastify";

export default function onSend(server: FastifyInstance) {
  server.addHook("onSend", async (_request, _reply, payload) =>
    payload === undefined ? JSON.stringify({ data: null }) : payload
  );
}
