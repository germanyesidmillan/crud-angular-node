class BaseApplication {
  constructor(EntityRepository) {
    this._entityRepository = EntityRepository;
  }

  async beginTransaction() {
    try {
      return await this._entityRepository.transaction();
    } catch (error) {
      throw new Error(error);
    }
  }

  async getAll(...args) {
    try {
      return await this._entityRepository.getAll(...args);
    } catch (error) {
      throw new Error(error);
    }
  }

  async get(id) {
    try {
      return await this._entityRepository.get(id);
    } catch (error) {
      throw new Error(error);
    }
  }

  async getWithParameters(parameters) {
    try {
      return await this._entityRepository.getWithParameters(parameters);
    } catch (error) {
      throw new Error(error);
    }
  }

  async create(entity, transaction = null) {
    try {
      return await this._entityRepository.create(entity, transaction);
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id, entity) {
    try {
      return await this._entityRepository.update(id, entity);
    } catch (error) {
      throw new Error(error);
    }
  }

  async delete(id) {
    try {
      return await this._entityRepository.delete(id);
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = BaseApplication;
