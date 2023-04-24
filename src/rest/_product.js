const Router = require("@koa/router");
const productService = require("../service/product");
const Joi = require("joi");
const validate = require("./_validation.js");

const getAllProducts = async (ctx) => {
  ctx.body = await productService.getAll();
};
getAllProducts.validationScheme = null;

const getProductById = async (ctx) => {
  ctx.body = await productService.getById(ctx.params.productId);
};
getProductById.validationScheme = {
  params: {
    productId: Joi.number().integer().positive(),
  },
};

const getProductByName = async (ctx) => {
  ctx.body = await productService.getByName(ctx.params.productName);
};
getProductByName.validationScheme = {
  params: {
    productName: Joi.string(),
  },
};

const getFilteredProducts = async (ctx) => {
  ctx.body = await productService.getFilteredProducts(ctx.query);
};
getFilteredProducts.validationScheme = {
  query: {
    startPrice: Joi.number().integer().positive().allow(0).optional(),
    endPrice: Joi.number().integer().positive().optional(),
    inStock: Joi.boolean().optional(),
  },
};

module.exports = (app) => {
  const router = new Router({ prefix: "/product" });

  router.get("/", validate(getAllProducts.validationScheme), getAllProducts);
  router.get(
    "/id/:productId",
    validate(getProductById.validationScheme),
    getProductById
  );
  router.get(
    "/name/:productName",
    validate(getProductByName.validationScheme),
    getProductByName
  );
  router.get(
    "/filter",
    validate(getFilteredProducts.validationScheme),
    getFilteredProducts
  );

  app.use(router.routes()).use(router.allowedMethods());
};

