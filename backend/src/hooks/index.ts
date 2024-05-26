import { type FastifyInstance } from "fastify";
import onRequest from "./on-request";

const hooks = [onRequest];

export default function registerHooks(server: FastifyInstance) {
  hooks.forEach((hook) => hook(server));
}
