const Koa = require("koa");
const Router = require("@koa/router");
const bodyParser = require("koa-bodyparser");
const config = require("config");
const { initializeLogger, getLogger } = require("./core/logging");
const emoji = require("node-emoji");
const installRest = require("./rest/index");

const app = new Koa();
const router = new Router();
const NODE_ENV = process.env.NODE_ENV;
const PORT = config.get("port");
const LOG_LEVEL = config.get("log.level");
const LOG_DISABLED = config.get("log.disabled");

initializeLogger({
  level: LOG_LEVEL,
  disabled: LOG_DISABLED,
  defaultMeta: { NODE_ENV },
});
const logger = getLogger();

app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());

app.use(async (ctx, next) => {
  const logger = getLogger();
  logger.info(`${emoji.get("fast_forward")} ${ctx.method} ${ctx.url}`);

  const getStatusEmoji = () => {
    if (ctx.status >= 500) return emoji.get("skull");
    if (ctx.status >= 400) return emoji.get("x");
    if (ctx.status >= 300) return emoji.get("rocket");
    if (ctx.status >= 200) return emoji.get("white_check_mark");
    return emoji.get("rewind");
  };

  try {
    await next();

    logger.info(`${getStatusEmoji()} ${ctx.method} ${ctx.status} ${ctx.url}`);
  } catch (error) {
    logger.error(`${emoji.get("x")} ${ctx.method} ${ctx.status} ${ctx.url}`, {
      error,
    });

    throw error;
  }
});

app.use(async (ctx, next) => {
  try {
    await next();

    if (ctx.status === 404) {
      ctx.body = {
        code: "NOT_FOUND",
        message: `Unknown resource: ${ctx.url}`,
      };
      ctx.status = 404;
    }
  } catch (error) {
    const logger = getLogger();
    logger.error("Error occured while handling a request", {
      error: serializeError(error),
    });

    let statusCode = error.status || 500;
    let errorBody = {
      code: error.code || "INTERNAL_SERVER_ERROR",
      message: error.message,
      details: error.details || {},
      stack: NODE_ENV !== "production" ? error.stack : undefined,
    };

    if (error instanceof ServiceError) {
      if (error.isNotFound) {
        statusCode = 404;
      }

      if (error.isValidationFailed) {
        statusCode = 400;
      }

      if (error.isUnauthorized) {
        statusCode = 401;
      }

      if (error.isForbidden) {
        statusCode = 403;
      }
    }
    if (ctx.state.jwtOriginalError) {
      statusCode = 401;
      errorBody.code = "UNAUTHORIZED";
      errorBody.message = ctx.state.jwtOriginalError.message;
      errorBody.details.jwtOriginalError = serializeError(
        ctx.state.jwtOriginalError
      );
    }

    ctx.status = statusCode;
    ctx.body = errorBody;
  }
});

app.listen(PORT);
installRest(app);

logger.info(
  `API running on: http://localhost:${PORT}, ENV: ${NODE_ENV}, LEVEL: ${LOG_LEVEL}, DISABLED: ${LOG_DISABLED}`
);
