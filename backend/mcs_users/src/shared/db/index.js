const Sequelize = require("sequelize");
const path = require("path");
const fs = require("fs");

class Database {
  constructor({ config }) {
    this.db = {};
    this.sequelize = new Sequelize(
      config.DB.database,
      config.DB.username,
      config.DB.password,
      config.DB
    );
    this.mapModel();
  }

  mapModel() {
    const pathModels = path.join(__dirname, "./models/");

    fs.readdirSync(pathModels).forEach((file) => {
      const model = require(path.join(pathModels, file))(
        this.sequelize,
        Sequelize.DataTypes
      );
      this.db[model.name] = model;
    });

    Object.keys(this.db).forEach((modelName) => {
      if (this.db[modelName].associate) {
        this.db[modelName].associate(this.db);
      }
    });

    this.db.sequelize = this.sequelize;
    this.db.Sequelize = Sequelize;
  }

  getEntity(entity) {
    return this.db[entity];
  }

  async transaction() {
    return await this.db.sequelize.transaction();
  }

  async startMigrations() {
    await this.db.sequelize.sync();
  }

  async close() {
    await this.db.sequelize.close();
  }
}

module.exports = Database;
