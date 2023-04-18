const Router = require("@koa/router");
const orderService = require("../service/order");
const Joi = require("joi");
const validate = require("./_validation.js");

const getOrderByTrackAndTraceCode = async (ctx) => {
  ctx.body = await orderService.getByTrackAndTraceCode(
    ctx.params.trackAndTraceCode
  );
};
getOrderByTrackAndTraceCode.validationScheme = {
  params: {
    trackAndTraceCode: Joi.string(),
  },
};

module.exports = (app) => {
  const router = new Router({ prefix: "/order" });

  router.get(
    "/:trackAndTraceCode",
    validate(getOrderByTrackAndTraceCode.validationScheme),
    getOrderByTrackAndTraceCode
  );

  app.use(router.routes()).use(router.allowedMethods());
};
