const Koa = require('koa');
const { getLogger, initializeLogger } = require('./core/logging');
const { initializeDatabase, shutdownData } = require('./data/index');
const config = require('config');
const bodyParser = require('koa-bodyparser');
const installRest = require('./rest/index');
const ServiceError = require('./core/serviceError')
const koaCors = require('@koa/cors');
const { checkJwtToken } = require('./core/auth');
const { port } = require('../config/production');

const NODE_ENV = config.get('env');
const CORS_ORIGINS = config.get('cors.origins');
const CORS_MAX_AGE = config.get('cors.maxAge');
const LOG_LEVEL = config.get('log.level');
const LOG_DISABLED = config.get('log.disabled');

module.exports = async function createServer() {
    
  initializeLogger({
    level: LOG_LEVEL,
    disabled: LOG_DISABLED,
    defaultMeta: { NODE_ENV },
  });

  await initializeDatabase();
  const app = new Koa();
  const logger = getLogger();
    
	app.use(
		koaCors({
			origin: (ctx) => {
				if (CORS_ORIGINS.indexOf(ctx.request.header.origin) !== -1) {
					return ctx.request.header.origin;
				}
				return CORS_ORIGINS[0];
			},
			allowHeaders: ['Accept', 'Content-Type', 'Authorization'],
			maxAge: CORS_MAX_AGE,
            credentials: true
		})
	);

  app.use(checkJwtToken());

  app.use(async (ctx, next) => {
        
    logger.debug(`Token : ${ctx.headers.authorization}`); 
    logger.debug(`Current user : ${JSON.stringify(ctx.state)}`); 
    logger.debug(`Error : ${ctx.state.jwtOriginalError}`); 
    await next();
  });

  app.use(bodyParser())

  app.use(async (ctx, next) => {
    const logger = getLogger();
	  logger.info(`${'▶️ '} ${ctx.method} ${ctx.url}`);

    const getStatusEmoji = () => {
      if (ctx.status >= 500) return '❓ ';
      if (ctx.status >= 400) return '❌ ';
      if (ctx.status >= 300) return '🚀 ';
      if (ctx.status >= 200) return '✔️ ';
        return '⏪ ';
      };

        try {
            await next();

            logger.info(
                `${getStatusEmoji()} ${ctx.method} ${ctx.status} ${ctx.url}`,
            );
        } catch (error) {
            logger.error(error)
            logger.error(`'❌' ${ctx.method} ${ctx.status} ${ctx.url}`, {
                error,
            });

            throw error;
        }
    })

      app.use(async (ctx, next) => {
    try {
      await next();

      if (ctx.status === 404) {
        ctx.body = {
          code: 'NOT_FOUND',
          message: `Unknown resource: ${ctx.url}`,
        };
        ctx.status = 404;
      }
    } catch (error) {
      const logger = getLogger();
      logger.error('Error occured while handling a request');

      let statusCode = error.status || 500;
      let errorBody = {
        code: error.code || 'INTERNAL_SERVER_ERROR',
        message: error.message,
        details: error.details || {},
        stack: NODE_ENV !== 'production' ? error.stack : undefined,
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
        errorBody.code = 'UNAUTHORIZED';
        errorBody.message = ctx.state.jwtOriginalError.message;
      }

      ctx.status = statusCode;
      ctx.body = errorBody;
    }
  });

    installRest(app); 

    return {
        getApp() {
            return app;
        },
        start() {
            return new Promise((resolve) => {
                app.listen(port);
                logger.info(`Server listing on port ${port}`);
                resolve()
            });
            
        },
        async stop() {
            app.removeAllListeners();
            await shutdownData();
            getLogger().info('Goodbye')
        }
    }

}
