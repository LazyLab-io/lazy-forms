import Fastify from "fastify";
import { envs } from "@repo/env-loader";
import { banner } from "@repo/test-package";
import { main, createUser } from "./queries.js";
import type { User } from "./queries.js";

// import { Prisma } from "../generated/prisma/client.js";
import { Prisma } from "@prisma/local/client";

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

// await main();

fastify.get("/users/:userId", opts, function (request, reply) {
  main();
  reply.send({ status: "get-ok" });
});

fastify.post("/users", async function (this, request, reply) {
  const user: User = request.body as User;
  try {
    await createUser(user);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        reply.send({ status: e.meta });
        return;
      }
    }
    console.log("test");
    throw e;
  }
  reply.send({ status: "post-ok", user: user });
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
