const Router = require("@koa/router");
const Joi = require("joi");
const validate = require("./_validation.js");
const { permissions, hasPermission } = require("../core/auth");
const notificationService = require("../service/notification.js");

const getAllByCustomer = async (ctx) => {
  
  ctx.body = await notificationService.getAllByAuthId(ctx.state.user.sub);
};

const getNotReadByCustomer = async (ctx) => {
  ctx.body = await notificationService.getNotReadByAuthId(ctx.state.user.sub);
}

const updateNotification = async (ctx) => {
  ctx.body = await notificationService.updateById(ctx.request.body);
}



module.exports = (app) => {
  const router = new Router({ prefix: "/notifications" });

  router.get("/",getAllByCustomer);

  router.get("/notRead",getNotReadByCustomer);

  router.put("/",updateNotification);

  app.use(router.routes()).use(router.allowedMethods());
}
