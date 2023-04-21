const installHealthRouter = require("./_health");
const installcustomerRouter = require("./_customer");
const installProductRouter = require("./_product");
const installOrderRouter = require("./_order");
const installOrderLineRouter = require("./_orderLine");
const Router = require("@koa/router");

module.exports = (app) => {
  const router = new Router({ prefix: "/api" });

  installHealthRouter(router);
  installcustomerRouter(router);
  installProductRouter(router);
  installOrderRouter(router);
  installOrderLineRouter(router);

  app.use(router.routes()).use(router.allowedMethods());
};
