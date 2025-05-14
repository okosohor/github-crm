const userService = require('../services/userService');

class UserController {
  async register(req, res) {
    try {
      const { email, password } = req.body;

      await userService.registerUser({ email, password });

      res.status(200).json({ message: 'User registered' });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
}

module.exports = new UserController();
