const User = require('../models/userModel');

class UserRepository {
  async createUser(data) {
    try {
      const createdUser = await User.create(data);
      return createdUser;
    } catch (err) {
      throw new Error('Create user error:' + err.message);
    }
  }

  async getUserByEmail(email) {
    try {
      const user = await User.findOne({ where: { email } });
      return user;
    } catch (err) {
      throw new Error('Find user by email error: ', err.message);
    }
  }
}

module.exports = new UserRepository();
