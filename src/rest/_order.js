const Router = require("@koa/router");
const orderService = require("../service/order");
const Joi = require("joi");
const validate = require("./_validation.js");
const { permissions, hasPermission } = require("../core/auth");

const getOrderById = async (ctx) => {
  ctx.body = await orderService.getById(ctx.params.orderId, ctx.state.user.sub);
};
getOrderById.validationScheme = {
  params: {
    orderId: Joi.number().positive(),
  },
};

const getOrderByTrackingCodes = async (ctx) => {
  ctx.body = await orderService.getByTrackingCodes(ctx.query);
};
getOrderByTrackingCodes.validationScheme = {
  query: {
    verificationCode: Joi.number().positive(),
    trackAndTraceCode: Joi.string(),
  },
};

const getCodesByOrder = async (ctx) => {
  ctx.body = await orderService.getCodesByOrder(ctx.params.orderId, ctx.state.user.sub);
};
getCodesByOrder.validationScheme = {
  params: {
    orderId: Joi.number().positive(),
  },
};

const createOrder = async (ctx) => {
  ctx.body = await orderService.createOrder(
    ctx.request.body,
    ctx.state.user.sub
  );
  ctx.status = 201;
};
createOrder.validationScheme = {
  body: {
    delivery_country: Joi.string(),
    delivery_city: Joi.string(),
    delivery_postal_code: Joi.string(),
    delivery_street: Joi.string(),
    delivery_house_number: Joi.string(),
    delivery_box: Joi.string().allow("", null).optional(),
    PACKAGING_packaging_id: Joi.number().integer().positive(), // kiezen
    SUPPLIER_supplier_id: Joi.number().integer().positive(), // kiezen
    order_lines: Joi.array().items(
      Joi.object({
        PRODUCT_product_id: Joi.number().integer().positive(),
        product_count: Joi.number().integer().positive(),
      })
    ),
  },
};

const updateOrder = async (ctx) => {
  ctx.body = await orderService.updateOrder(
    ctx.state.user.sub,
    ctx.request.body
  );
};
updateOrder.validationScheme = {
  body: {
    order_id: Joi.number().integer().positive(),
    delivery_country: Joi.string().optional(),
    delivery_city: Joi.string().optional(),
    delivery_postal_code: Joi.optional(),
    delivery_street: Joi.string().optional(),
    delivery_house_number: Joi.optional(),
    delivery_box: Joi.allow(null, "").optional(),
    PACKAGING_packaging_id: Joi.number().integer().positive().optional(),
  },
};

module.exports = (app) => {
  const router = new Router({ prefix: "/orders" });

  router.get(
    "/codes/:orderId",
    hasPermission(permissions.purchase),
    validate(getCodesByOrder.validationScheme),
    getCodesByOrder
  );
  router.get(
    "/:orderId",
    hasPermission(permissions.purchase),
    validate(getOrderById.validationScheme),
    getOrderById
  );
  router.get(
    "/",
    validate(getOrderByTrackingCodes.validationScheme),
    getOrderByTrackingCodes
  );
  router.post(
    "/",
    hasPermission(permissions.purchase),
    validate(createOrder.validationScheme),
    createOrder
  );
  router.put(
    "/",
    hasPermission(permissions.purchase),
    validate(updateOrder.validationScheme),
    updateOrder
  );

  app.use(router.routes()).use(router.allowedMethods());
};
