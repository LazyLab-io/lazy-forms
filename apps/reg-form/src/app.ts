import Fastify from "fastify";

const fastify = Fastify({ logger: true });

fastify.get("/", function (request, reply) {
  reply.send({ endpoint: "reg-form-test" });
});

fastify.listen({host: "0.0.0.0", port: 3002 }, function (err) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
