const Router = require("@koa/router");
const customerService = require("../service/customer");
const Joi = require("joi");
const validate = require("./_validation.js");

const getcustomerByEmail = async (ctx) => {
  ctx.body = await customerService.getByEmail(ctx.params.email);
};
getcustomerByEmail.validationScheme = {
  params: {
    email: Joi.string(),
  },
};

const getcustomerBySupplierId = async (ctx) => {
  ctx.body = await customerService.getBySupplierId(ctx.params.supplierId);
};
getcustomerBySupplierId.validationScheme = {
  params: {
    supplierId: Joi.number().integer().positive(),
  },
};

module.exports = (app) => {
  const router = new Router({ prefix: "/customers" });

  router.get(
    "/email/:email",
    validate(getcustomerByEmail.validationScheme),
    getcustomerByEmail
  );
  router.get(
    "/supplierId/:supplierId",
    validate(getcustomerBySupplierId.validationScheme),
    getcustomerBySupplierId
  );

  app.use(router.routes()).use(router.allowedMethods());
};
