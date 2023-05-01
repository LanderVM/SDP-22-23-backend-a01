const Router = require("@koa/router");
const orderService = require("../service/order");
const Joi = require("joi");
const validate = require("./_validation.js");

const getOrderByTrackingCodes = async (ctx) => {
  ctx.body = await orderService.getByTrackingCodes(ctx.query);
};
getOrderByTrackingCodes.validationScheme = {
  query: {
    verificationCode: Joi.number().positive(),
    trackAndTraceCode: Joi.string(),
  },
};

//-------- TO DO------------//
const postOrder = async (ctx) => {
  ctx.body = await orderService.post(ctx.request.body);
};
postOrder.validationScheme = {
  body: {
    delivery_country: Joi.string(),
    delivery_city: Joi.string(),
    delivery_postal_code: Joi.number().integer().positive(),
    delivery_street: Joi.string(),
    delivery_house_number: Joi.number().integer().positive().allow(0),
    delivery_box: Joi.string().optional(),
    CARRIER_carrier_id: Joi.number().integer().positive().optional(),
    CUSTOMER_supplier_id: Joi.number().integer().positive().optional(),
    PACKAGING_packaging_id: Joi.number().integer().positive().optional(),
  },
};

module.exports = (app) => {
  const router = new Router({ prefix: "/orders" });

  router.get(
    "/",
    validate(getOrderByTrackingCodes.validationScheme),
    getOrderByTrackingCodes
  );
  router.post("/", validate(postOrder.validationScheme), postOrder);

  app.use(router.routes()).use(router.allowedMethods());
};
