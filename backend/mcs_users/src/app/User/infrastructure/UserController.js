class UserController {
  constructor({ UserApplication, logger, response: { Success } }) {
    this._UserApplication = UserApplication;
    this._logger = logger;
    this.Success = Success;
  }

  async index(req, res, next) {
    try {
      const Users = await this._UserApplication.getAll();
      res.status(200).json(this.Success(Users));
      console.log('Usuarios:',Users);
    } catch (error) {
      next(error);
    }
  }

  async show(req, res, next) {
    try {
      const { params } = req;
      const User = await this._UserApplication.get(params.id);
      res.status(200).json(this.Success(User));
    } catch (error) {
      next(error);
    }
  }

  async store(req, res, next) {
    try {
      const { body } = req;
      const User = await this._UserApplication.create(body);
      res.status(201).json(this.Success(User));
    } catch (error) {
      next(error);
    }
  }

  async edit(req, res, next) {
    try {
      const { body, params } = req;
      const User = await this._UserApplication.update(params.id, body);
      res.status(201).json(this.Success(User));
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const { params } = req;
      const User = await this._UserApplication.delete(params.id);
      res.status(201).json(this.Success(User));
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
