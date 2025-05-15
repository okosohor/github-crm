const AuthService = require('../services/authService');

class AuthController {
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const { accessToken, refreshToken } = await AuthService.login(email, password);

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 10, // 10days
      });

      res.status(200).json({ message: 'Login complete', accessToken });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  async logout() {
    try {
      res.clearCookie('refreshToken', {
        httpOnly: true,
      });

      res.status(200).json({ message: 'Logged out' });
    } catch (err) {
      res.status(401).json({ message: err.message });
    }
  }

  async refresh(req, res) {
    try {
      const { refreshToken } = req.cookies;
      if (!refreshToken) {
        throw new Error('Refresh token not found');
      }

      const { accessToken, refreshToken: newRefreshToken } =
        await AuthService.refreshAccessToken(refreshToken);

      res.cookie('refreshToken', newRefreshToken, {
        maxAge: 1000 * 60 * 60 * 24 * 10,
      });

      res.status(200).json({ accessToken });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
}

module.exports = new AuthController();
