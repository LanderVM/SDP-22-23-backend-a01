const Router = require("@koa/router");
const orderService = require("../service/order");
const Joi = require("joi");
const validate = require("./_validation.js");

const getOrderByTrackingCodes = async (ctx) => {
  const { trackAndTraceCode, verificationCode } = ctx.query;
  ctx.body = await orderService.getByTrackingCodes(
    trackAndTraceCode,
    verificationCode
  );
};
getOrderByTrackingCodes.validationScheme = {
  query: {
    verificationCode: Joi.number().positive(),
    trackAndTraceCode: Joi.string(),
  },
};

//-------- TO DO------------//
const createOrder = async (ctx) => {
  ctx.body = await orderService.getByTrackingCodes(ctx.request.body);
};
createOrder.validationScheme = {
  body: {
    delivery_country: Joi.string(),
    delivery_city: Joi.string(),
    delivery_postal_code: Joi.number().integer().positive().allow(0),
    delivery_street: Joi.string().allow(0),
    delivery_house_number: Joi.number().integer().positive().allow(0),
    delivery_box: Joi.string().optional(),
    order_date: Joi.date(),
    order_status: Joi.number().integer().positive().allow(0),
    tracking_code: Joi.string().optional(),
    CARRIER_carrier_id: Joi.number().integer().positive().optional(),
    CUSTOMER_supplier_id: Joi.number().integer().positive().optional(),
    PACKAGING_packaging_id: Joi.number().integer().positive().optional(),
  },
};
createOrder.validationScheme = {
  body: Joi.object({
    email: Joi.string(),
    products: Joi.array(),
    address: Joi.object(),
  }),
};

module.exports = (app) => {
  const router = new Router({ prefix: "/orders" });

  router.get(
    "/",
    validate(getOrderByTrackingCodes.validationScheme),
    getOrderByTrackingCodes
  );
  router.post("/", createOrder);

  app.use(router.routes()).use(router.allowedMethods());
};
