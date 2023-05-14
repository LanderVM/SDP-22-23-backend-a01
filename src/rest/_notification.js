const Router = require("@koa/router");
const Joi = require("joi");
const validate = require("./_validation.js");
const { permissions, hasPermission } = require("../core/auth");



module.exports = (app) => {
  const router = new Router({ prefix: "/notifications" });



  app.use(router.routes()).use(router.allowedMethods());
}
