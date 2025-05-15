const ProjectRepository = require('../repositories/projectRepository');
const UserProjectRepository = require('../repositories/userProjectRepository');
const gitHubService = require('./gitHubService');
// const { sequelize } = require('../config/db');
const projectRepository = require('../repositories/projectRepository');

class ProjectService {
  async createProject(url, userId) {
    const [owner, name] = url.split('/');
    try {
      console.log('try');
      const repoData = await gitHubService.getRepoData(owner, name);
      const newProject = {
        full_name: repoData.full_name,
        owner: repoData.owner.login,
        name: repoData.name,
        url: repoData.html_url,
        stars: repoData.stargazers_count,
        forks: repoData.forks_count,
        issues: repoData.open_issues_count,
      };

      const projectInDb = await projectRepository.getProjectByFullName(repoData.full_name);

      let createdOrUpdatedProject;
      // TODO add user id
      //TOTO CREATE TRANSACTION

      if (projectInDb) {
        const updatedProject = await ProjectRepository.updateProjectById(
          projectInDb.id,
          newProject,
        );
        createdOrUpdatedProject = updatedProject;
        const userProject = await UserProjectRepository.checkIfUserHaveProject(
          userId,
          updatedProject.id,
        );
        if (!userProject) {
          await UserProjectRepository.createUserProject({
            user_id: userId,
            project_id: updatedProject.id,
          });
        }
      } else {
        try {
          const createdProject = await ProjectRepository.createProject(newProject);
          createdOrUpdatedProject = createdProject;
          await UserProjectRepository.createUserProject({
            user_id: userId,
            project_id: createdProject.id,
          });
        } catch (err) {
          throw new Error('Error create project', err.message);
        }
      }
      return { createdOrUpdatedProject };
    } catch (err) {
      throw new Error('Create project error service', err);
    }
  }

  async updateProject(id, data) {
    try {
      const updatedProject = await ProjectRepository.updateProjectById(id, data);
      return updatedProject;
    } catch (err) {
      throw new Error(err);
    }
  }

  async deleteProject(id) {
    try {
      const deletedProject = await ProjectRepository.deleteProject(id);
      return deletedProject;
    } catch (err) {
      throw new Error(err);
    }
  }

  async findProjectsByUserId(id) {
    try {
      const projects = await ProjectRepository.findProjectsByUserId(id);
      return projects;
    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = new ProjectService();
