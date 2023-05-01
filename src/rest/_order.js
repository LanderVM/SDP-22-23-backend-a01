const Router = require("@koa/router");
const orderService = require("../service/order");
const Joi = require("joi");
const validate = require("./_validation.js");
const { addUserInfo } = require("../core/auth");

const getOrderByTrackingCodes = async (ctx) => {
  ctx.body = await orderService.getByTrackingCodes(ctx.query);
};
getOrderByTrackingCodes.validationScheme = {
  query: {
    verificationCode: Joi.number().positive(),
    trackAndTraceCode: Joi.string(),
  },
};

const getOrderById = async (ctx) => {
  ctx.body = await orderService.getById(ctx.params.orderId);
};
getOrderById.validationScheme = {
  params: {
    orderId: Joi.number().positive(),
  },
};

const postOrder = async (ctx) => {
  await addUserInfo(ctx);
  ctx.body = await orderService.postOrder(ctx.request.body, ctx.state.user.sub);
};
postOrder.validationScheme = {
  body: {
    delivery_country: Joi.string(),
    delivery_city: Joi.string(),
    delivery_postal_code: Joi.number().integer().positive(),
    delivery_street: Joi.string(),
    delivery_house_number: Joi.number().integer().positive().allow(0),
    delivery_box: Joi.string().optional(), // ingeven
    CARRIER_carrier_id: Joi.number().integer().positive().optional(), // kiezen
    PACKAGING_packaging_id: Joi.number().integer().positive().optional(), // kiezen
    SUPPLIER_supplier_id: Joi.number().integer().positive().optional(), // kiezen
  },
};

module.exports = (app) => {
  const router = new Router({ prefix: "/orders" });

  router.get(
    "/orderId/:orderId",
    validate(getOrderById.validationScheme),
    getOrderById
  );
  router.get(
    "/",
    validate(getOrderByTrackingCodes.validationScheme),
    getOrderByTrackingCodes
  );
  router.post("/", validate(postOrder.validationScheme), postOrder);

  app.use(router.routes()).use(router.allowedMethods());
};
