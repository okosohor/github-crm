const ProjectRepository = require('../repositories/projectRepository');
const UserProjectRepository = require('../repositories/userProjectRepository');
const gitHubService = require('./gitHubService');
const projectRepository = require('../repositories/projectRepository');

class ProjectService {
  // TODO create more services  for createorupdate
  async createOrUpdateProject(url, userId) {
    const [owner, name] = url.split('/');
    try {
      const repoData = await gitHubService.getRepoData(owner, name);
      const newProject = {
        full_name: repoData.full_name,
        owner: repoData.owner.login,
        name: repoData.name,
        url: repoData.html_url,
        stars: repoData.stargazers_count,
        forks: repoData.forks_count,
        issues: repoData.open_issues_count,
        created_at: repoData.created_at,
      };

      const projectInDb = await projectRepository.getProjectByFullName(repoData.full_name);

      let createdOrUpdatedProject;

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
          throw new Error('Error create project' + err.message);
        }
      }
      return createdOrUpdatedProject;
    } catch (err) {
      if ('' + err === 'Error: Not Found') {
        throw new Error('Project not found on GitHub');
      }
      throw new Error('Create project error:' + err);
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
      const projectIds = await UserProjectRepository.getUserProjectsIds(id);
      const projects = ProjectRepository.getProjectsByIds(projectIds);
      return projects;
    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = new ProjectService();
