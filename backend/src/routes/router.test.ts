import { FastifyInstance } from "fastify";
import createRoutes from "./router";
import createSynonymsRoutes from "./synonym/synonym";

jest.mock("./synonym/synonym");

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
    expect(createSynonymsRoutes).toHaveBeenCalledWith(server);
  });
});
