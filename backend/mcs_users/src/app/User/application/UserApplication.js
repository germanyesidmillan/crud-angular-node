const BaseApplication = require("../../../shared/app/application/BaseApplication");
class UserApplication extends BaseApplication {
  constructor({ UserRepository }) {
    super(UserRepository);
  }
}

module.exports = UserApplication;
