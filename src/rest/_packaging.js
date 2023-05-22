const Router = require("@koa/router");
const packagingService = require("../service/packaging");
const Joi = require("joi");
const validate = require("./_validation.js");
const { permissions, hasPermission } = require("../core/auth");

const getpackagings = async (ctx) => {
  ctx.body = await packagingService.getAll();
};
getpackagings.validationScheme = null;

module.exports = (app) => {
  const router = new Router({ prefix: "/packagings" });

  router.get(
    "/",
    hasPermission(permissions.purchase),
    validate(getpackagings.validationScheme),
    getpackagings
  );

  app.use(router.routes()).use(router.allowedMethods());
};
