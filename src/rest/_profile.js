const Router = require("@koa/router");
const profileService = require("../service/profile");
const Joi = require("joi");
const validate = require("./_validation.js");
const { addUserInfo } = require("../core/auth");

const getAllProfileData = async (ctx) => {
  await addUserInfo(ctx);
  ctx.body = await profileService.getAll(ctx.state.user.sub);
};
getAllProfileData.validationScheme = null;

module.exports = (app) => {
  const router = new Router({ prefix: "/profile" });

  router.get(
    "/",
    validate(getAllProfileData.validationScheme),
    getAllProfileData
  );

  app.use(router.routes()).use(router.allowedMethods());
};
