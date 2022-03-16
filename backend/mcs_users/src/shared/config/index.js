require("dotenv").config();
const { name, version } = require("../../../package.json");

const { NODE_ENV } = process.env;

const services = {
  name,
  version,
};

const env = {
  development: require("./development"),
  production: require("./production"),
};

const currentEnv = env[NODE_ENV || "development"];

module.exports = {
  services,
  ...currentEnv,
};
