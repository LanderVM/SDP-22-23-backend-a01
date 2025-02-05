const config = require("config");
const knex = require("knex");
const { join } = require("path");
const { getLogger } = require("../core/logging");
const NODE_ENV = config.get("env");
const isDevelopment = NODE_ENV === "development";

const DATABASE_CLIENT = config.get("database.client");
const DATABASE_NAME = config.get("database.name");
const DATABASE_HOST = config.get("database.host");
const DATABASE_PORT = config.get("database.port");

let DATABASE_USERNAME;
let DATABASE_PASSWORD;

if (isDevelopment || NODE_ENV === "test") {
  DATABASE_USERNAME = config.get("database.username_local");
  DATABASE_PASSWORD = config.get("database.password_local");
} else {
  DATABASE_USERNAME = config.get("database.username_host");
  DATABASE_PASSWORD = config.get("database.password_host");
}

let knexInstance;

const getKnexLogger = (logger, level) => (message) => {
  if (message.sql) {
    logger.log(level, message.sql);
  } else if (message.length && message.forEach) {
    message.forEach((innerMessage) =>
      logger.log(
        level,
        innerMessage.sql ? innerMessage.sql : JSON.stringify(innerMessage)
      )
    );
  } else {
    logger.log(level, JSON.stringify(message));
  }
};

async function initializeDatabase() {
  const logger = getLogger();
  logger.info("Initializing connection to the database");

  const knexOptions = {
    client: DATABASE_CLIENT,
    connection: {
      host: DATABASE_HOST,
      port: DATABASE_PORT,
      user: DATABASE_USERNAME,
      password: DATABASE_PASSWORD,
      insecureAuth: isDevelopment,
    },
    debug: isDevelopment,
    log: {
      debug: getKnexLogger(logger, "debug"),
      error: getKnexLogger(logger, "error"),
      warn: getKnexLogger(logger, "warn"),
      deprecate: (method, alternative) =>
        logger.warn("Knex reported something deprecated", {
          method,
          alternative,
        }),
    },
    migrations: {
      tableName: "knex_meta",
      directory: join("src", "data", "migrations"),
    },
    seeds: {
      directory: join("src", "data", "seeds"),
    },
  };

  knexInstance = knex(knexOptions);

  //test database
  try {
    await knexInstance.raw("SELECT 1+1 AS result");
    await knexInstance.raw(`CREATE DATABASE IF NOT EXISTS ${DATABASE_NAME}`);
    await knexInstance.destroy();

    knexOptions.connection.database = DATABASE_NAME;
    knexInstance = knex(knexOptions);
    await knexInstance.raw("SELECT 1+1 AS result");
  } catch (error) {
    logger.error(error.message, { error });
    throw new Error("Could not initialize the data layer");
  }

  //start migrations
  let migrationsFailed = true;
  try {
    await knexInstance.migrate.latest();
    migrationsFailed = false;
  } catch (error) {
    logger.error("Error while migrating the database", {
      error,
    });
  }

  if (migrationsFailed) {
    try {
      await knexInstance.migrate.down();
    } catch (error) {
      logger.error("Error while undoing last migration", {
        error,
      });
    }
    throw new Error("Migrations failed");
  }

  //run seeds in dev mode
  if (isDevelopment) {
    try {
      await knexInstance.seed.run();
    } catch (error) {
      logger.error("Error while seeding database", {
        error,
      });
    }
  }

  logger.info(
    `Succesfully connected to the database | DATABASE_HOST:"${DATABASE_HOST}"`
  );

  return knexInstance;
}

async function shutdownData() {
  const logger = getLogger();

  logger.info("Shutting down database connection");

  await knexInstance.destroy();
  knexInstance = null;

  logger.info("Database connection closed");
}

function getKnex() {
  if (!knexInstance)
    throw new Error(
      "Please initialize the data layer before getting the Knex instance"
    );
  return knexInstance;
}

const tables = {
  carrier: "carrier",
  carrier_contact_person: "carrier_contact_person",
  company_logo: "company_logo",
  contact_person: "contact_person",
  order: "customer_order",
  order_line: "customer_order_line",
  order_notification: "order_notification",
  packaging: "packaging",
  product: "product",
  supplier: "supplier",
  supplier_contact_person: "supplier_contact_person",
  tracking_code_details: "tracking_code_details",
  user: "user",
  customer: "customer",
};

module.exports = {
  tables,
  getKnex,
  initializeDatabase,
  shutdownData,
};
