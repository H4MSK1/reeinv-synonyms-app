import { FastifyInstance } from "fastify";
import createSynonymRoutes from "./synonym";
import SynonymService from "@/services/synonym";
import { SynonymSchema } from "@/schema";

jest.mock("@/services/synonym");

function mockServer(): jest.Mocked<FastifyInstance> {
  return {
    get: jest.fn(),
    post: jest.fn(),
    delete: jest.fn(),
  } as unknown as jest.Mocked<FastifyInstance>;
}

describe("createSynonymsRoutes", () => {
  let server: jest.Mocked<FastifyInstance>;

  beforeEach(() => {
    server = mockServer();
  });

  it("should create one new SynonymService instance", () => {
    // When
    createSynonymRoutes(server);
    // Then
    expect(SynonymService).toHaveBeenCalledTimes(1);
  });

  it("should register GET '/synonyms' route", () => {
    // When
    createSynonymRoutes(server);
    // Then
    expect(server.get).toHaveBeenCalledWith("/synonyms", expect.any(Function));
  });

  it("should register GET '/synonyms/:word' route", () => {
    // When
    createSynonymRoutes(server);
    // Then
    expect(server.get).toHaveBeenCalledWith(
      "/synonyms/:word",
      expect.any(Function)
    );
  });

  it("should register POST '/synonyms' route with schema validation", () => {
    // When
    createSynonymRoutes(server);
    // Then
    expect(server.post).toHaveBeenCalledWith(
      "/synonyms",
      expect.objectContaining({
        schema: {
          body: SynonymSchema,
        },
      }),
      expect.any(Function)
    );
  });

  it("should register DELETE '/synonyms' route", () => {
    // When
    createSynonymRoutes(server);
    // Then
    expect(server.delete).toHaveBeenCalledWith(
      "/synonyms",
      expect.any(Function)
    );
  });
});
