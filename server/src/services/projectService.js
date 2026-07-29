const projectRepository = require('../repositories/projectRepository');
const ApiError = require('../utils/apiError');
const logger = require('../config/logger');

class ProjectService {
  async getAllProjects(category) {
    return await projectRepository.findAll(category);
  }

  async getProjectBySlug(slug) {
    const project = await projectRepository.findBySlug(slug);
    if (!project) {
      throw new ApiError(404, `Project with slug '${slug}' not found`);
    }
    return project;
  }

  async createProject(data) {
    const slug = data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const existing = await projectRepository.findBySlug(slug);
    if (existing) {
      throw new ApiError(400, `Project with slug '${slug}' already exists`);
    }
    logger.info(`Creating new project: ${data.title}`);
    return await projectRepository.create({ ...data, slug });
  }

  async updateProject(id, data) {
    const updated = await projectRepository.update(id, data);
    if (!updated) {
      throw new ApiError(404, `Project with ID ${id} not found`);
    }
    return updated;
  }

  async deleteProject(id) {
    const deleted = await projectRepository.delete(id);
    if (!deleted) {
      throw new ApiError(404, `Project with ID ${id} not found`);
    }
    return deleted;
  }
}

module.exports = new ProjectService();
