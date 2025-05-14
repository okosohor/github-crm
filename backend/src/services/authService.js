const jwt = require('jsonwebtoken');
const UserRepository = require('../repositories/userRepository');
const dotenv = require('dotenv');

dotenv.config();

class AuthService {
  async generateTokens(user) {
    const data = {
      userId: user.data,
      email: user.email,
    };

    // TODO: add time
    const accesToken = jwt.sign(data, process.env.JWT_SECRET_KEY, { expiresIn: '5m' });
    const refreshToken = jwt.sign(data, process.env.JWT_SECRET_KEY, { expiresIn: '10m' });

    return { accesToken, refreshToken };
  }

  async refreshAccesToken() {
    try {
      const verified = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET_KEY);
      return this.generateTokens({ id: verified.userId, email: verified.email });
    } catch (err) {
      throw new Error('Invalid or expired refresh token:', err);
    }
  }

  async login(email, password) {
    const user = await UserRepository.getUserByEmail(email);
    if (!user) {
      throw new Error('Check your email or password');
    }

    const isCorrectPassword = await comparePassword(password, user.password);
    if (!isCorrectPassword) {
      throw new Error('Check your email or password');
    }

    return this.generateTokens(user);
  }
}

module.exports = new AuthService();
