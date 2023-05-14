const Router = require("@koa/router");
const carrierService = require("../service/carrier");
const Joi = require("joi");
const validate = require("./_validation.js");
const { permissions, hasPermission } = require("../core/auth");

const getCarriers = async (ctx) => {
  ctx.body = await carrierService.getBySupplierId(ctx.state.user.sub);
};
getCarriers.validationScheme = null;

module.exports = (app) => {
  const router = new Router({ prefix: "/carriers" });
  router.get(
    "/",
    hasPermission(permissions.purchase),
    validate(getCarriers.validationScheme),
    getCarriers
  );

  app.use(router.routes()).use(router.allowedMethods());
};
