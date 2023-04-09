const Router = require("@koa/router");
const productService = require("../service/product");
const Joi = require("joi");
const validate = require("./_validation.js");

const getProductById = async (ctx) => {
  ctx.body = await productService.getById(ctx.params.productId);
};

getProductById.validationScheme = {
  params: {
    productId: Joi.number().integer().positive(),
  },
};

module.exports = (app) => {
  const router = new Router({ prefix: "/product" });

  router.get(
    "/productId/:productId",
    validate(getProductById.validationScheme),
    getProductById
  );

  app.use(router.routes()).use(router.allowedMethods());
};
