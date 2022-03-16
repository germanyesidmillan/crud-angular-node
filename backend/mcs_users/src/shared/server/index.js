const express = require("express");
const compression = require("compression");
const cors = require("cors");

class Server {
  constructor({ config, documentation, logger }) {
    this._config = config;
    this._server = express();
    this._server.disable("x-powered-by");
    this._server.use(express.json());
    this._server.use(
      express.urlencoded({
        extended: true,
      })
    );
    this._server.use(cors());
    this._server.use(compression());
    documentation.setServer(this._server);
    this._logger = logger;
  }

  setRouter(router) {
    this._server.use(router);
  }

  router() {
    return express.Router();
  }

  start() {
    return new Promise((resolve) => {
      const http = this._server.listen(this._config.PORT, () => {
        const { port } = http.address();
        this._logger.info(`Application running on port ${port}`);
        resolve();
      });
    });
  }
}

module.exports = Server;
