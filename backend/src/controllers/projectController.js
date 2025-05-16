const ProjectService = require('../services/projectService');

class ProjectController {
  async createOrUpdateProject(req, res) {
    try {
      const { url } = req.body;
      const { id } = req.user;

      const createdProject = await ProjectService.createOrUpdateProject(url, id);

      res.status(200).json(createdProject);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
  async getAllProjects(req, res) {
    try {
      const { id } = req.user;

      const createdProject = await ProjectService.findProjectsByUserId(id);

      res.status(200).json(createdProject);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  async deleteProject(req, res) {
    try {
      const projectId = req.params.id;
      const userId = req.user.id;
      const deletedProject = await ProjectService.deleteProject(userId, projectId);
      res.status(200).json(deletedProject);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new ProjectController();
