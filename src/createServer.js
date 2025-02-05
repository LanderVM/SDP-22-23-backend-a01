const Koa = require("koa");
const Router = require("@koa/router");
const bodyParser = require("koa-bodyparser");
const config = require("config");
const { initializeLogger, getLogger } = require("./core/logging");
const requestLogger = require("./core/requestLogger");
const errorHandler = require("./core/errorHandler");
const corsMiddleware = require("./core/corsMiddleware");
const installRest = require("./rest/index");
const { initializeDatabase, shutdownData } = require("./data/index");
const { checkJwtToken } = require("./core/auth");
const { logAuth } = require("./core/auth");

const app = new Koa();
const router = new Router();
const NODE_ENV = process.env.NODE_ENV;
const PORT = config.get("port");
const LOG_LEVEL = config.get("log.level");
const LOG_DISABLED = config.get("log.disabled");

module.exports = async function createServer() {
  initializeLogger({
    level: LOG_LEVEL,
    disabled: LOG_DISABLED,
    defaultMeta: { NODE_ENV },
  });
  const logger = getLogger();

  initializeDatabase();

  app.use(checkJwtToken());
  app.use(logAuth);

  app.use(bodyParser());
  app.use(router.routes()).use(router.allowedMethods());

  app.use(requestLogger);
  app.use(errorHandler);
  app.use(corsMiddleware);

  installRest(app);

  return {
    getApp() {
      return app;
    },
    start() {
      return new Promise((resolve) => {
        app.listen(PORT);
        logger.info(
          `API running on: http://localhost:${PORT}, ENV: ${NODE_ENV}, LEVEL: ${LOG_LEVEL}, DISABLED: ${LOG_DISABLED}`
        );
        resolve();
      });
    },
    async stop() {
      app.removeAllListeners();
      await shutdownData();
      getLogger().info("Server closing");
    },
  };
};
