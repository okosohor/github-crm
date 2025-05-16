const jwt = require('jsonwebtoken');
const UserRepository = require('../repositories/userRepository');
const dotenv = require('dotenv');
const comparePassword = require('../utils/helpers/comparePassword');

dotenv.config();

class AuthService {
  async generateTokens(user) {
    const data = {
      id: user.id,
      email: user.email,
    };

    const accessToken = jwt.sign(data, process.env.JWT_SECRET_KEY, { expiresIn: '30m' });
    const refreshToken = jwt.sign(data, process.env.JWT_REFRESH_SECRET_KEY, { expiresIn: '7d' });

    return { accessToken, refreshToken };
  }

  async refreshAccessToken(refreshToken) {
    try {
      const verified = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET_KEY);

      return this.generateTokens({ id: verified.id, email: verified.email });
    } catch (err) {
      throw new Error('Invalid or expired refresh token:' + err);
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

    return await this.generateTokens(user);
  }
}

module.exports = new AuthService();
