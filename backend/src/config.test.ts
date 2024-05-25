import { envLoggerOptions } from "./config";

describe("envLoggerOptions", () => {
  it("should have 'dev', 'prod', and 'test' environment logger options", () => {
    // When, Then
    expect(envLoggerOptions).toHaveProperty("dev");
    expect(envLoggerOptions).toHaveProperty("prod");
    expect(envLoggerOptions).toHaveProperty("test");
  });

  it("should have a 'dev' logger option with the correct options", () => {
    // Given
    const loggerOptions = envLoggerOptions.dev;
    // Then
    expect(loggerOptions).toMatchObject({
      transport: {
        target: "pino-pretty",
        options: {
          translateTime: "HH:MM:ss Z",
          ignore: "pid,hostname",
        },
      },
    });
  });

  it("should have a 'prod' logger option with the correct log level", () => {
    // Given
    const prodOption = envLoggerOptions.prod;
    // Then
    expect(prodOption).toBeDefined();
    expect(prodOption?.level).toBe("info");
  });
});
