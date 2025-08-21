import Fastify from "fastify";

const fastify = Fastify({ logger: true });

fastify.get("/", function (request, reply) {
  reply.send({ container: "api" });
});

fastify.listen({ host: "0.0.0.0", port: 3001 }, function (err) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
