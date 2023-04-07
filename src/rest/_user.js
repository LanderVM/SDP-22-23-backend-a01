const Router = require("@koa/router");
const userService = require("../service/user");

const getUserByEmail = async (ctx) => {
  ctx.body = await userService.getByEmail(ctx.params.email);
};

module.exports = (app) => {
  const router = new Router({ prefix: "/user" });

  router.get("/:email", getUserByEmail);

  app.use(router.routes()).use(router.allowedMethods());
};
