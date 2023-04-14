const createServer = require("./createServer");
const { getLogger } = require("./core/logging");

async function main() {
  try {
    const server = await createServer();
    await server.start();

    async function onClose() {
      await server.stop();
      process.exit(0);
    }

    process.on("SIGTERM", onClose);
    process.on("SIGQUIT", onClose);
  } catch (error) {
    const logger = getLogger();
    logger.error(error);
    console.log(error);
    process.exit(-1);
  }
}

main();
