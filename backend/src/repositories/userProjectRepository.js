const UserProject = require('../models/userProjectModel');

class UserProjectRepository {
  async createUserProject(data) {
    try {
      const createdUserProject = await UserProject.create(data);
      console.log('userProject', createdUserProject);
      return createdUserProject;
    } catch (err) {
      throw new Error('Create user project error: ', err.message);
    }
  }

  async checkIfUserHaveProject(userId, projectId) {
    try {
      const userProject = await UserProject.findOne({
        where: { user_id: userId, project_id: projectId },
      });
      return userProject;
    } catch (err) {
      throw new Error('Error check user project ', err.message);
    }
  }
}

module.exports = new UserProjectRepository();
