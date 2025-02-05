const Router = require("@koa/router");
const productService = require("../service/product");
const Joi = require("joi");
const validate = require("./_validation.js");

const getProductByIds = async (ctx) => {
  ctx.body = await productService.getByIds(ctx.query);
};
getProductByIds.validationScheme = {
  query: {
    productId: Joi.alternatives().try(
      Joi.array().items(Joi.number().integer().positive()),
      Joi.number().integer().positive()
    ),
  },
};

const getFilteredProducts = async (ctx) => {
  ctx.body = await productService.getFilteredProducts(ctx.query);
};
getFilteredProducts.validationScheme = {
  query: {
    name: Joi.string().optional(),
    startPrice: Joi.number().integer().positive().allow(0).optional(),
    endPrice: Joi.number().integer().positive().allow(0).optional(),
    inStock: Joi.boolean().optional(),
    brand: Joi.alternatives()
      .try(Joi.array().items(Joi.string()), Joi.string())
      .optional(),
    category: Joi.alternatives()
      .try(Joi.array().items(Joi.string()), Joi.string())
      .optional(),
    limit: Joi.number().integer().positive().optional(),
    skip: Joi.number().integer().positive().allow(0).optional(),
    sortBy: Joi.string().optional(),
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

const getPopularProducts = async(ctx) => {
  ctx.body = await productService.getPopularProducts();
};
getPopularProducts.validationScheme = null;

module.exports = (app) => {
  const router = new Router({ prefix: "/products" });

  router.get(
    "/",
    validate(getFilteredProducts.validationScheme),
    getFilteredProducts
  );
  router.get(
    "/ids",
    validate(getProductByIds.validationScheme),
    getProductByIds
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
  router.get(
    "/popular",
    validate(getPopularProducts.validationScheme),
    getPopularProducts
  )

  app.use(router.routes()).use(router.allowedMethods());
};
