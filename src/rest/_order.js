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

const createOrder = async (ctx) => {
  console.log(ctx.request.body);
  newOrders =  await orderService.create(ctx.request.body);
  ctx.body = newOrders;
  ctx.status = 201;
}
createOrder.validationScheme = {
  body : Joi.object({
    email: Joi.string(),
    products: Joi.array(),
    address: Joi.object(),
  })
}


module.exports = (app) => {
  const router = new Router({ prefix: "/order" });

  router.get(
    "/",
    validate(getOrderByTrackingCodes.validationScheme),
    getOrderByTrackingCodes
  );
  router.post("/",createOrder);

  app.use(router.routes()).use(router.allowedMethods());
};
