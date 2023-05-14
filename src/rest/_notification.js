const Router = require("@koa/router");
const Joi = require("joi");
const validate = require("./_validation.js");
const { permissions, hasPermission } = require("../core/auth");
const notificationService = require("../service/notification.js");

const getAllByCustomer = async (ctx) => {
  
  ctx.body = await notificationService.getAllByAuthId(ctx.state.user.sub);
};



module.exports = (app) => {
  const router = new Router({ prefix: "/notifications" });

  router.get("/",getAllByCustomer);


  app.use(router.routes()).use(router.allowedMethods());
}
