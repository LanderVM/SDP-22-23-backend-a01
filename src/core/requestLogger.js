const emoji = require("node-emoji");
const { getLogger } = require("./logging");

const requestLogger = async (ctx, next) => {
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
};

module.exports = requestLogger;
