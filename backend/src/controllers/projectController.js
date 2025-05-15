const ProjectService = require('../services/projectService');

class ProjectController {
  async createProject(req, res) {
    try {
      const { url } = req.body;
      const { id } = req.user;

      const createdProject = await ProjectService.createProject(url, id);

      res.status(200).json(createdProject);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
}

module.exports = new ProjectController();
