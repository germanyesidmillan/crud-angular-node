const { asClass, createContainer, asFunction, asValue } = require("awilix");

// app start
const StartUp = require("./startup");
const Server = require("../server");
const config = require("../config");

// tools
const { ImportFiles } = require("../tools");

// routes
const Routes = require("../server/Router");
const registerRoutes = ImportFiles(
  "src/app/**/infrastructure/*Route.*",
  (item) => asFunction(item).singleton(),
  true
);

// controllers
const registerControllers = ImportFiles(
  "src/app/**/infrastructure/*Controller.*",
  (item) => asClass(item).singleton(),
  true
);

// repositories
const registerRepositories = ImportFiles(
  "src/app/**/domain/*Repository.*",
  (item) => asClass(item).singleton(),
  true
);

// Cases Uses
const registerApplications = ImportFiles(
  "src/app/**/application/*Application.*",
  (item) => asClass(item).singleton(),
  true
);

// db
const db = require("../db/");

// Doc
const Documentation = require("../documentation");

// Logger
const Logger = require("../logger");

// Response
const response = require("../tools/response");

const container = createContainer();

container
  .register({
    app: asClass(StartUp).singleton(),
    router: asClass(Routes).singleton(),
    server: asClass(Server).singleton(),
    documentation: asClass(Documentation).singleton(),
    logger: asClass(Logger).singleton(),
    ...registerRoutes,
    ...registerControllers,
  })
  .register({
    config: asValue(config),
    importFiles: asValue(ImportFiles),
    response: asFunction(response).singleton(),
  })
  .register({
    db: asClass(db).singleton(),
  })
  .register(registerRepositories)
  .register(registerApplications);

module.exports = container;
