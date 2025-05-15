const Project = require('../models/projectModel');

class ProjectRepository {
  async createProject(data) {
    try {
      const createdProject = await Project.create(data);
      return createdProject;
    } catch (err) {
      throw new Error('Create project error repo:', err);
    }
  }

  async getProjectById(id) {
    try {
      const project = await Project.findByPk(id);
      return project;
    } catch (err) {
      throw new Error('Find project error:', err);
    }
  }

  async getProjectByFullName(url) {
    try {
      const project = await Project.findOne({
        where: { full_name: url },
      });
      return project;
    } catch (err) {
      throw new Error('Find project by URL error: ' + err.message);
    }
  }

  async updateProjectById(id, data) {
    try {
      const project = await this.getProjectById(id);
      if (project) {
        const updatedProject = await project.update(data);
        return updatedProject;
      } else {
        throw new Error('Project not found');
      }
    } catch (err) {
      throw new Error('Update project error:', err);
    }
  }

  async deleteProject(id) {
    try {
      const project = await this.getProjectById(id);
      if (project) {
        await project.destroy();
        return { message: 'Project deleted successfully' };
      } else {
        throw new Error('Project not found');
      }
    } catch (err) {
      throw new Error('Delete project error:', err);
    }
  }
}

module.exports = new ProjectRepository();
