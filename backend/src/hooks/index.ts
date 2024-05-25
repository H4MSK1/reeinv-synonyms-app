import { type FastifyInstance } from "fastify";
import onSend from "./on-send";
import onRequest from "./on-request";
import preSerialization from "./pre-serialization";

const hooks = [onRequest, onSend, preSerialization];

export default function registerHooks(server: FastifyInstance) {
  hooks.forEach((hook) => hook(server));
}
