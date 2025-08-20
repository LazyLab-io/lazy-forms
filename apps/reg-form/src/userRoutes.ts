import {
  createUser,
  deleteUser,
  findAllUsers,
  findUserById,
  updateUser,
  type User,
} from "./queries.js";

// outer plugin
export async function userRouter(fastify, _) {
  // inner plugin within register
  fastify.register(
    async function userPlugin(fastify, opts) {
      // 404 handler for the user namespace
      fastify.setNotFoundHandler(function custom404(request, reply) {
        const payload = {
          message: "Oops, we cannot find what you are looking for.",
        };
        reply.send(payload);
      });

      fastify.get("/:userId", opts, async function (request, _reply) {
        const { userId } = request.params; // params is an object with key values path parameters
        const user = await findUserById(Number(userId));
        if (user === null) {
          // yes, I can, async route handler catches errors and produces responses automatically
          throw new Error(`User id:${userId} does not exist`);
        }
        return { status: "success", data: user };
      });

      fastify.post("/", opts, async function (this, request, reply) {
        const user: User = request.body as User;
        await createUser(user);
        return reply.code(200).send({ status: "post-ok", user: user });
      });

      fastify.patch("/:userId", opts, async function (request, _reply) {
        const { userId } = request.params;
        const userData = request.body;
        const updatedUser = await updateUser(Number(userId), userData);
        return { status: "success", data: updatedUser };
      });

      fastify.delete("/:userId", opts, async function (this, request, reply) {
        const { userId } = request.params;
        const user = await deleteUser(Number(userId));
        console.log(user);
        reply.code(204);
        return { status: "success", data: user };
      });

      fastify.get("/", opts, async function (this, _request, _reply) {
        const users = await findAllUsers();
        return { status: "success", data: users };
      });
      // options object in the inner register for settings prefix and passing other values down to the plugin
    },
    { prefix: "users" },
  );
}
