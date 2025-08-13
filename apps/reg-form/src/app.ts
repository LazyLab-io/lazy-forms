import Fastify from "fastify";
import { envs } from "@repo/env-loader";
import { banner } from "@repo/test-package";

const fastify = Fastify({ logger: true });

fastify.get("/", function (request, reply) {
  reply.send({ endpoint: banner });
});

console.log(envs.DB_URL);
console.log(envs.NODE_ENV);

fastify.listen({ host: "0.0.0.0", port: envs.PORT }, function (err) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
