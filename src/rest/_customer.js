const Router = require("@koa/router");
const customerService = require("../service/customer");
const Joi = require("joi");
const validate = require("./_validation.js");
const { addUserInfo, permissions, hasPermission } = require("../core/auth");

const getCustomerByAuthId = async (ctx) => {
  await addUserInfo(ctx);
  ctx.body = await customerService.getByAuthId(ctx.state.user.sub);
};
getCustomerByAuthId.validationScheme = null;

const getAllColleagues = async (ctx) => {
  await addUserInfo(ctx);
  ctx.body = await customerService.getAllColleagues(ctx.state.user.sub);
};
getAllColleagues.validationScheme = null;

const getAllOrders = async (ctx) => {
  await addUserInfo(ctx);
  ctx.body = await customerService.getAllOrders(ctx.state.user.sub);
};
getAllOrders.validationScheme = null;

module.exports = (app) => {
  const router = new Router({ prefix: "/customers" });

  router.get(
    "/me",
    hasPermission(permissions.purchase),
    validate(getCustomerByAuthId.validationScheme),
    getCustomerByAuthId
  );

  router.get(
    "/colleagues",
    hasPermission(permissions.purchase),
    validate(getAllColleagues.validationScheme),
    getAllColleagues
  );

  router.get(
    "/orders",
    hasPermission(permissions.purchase),
    validate(getAllOrders.validationScheme),
    getAllOrders
  );
  app.use(router.routes()).use(router.allowedMethods());
};
