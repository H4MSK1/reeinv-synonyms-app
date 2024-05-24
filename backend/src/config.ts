import dotenv from "dotenv";
import { FastifyLoggerOptions } from "fastify";
import { PinoLoggerOptions } from "fastify/types/logger";

dotenv.config();

export const envLoggerOptions: Record<
  string,
  FastifyLoggerOptions | PinoLoggerOptions | undefined
> = {
  dev: {
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "HH:MM:ss Z",
        ignore: "pid,hostname",
      },
    },
  },
  prod: {
    level: "info",
  },
  test: undefined,
};
