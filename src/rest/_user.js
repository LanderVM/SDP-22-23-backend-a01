const Router = require("@koa/router");
const userService = require("../service/user");
const Joi = require("joi");
const validate = require("./_validation.js");

const getUserByEmail = async (ctx) => {
  ctx.body = await userService.getByEmail(ctx.params.email);
};
getUserByEmail.validationScheme = {
  params: {
    email: Joi.string(),
  },
};

const getUserBySupplierId = async (ctx) => {
  ctx.body = await userService.getBySupplierId(ctx.params.supplierId);
};
getUserBySupplierId.validationScheme = {
  params: {
    supplierId: Joi.number().integer().positive(),
  },
};

module.exports = (app) => {
  const router = new Router({ prefix: "/user" });

  router.get(
    "/email/:email",
    validate(getUserByEmail.validationScheme),
    getUserByEmail
  );
  router.get(
    "/supplierId/:supplierId",
    validate(getUserBySupplierId.validationScheme),
    getUserBySupplierId
  );

  app.use(router.routes()).use(router.allowedMethods());
};
