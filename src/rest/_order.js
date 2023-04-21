const Router = require("@koa/router");
const orderService = require("../service/order");
const Joi = require("joi");
const validate = require("./_validation.js");

const getOrderByTrackingCodes = async (ctx) => {
  const { trackAndTraceCode, verificatiecode } = ctx.query;
  ctx.body = await orderService.getByTrackingCodes(
    trackAndTraceCode,
    verificatiecode
  );
};
getOrderByTrackingCodes.validationScheme = {
  query: {
    verificatiecode: Joi.number().positive(),
    trackAndTraceCode: Joi.string(),
  },
};

module.exports = (app) => {
  const router = new Router({ prefix: "/order" });

  router.get(
    "/",
    validate(getOrderByTrackingCodes.validationScheme),
    getOrderByTrackingCodes
  );

  app.use(router.routes()).use(router.allowedMethods());
};
