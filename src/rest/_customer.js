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


module.exports = (app) => {
  const router = new Router({ prefix: "/customers" });

  router.get(
    "/:email",
    validate(getcustomerByEmail.validationScheme),
    getcustomerByEmail
  );
  

  app.use(router.routes()).use(router.allowedMethods());
};
