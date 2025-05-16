const UserProjectService = require('../services/userProjectService');

class UserProjectController {
  async deleteProject(req, res) {
    const userId = req.user.id;

    const projectId = req.params.id;
    try {
      const deletedProject = await UserProjectService.deleteUserProject(userId, projectId);
      res.status(200).json(deletedProject);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async deleteAllProjects(req, res) {
    const userId = req.user.id;
    try {
      const deletedProjects = await UserProjectService.deleteAllUserProjects(userId);
      res.status(200).json(deletedProjects);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new UserProjectController();
