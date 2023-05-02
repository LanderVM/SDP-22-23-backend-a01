const Router = require("@koa/router");
const carrierService = require("../service/carrier");
const Joi = require("joi");
const validate = require("./_validation.js");

const getCarriersBySupplierId = async (ctx) => {
  ctx.body = await carrierService.getBySupplierId(ctx.params.id);
};
getCarriersBySupplierId.validationScheme = {
  params: {
    id: Joi.number().integer().positive(),
  },
};

module.exports = (app) => {
  const router = new Router({ prefix: "/carriers" });
  // TO DO security risc
  router.get(
    "/supplierId/:id",
    validate(getCarriersBySupplierId.validationScheme),
    getCarriersBySupplierId
  );

  app.use(router.routes()).use(router.allowedMethods());
};
