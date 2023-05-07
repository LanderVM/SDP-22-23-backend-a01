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

const getProductByIds = async (ctx) => {
  ctx.body = await productService.getByIds(ctx.query);
};
getProductByIds.validationScheme = {
  query: {
    productId: Joi.array().items(Joi.number().integer()),
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
    endPrice: Joi.number().integer().positive().allow(0).optional(),
    inStock: Joi.boolean().optional(),
    brand: Joi.alternatives().try(Joi.array(), Joi.string()).optional(),
    category: Joi.alternatives().try(Joi.array(), Joi.string()).optional(),
    limit: Joi.number().integer().positive().optional(),
    skip: Joi.number().integer().positive().allow(0).optional(),
  },
};

const getProductCategories = async (ctx) => {
  ctx.body = await productService.getCategories();
};
getProductCategories.validationScheme = null;

const getProductBrands = async (ctx) => {
  ctx.body = await productService.getBrands();
};
getProductBrands.validationScheme = null;

const getProductsHighestPrice = async (ctx) => {
  ctx.body = await productService.getHighestPrice();
};
getProductsHighestPrice.validationScheme = null;

module.exports = (app) => {
  const router = new Router({ prefix: "/products" });

  router.get(
    "/",
    validate(getFilteredProducts.validationScheme),
    getFilteredProducts
  );
  router.get(
    "/id/:productId",
    validate(getProductById.validationScheme),
    getProductById
  );
  router.get(
    "/ids",
    validate(getProductByIds.validationScheme),
    getProductByIds
  );
  router.get(
    "/name/:productName",
    validate(getProductByName.validationScheme),
    getProductByName
  );
  router.get(
    "/categories",
    validate(getProductCategories.validationScheme),
    getProductCategories
  );
  router.get(
    "/brands",
    validate(getProductBrands.validationScheme),
    getProductBrands
  );
  router.get(
    "/highestPrice",
    validate(getProductsHighestPrice.validationScheme),
    getProductsHighestPrice
  );

  app.use(router.routes()).use(router.allowedMethods());
};
