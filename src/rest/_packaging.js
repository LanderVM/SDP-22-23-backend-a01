const Router = require("@koa/router");
const packagingService = require("../service/packaging");
const Joi = require("joi");
const validate = require("./_validation.js");

const getpackagingsBySupplierId = async (ctx) => {
  ctx.body = await packagingService.getBySupplierId(ctx.params.id);
};
getpackagingsBySupplierId.validationScheme = {
  params: {
    id: Joi.number().integer().positive(),
  },
};

module.exports = (app) => {
  const router = new Router({ prefix: "/packagings" });

  router.get(
    "/supplierId/:id",
    validate(getpackagingsBySupplierId.validationScheme),
    getpackagingsBySupplierId
  );

  app.use(router.routes()).use(router.allowedMethods());
};
