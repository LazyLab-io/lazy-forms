import Fastify from "fastify";
import { envs } from "@repo/env-loader";
import { banner } from "@repo/test-package";
import { main } from "./queries.js";
const fastify = Fastify({ logger: true });

console.log(banner);
console.log(envs.DATABASE_URL);
console.log(envs.NODE_ENV);

const opts = {
  schema: {
    response: {
      200: {
        type: "object",
        properties: {
          status: { type: "string" },
        },
      },
    },
  },
};

await main();

fastify.get("/users/:userId", opts, function (request, reply) {
  main();
  reply.send({ status: "get-ok" });
});

fastify.post("/users", opts, function (this, request, reply) {
  reply.send({ status: "post-ok" });
});

fastify.patch("/users/:userId", opts, function (request, reply) {
  reply.send({ status: "patch-ok" });
});

fastify.delete("/users/:userId", opts, function (this, request, reply) {
  reply.code(204);
  reply.send({ status: "delete-ok" });
});

fastify.get("/users", opts, function (this, request, reply) {
  reply.send({ status: "get-all-ok" });
});

fastify.listen({ host: "0.0.0.0", port: envs.PORT }, function (err) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
