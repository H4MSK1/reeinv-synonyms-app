import { FastifyInstance } from "fastify";
import createRoutes from ".";
import createApiRoutes from "./api";

jest.mock("./api");

function mockServer(): jest.Mocked<FastifyInstance> {
  return {
    get: jest.fn(),
  } as unknown as jest.Mocked<FastifyInstance>;
}

describe("createRoutes", () => {
  let server: jest.Mocked<FastifyInstance>;

  beforeEach(() => {
    server = mockServer();
  });

  it("should register root routes", () => {
    // When
    createRoutes(server);
    // Then
    expect(server.get).toHaveBeenCalledTimes(2);
    expect(server.get).toHaveBeenCalledWith("/", expect.any(Function));
    expect(server.get).toHaveBeenCalledWith("/health", expect.any(Function));
  });

  it("should call createSynonymsRoutes", () => {
    // When
    createRoutes(server);
    // Then
    expect(createApiRoutes).toHaveBeenCalledWith(server);
  });
});
