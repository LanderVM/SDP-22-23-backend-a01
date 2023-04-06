const errorHandler = async (ctx, next) => {
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
};

module.exports = errorHandler;
