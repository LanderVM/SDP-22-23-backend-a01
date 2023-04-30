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
    endPrice: Joi.number().integer().positive().allow(0).optional(),
    inStock: Joi.boolean().optional(),
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

const getProductByBrand = async (ctx) => {
  ctx.body = await productService.getByBrand(ctx.params.brand);
};
getProductByBrand.validationScheme = {
  params: {
    brand: Joi.string(),
  },
};

const getProductByCategory = async (ctx) => {
  ctx.body = await productService.getByCategory(ctx.params.category);
};
getProductByCategory.validationScheme = {
  params: {
    category: Joi.string(),
  },
};
module.exports = (app) => {
  const router = new Router({ prefix: "/products" });

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
    "/brand/:brand",
    validate(getProductByBrand.validationScheme),
    getProductByBrand
  );
  router.get(
    "/category/:category",
    validate(getProductByCategory.validationScheme),
    getProductByCategory
  );

  app.use(router.routes()).use(router.allowedMethods());
};
