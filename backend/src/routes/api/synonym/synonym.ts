import { FastifyInstance } from "fastify";
import { Synonym, SynonymsFilter } from "@/types";
import { SynonymSchema } from "@/schema";
import SynonymService from "@/services/synonym";
import { isEmpty } from "@/utils/is-empty";

export default function createSynonymRoutes(server: FastifyInstance) {
  // Instantiate the SynonymService here to act as a singleton
  // persisting the data across requests in-memory.
  const synonymService = new SynonymService();

  server.get<{
    Querystring: SynonymsFilter;
  }>("/synonyms", (req, reply) =>
    reply.send(synonymService.getSynonyms(req.query))
  );

  server.get<{ Params: { word: string } }>("/synonyms/:word", (req, reply) => {
    const wordSynonyms = synonymService.getSynonymsByWord(req.params.word);
    if (isEmpty(wordSynonyms)) {
      reply.status(404).send();
      return;
    }

    reply.send(synonymService.getSynonymsByWord(req.params.word));
  });

  server.post<{ Body: Synonym }>(
    "/synonyms",
    {
      schema: {
        body: SynonymSchema,
      },
    },
    (req, reply) => {
      const { body: payload } = req;
      synonymService.addSynonyms(payload);
      const wordSynonyms = synonymService.getSynonymsByWord(payload.word);

      reply.status(201).send(wordSynonyms);
    }
  );

  server.delete("/synonyms", (_, reply) => {
    synonymService.clearSynonyms();
    reply.status(204).send();
  });
}
