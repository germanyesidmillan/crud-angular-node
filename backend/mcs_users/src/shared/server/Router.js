const httpLogger = require("../middlewares/HttpLogger");
const errorHandler = require("../middlewares/ErrorHandler");
class Router {
  constructor(dependencies) {
    this._server = dependencies.server;
    this._dependencies = dependencies;
    this._logger = dependencies.logger;
    this.Fail = dependencies.response.Fail;
  }

  register() {
    try {
      const router = this._server.router();
      const apiRoute = this._server.router();

      router.use(httpLogger(this._logger));

      Object.keys(this._dependencies)
        .filter((dep) => dep.includes("Route"))
        .forEach((route) =>
          apiRoute.use(
            `/${route.replace("Route", "")}`,
            this._dependencies[`${route}`]
          )
        );

      router.use("/api", apiRoute);

      router.use((req, res, next) => {
        const error = new Error("Not found");
        error.status = 404;
        next(error);
      });

      router.use((err, req, res) =>
        errorHandler(err, res, this._logger, this.Fail)
      );

      this._server.setRouter(router);
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = Router;
