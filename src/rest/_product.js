const Router = require("@koa/router");
const productService = require("../service/product");

const getProductById = async (ctx) => {
  ctx.body = await productService.getById(ctx.params.productId);
};

module.exports = (app) => {
  const router = new Router({ prefix: "/product" });

  router.get("/productId/:productId", getProductById);

  app.use(router.routes()).use(router.allowedMethods());
};
