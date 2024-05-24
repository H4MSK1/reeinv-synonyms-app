import { FastifyInstance } from "fastify";

export default function createSynonymsRoutes(server: FastifyInstance) {
  server.get("/synonyms", (_req, reply) => reply.send(["happy", "joyful"]));
  server.get<{ Params: { word: string } }>("/synonyms/:word", (req, reply) =>
    reply.send({ word: req.params.word })
  );
  server.post("/synonyms", (_req, reply) => reply.send(["happy", "joyful"]));
  server.delete("/synonyms", (_req, reply) => reply.send(["happy", "joyful"]));
}
