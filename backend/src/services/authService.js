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

    // TODO: add time
    const accessToken = jwt.sign(data, process.env.JWT_SECRET_KEY, { expiresIn: '5m' });
    const refreshToken = jwt.sign(data, process.env.JWT_SECRET_KEY, { expiresIn: '10m' });

    return { accessToken, refreshToken };
  }

  async refreshAccessToken() {
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
    console.log('2 pass', password, user.password);

    const isCorrectPassword = await comparePassword(password, user.password);

    console.log('correct pass', isCorrectPassword);
    if (!isCorrectPassword) {
      throw new Error('Check your email or password');
    }

    console.log('auth service login user', await this.generateTokens(user));
    return await this.generateTokens(user);
  }
}

module.exports = new AuthService();
