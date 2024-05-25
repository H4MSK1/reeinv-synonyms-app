import { type FastifyInstance } from "fastify";
import { AddressInfo } from "net";
import { runServer } from "./server";
import { JSONResponse } from "./types";

describe("server integration tests", () => {
  let server: FastifyInstance, baseUrl: string;

  beforeAll(async () => {
    server = await runServer();
    const address = server.server.address() as AddressInfo | null;
    baseUrl = `http://${address?.address}:${address?.port}`;
  });

  afterAll(async () => {
    await server.close();
  });

  describe("health check", () => {
    it("should return status code 200", async () => {
      // Given
      const response = await fetch(`${baseUrl}/health`);
      // Then
      expect(response.status).toEqual(200);
    });
  });

  describe("synonyms", () => {
    // prepare test data
    const word = "happy";
    const synonyms = ["joyful", "glad"];
    const transitiveSynonyms = {
      [word]: synonyms,
      joyful: [word, synonyms[1]],
      glad: [word, synonyms[0]],
    };

    async function clearSynonyms() {
      // When
      const response = await fetch(`${baseUrl}/api/synonyms`, {
        method: "DELETE",
      });
      // Then
      expect(response.status).toEqual(204);
    }

    async function createSynonyms() {
      // When
      const response = await fetch(`${baseUrl}/api/synonyms`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ word, synonyms }),
      });
      const { data } = (await response.json()) as JSONResponse;
      // Then
      expect(response.status).toEqual(201);
      expect(data).toEqual({ [word]: synonyms });
    }

    beforeEach(clearSynonyms);

    it("should return status code 200 and null", async () => {
      // Given
      const response = await fetch(`${baseUrl}/api/synonyms`);
      const { data } = (await response.json()) as JSONResponse;
      // Then
      expect(response.status).toEqual(200);
      expect(data).toBeNull();
    });

    it("should return status code 200 and all transitive synonyms", async () => {
      // Given
      await createSynonyms();
      // When
      const response = await fetch(`${baseUrl}/api/synonyms`);
      const { data } = (await response.json()) as JSONResponse;
      // Then
      expect(response.status).toEqual(200);
      expect(data).toEqual(transitiveSynonyms);
    });

    it("should return status code 200 and all synonyms for word", async () => {
      // Given
      await createSynonyms();
      // When
      const response = await fetch(`${baseUrl}/api/synonyms/${word}`);
      const { data } = (await response.json()) as JSONResponse;
      // Then
      expect(response.status).toEqual(200);
      expect(data).toEqual({ [word]: synonyms });
    });
  });
});
