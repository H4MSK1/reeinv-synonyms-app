import { FastifyInstance } from "fastify";

export default function onRequest(server: FastifyInstance) {
  server.addHook("onRequest", async (request) => {
    server.log.info(`incoming request for URL: ${request.url}`);
  });
}
