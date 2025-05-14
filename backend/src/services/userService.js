const UserRepository = require('../repositories/userRepository');
const bcrypt = require('bcryptjs');

class userService {
  async registerUser({ email, password }) {
    try {
      const user = await UserRepository.getUserByEmail(email);
      if (user) {
        throw new Error('User is registered');
      }

      const hash = await bcrypt.hash(password, 2);
      const createdUser = await UserRepository.createUser({ email, password: hash });

      return createdUser;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async findUserByEmail(email) {
    try {
      const user = await UserRepository.getUserByEmail(email);
      if (!user);
      throw new Error('User not found');
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

module.exports = new userService();
