const UserProjectRepository = require('../repositories/userProjectRepository');

class UserProjectService {
  async deleteUserProject(userId, projectId) {
    try {
      const deletedProject = await UserProjectRepository.deleteUserProject(userId, projectId);
      return deletedProject;
    } catch (err) {
      throw new Error(err);
    }
  }
  async deleteAllUserProjects(userId) {
    try {
      const deletedProjects = await UserProjectRepository.deleteAllUserProjects(userId);
      return deletedProjects;
    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = new UserProjectService();
