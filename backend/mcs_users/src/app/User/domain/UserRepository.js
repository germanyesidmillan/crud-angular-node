const BaseRepository = require("../../../shared/app/domain/BaseRepository");
const User = require("./UserModel");
class UserRepository extends BaseRepository {
  constructor({ db }) {
    super(db, "User", User);
  }
}

module.exports = UserRepository;
