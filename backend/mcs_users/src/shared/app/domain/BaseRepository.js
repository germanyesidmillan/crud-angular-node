class BaseRepository {
  constructor(db, entity, entityToMap) {
    this._db = db;
    this.entity = entity;
    this.entityToMap = entityToMap;
  }

  async transaction() {
    try {
      return await this._db.transaction();
    } catch (error) {
      throw new Error(error);
    }
  }

  async getAll(...args) {
    try {
      const entities = await this._db.getEntity(this.entity).findAll(...args);
      console.log(entities, "test");
      return entities.map((entity) => new this.entityToMap(entity.toJSON()));
    } catch (error) {
      throw new Error(error);
    }
  }

  async get(id) {
    try {
      const entity = await this._db.getEntity(this.entity).findOne({
        where: {
          id,
        },
      });
      if (!entity) return null;
      return new this.entityToMap(entity.toJSON()); //mapper(this.entityToMap, entity.toJSON());
    } catch (error) {
      throw new Error(error);
    }
  }

  async getWithParameters(parameters) {
    try {
      const entity = await this._db.getEntity(this.entity).findOne({
        where: {
          ...parameters,
        },
      });

      if (!entity) return null;
      return new this.entityToMap(entity.toJSON());
    } catch (error) {
      throw new Error(error);
    }
  }

  async create(entity, transaction = null) {
    try {
      entity = new this.entityToMap(entity);
      const createdEntity = await this._db
        .getEntity(this.entity)
        .create(entity, {
          transaction: transaction,
        });

      return new this.entityToMap(createdEntity.toJSON());
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id, entity) {
    try {
      delete entity.createdAt;
      delete entity.updatedAt;
      entity.id = id;
      entity = new this.entityToMap(entity);
      await this._db.getEntity(this.entity).update(entity, {
        where: {
          id,
        },
      });

      return new this.entityToMap(entity);
    } catch (error) {
      throw new Error(error);
    }
  }

  async delete(id) {
    try {
      return await this._db.getEntity(this.entity).destroy({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = BaseRepository;
