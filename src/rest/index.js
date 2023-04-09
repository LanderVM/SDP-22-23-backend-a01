const installHealthRouter = require("./_health");
const installUserRouter = require("./_user");
const installProductRouter = require("./_product");
const Router = require("@koa/router");

module.exports = (app) => {
  const router = new Router({ prefix: "/api" });

  installHealthRouter(router);
  installUserRouter(router);
  installProductRouter(router);

  app.use(router.routes()).use(router.allowedMethods());
};
