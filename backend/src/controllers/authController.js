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

      res.status(200).json({ message: 'Login complete', accessToken, refreshToken });
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
      const refreshTokenFromBody = req.body.refreshToken;
      if (!refreshTokenFromBody) {
        throw new Error('Refresh token not found');
      }

      const { accessToken, refreshToken } =
        await AuthService.refreshAccessToken(refreshTokenFromBody);

      console.log(accessToken, refreshToken);
      res.status(200).json({ accessToken, refreshToken });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
}

module.exports = new AuthController();
