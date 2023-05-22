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
};
getNotReadByCustomer.validationScheme = null;

const getAmountNotReadByCustomer = async (ctx) => {
  ctx.body = await notificationService.getAmountNotReadByAuthId(
    ctx.state.user.sub
  );
};
getAmountNotReadByCustomer.validationScheme = null;

const getFiveMostRecentByCustomer = async (ctx) => {
  ctx.body = await notificationService.getFiveMostRecentByAuthId(
    ctx.state.user.sub
  );
};
getFiveMostRecentByCustomer.validationScheme = null;

const updateNotification = async (ctx) => {
  ctx.body = await notificationService.updateById(ctx.request.body);
};
updateNotification.validationScheme = {
  body: {
    notification_id: Joi.number().integer().positive(),
    notification_date: Joi.string(),
    CUSTOMER_supplier_id: Joi.number().integer().positive(),
    ORDER_order_id: Joi.number().integer().positive(),
    status: Joi.string(),
    message: Joi.string(),
  },
};
const updateToUnread = async (ctx) => {
  ctx.body = await notificationService.updateByArray(ctx.request.body);
};
updateToUnread.validationScheme = {
  body: {
    notifications: Joi.array(),
  },
};

module.exports = (app) => {
  const router = new Router({ prefix: "/notifications" });

  router.get(
    "/",
    validate(getAllByCustomer.validationScheme),
    getAllByCustomer
  );

  router.get(
    "/notRead",
    validate(getNotReadByCustomer.validationScheme),
    getNotReadByCustomer
  );

  router.get(
    "/amountNotRead",
    validate(getAmountNotReadByCustomer.validationScheme),
    getAmountNotReadByCustomer
  );

  router.get(
    "/fiveMostRecent",
    validate(getFiveMostRecentByCustomer.validationScheme),
    getFiveMostRecentByCustomer
  );

  router.put(
    "/",
    validate(updateNotification.validationScheme),
    updateNotification
  );

  router.put(
    "/updateToUnread",
    validate(updateToUnread.validationScheme),
    updateToUnread
  );

  app.use(router.routes()).use(router.allowedMethods());
};
