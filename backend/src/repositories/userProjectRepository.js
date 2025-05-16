const UserProject = require('../models/userProjectModel');

class UserProjectRepository {
  async createUserProject(data) {
    try {
      const createdUserProject = await UserProject.create(data);
      return createdUserProject;
    } catch (err) {
      throw new Error('Create user project error: ' + err.message);
    }
  }

  async checkIfUserHaveProject(userId, projectId) {
    try {
      const userProject = await UserProject.findOne({
        where: { user_id: userId, project_id: projectId },
      });
      return userProject;
    } catch (err) {
      throw new Error('Error check user project' + err.message);
    }
  }

  async getUserProjectsIds(userId) {
    try {
      const userProjects = await UserProject.findAll({
        where: { user_id: userId },
        attributes: ['project_id'],
      });

      const projectIds = userProjects.map((userProject) => userProject.project_id);
      return projectIds;
    } catch (err) {
      throw new Error('Error fetching user project IDs: ' + err.message);
    }
  }

  async deleteUserProject(userId, projectId) {
    try {
      const deletedUserProject = await UserProject.destroy({
        where: {
          user_id: userId,
          project_id: projectId,
        },
      });

      return deletedUserProject;
    } catch (err) {
      throw new Error('Delete user project error: ' + err.message);
    }
  }
  async deleteAllUserProjects(userId) {
    try {
      const deletedUserProject = await UserProject.destroy({
        where: {
          user_id: userId,
        },
      });

      return deletedUserProject;
    } catch (err) {
      throw new Error('Delete user project error: ' + err.message);
    }
  }
}

module.exports = new UserProjectRepository();
