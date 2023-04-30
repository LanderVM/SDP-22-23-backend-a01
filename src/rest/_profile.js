const Router = require("@koa/router");
const profileService = require("../service/profile");
const Joi = require("joi");
const validate = require("./_validation.js");
const { addUserInfo } = require("../core/auth");

const getProfileByAuthId = async (ctx) => {
  await addUserInfo(ctx);
  ctx.body = await profileService.getByAuthId(ctx.state.user.sub);
};
getProfileByAuthId.validationScheme = null;

const getAllColleagues = async (ctx) => {
  await addUserInfo(ctx);
  ctx.body = await profileService.getAllColleagues(ctx.state.user.sub);
};
getAllColleagues.validationScheme = null;

module.exports = (app) => {
  const router = new Router({ prefix: "/profile" });

  router.get(
    "/",
    validate(getProfileByAuthId.validationScheme),
    getProfileByAuthId
  );

  router.get(
    "/colleagues",
    validate(getAllColleagues.validationScheme),
    getAllColleagues
  );

  app.use(router.routes()).use(router.allowedMethods());
};
