const container = require("./shared/bootstrap/container");

const application = container.resolve("app");
const logger = container.resolve("logger");
//const db = container.resolve("db");

application
  .start()
  .then(async () => {
    //await db.startMigrations();
  })
  .catch((err) => {
    logger.error("Application", err);
    process.exit();
  });
