const Router = require("@koa/router");
const Joi = require("joi");
const validate = require("./_validation.js");
const { permissions, hasPermission } = require("../core/auth");
const notificationService = require("../service/notification.js");

const getAllByCustomer = async (ctx) => {
  
  ctx.body = await notificationService.getAllByAuthId(ctx.state.user.sub);
};
getAllByCustomer.validationScheme = null;

const getNotReadByCustomer = async (ctx) => {
  ctx.body = await notificationService.getNotReadByAuthId(ctx.state.user.sub);
}
getNotReadByCustomer.validationScheme = null;

const getAmountNotReadByCustomer = async (ctx) => {
  ctx.body = await notificationService.getAmountNotReadByAuthId(ctx.state.user.sub);
}
getAmountNotReadByCustomer.validationScheme = null;

const getFiveMostRecentByCustomer = async (ctx) => {
  ctx.body = await notificationService.getFiveMostRecentByAuthId(ctx.state.user.sub);
}
getFiveMostRecentByCustomer.validationScheme = null;

const updateNotification = async (ctx) => {
  ctx.body = await notificationService.updateById(ctx.request.body);
}
updateNotification.validationScheme = {
  body: {
    notification_id:Joi.number().integer().positive(),
    order_date: Joi.string(),
    CUSTOMER_supplier_id: Joi.number().integer().positive(),
    ORDER_order_id: Joi.number().integer().positive(),
    is_read: Joi.number().integer(),
    message: Joi.string(),
}
};



module.exports = (app) => {
  const router = new Router({ prefix: "/notifications" });

  router.get("/",validate(getAllByCustomer.validationScheme),getAllByCustomer);

  router.get("/notRead",validate(getNotReadByCustomer.validationScheme),getNotReadByCustomer);

  router.get("/amountNotRead",validate(getAmountNotReadByCustomer.validationScheme),getAmountNotReadByCustomer);

  router.get("/fiveMostRecent",validate(getFiveMostRecentByCustomer.validationScheme),getFiveMostRecentByCustomer);

  router.put("/",validate(updateNotification.validationScheme),updateNotification);

  app.use(router.routes()).use(router.allowedMethods());
}
