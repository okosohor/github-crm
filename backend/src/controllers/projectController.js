const ProjectService = require('../services/projectService');
const jwt = require('jsonwebtoken');

class ProjectController {
  async createProject(req, res) {
    try {
      const { url } = req.body;

      const token = req.headers.authorization?.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

      const createdProject = await ProjectService.createProject(url, decoded.id);

      res.status(200).json(createdProject);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
}

module.exports = new ProjectController();
