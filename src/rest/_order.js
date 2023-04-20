const Router = require("@koa/router");
const orderService = require("../service/order");
const Joi = require("joi");
const validate = require("./_validation.js");

const getOrderByCodes = async (ctx) => {
  const { trackAndTraceCode, verificatiecode } = ctx.query;
  ctx.body = await orderService.getByCodes(trackAndTraceCode, verificatiecode);
};
getOrderByCodes.validationScheme = {
  query: {
    verificatiecode: Joi.number().positive(),
    trackAndTraceCode: Joi.string(),
  },
};

module.exports = (app) => {
  const router = new Router({ prefix: "/order" });

  router.get("/", validate(getOrderByCodes.validationScheme), getOrderByCodes);

  app.use(router.routes()).use(router.allowedMethods());
};
