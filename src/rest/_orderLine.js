const Router = require("@koa/router");
const orderLineService = require("../service/orderLine");
const Joi = require("joi");
const validate = require("./_validation.js");

const postOrderLine = async (ctx) => {
  ctx.body = await orderLineService.create(ctx.request.body);
  ctx.status = 201;
};
postOrderLine.validationScheme = {
  body: {
    productCount: Joi.number().integer().positive(),
    orderId: Joi.number().integer().positive(),
    productId: Joi.number().integer().positive(),
    originalAcquisitionPrice: Joi.number().positive(),
  },
};

module.exports = (app) => {
  const router = new Router({ prefix: "/orderLines" });

  router.post("/", validate(postOrderLine.validationScheme), postOrderLine);

  app.use(router.routes()).use(router.allowedMethods());
};
