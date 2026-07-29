const projectService = require('../services/projectService');
const ApiResponse = require('../utils/apiResponse');

const getProjects = async (req, res, next) => {
  try {
    const { category } = req.query;
    const projects = await projectService.getAllProjects(category);
    return res.status(200).json(new ApiResponse(200, projects, 'Projects retrieved successfully'));
  } catch (error) {
    next(error);
  }
};

const getProjectBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const project = await projectService.getProjectBySlug(slug);
    return res.status(200).json(new ApiResponse(200, project, 'Project details retrieved'));
  } catch (error) {
    next(error);
  }
};

const createProject = async (req, res, next) => {
  try {
    const newProject = await projectService.createProject(req.body);
    return res.status(201).json(new ApiResponse(201, newProject, 'Project created successfully'));
  } catch (error) {
    next(error);
  }
};

const updateProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updated = await projectService.updateProject(id, req.body);
    return res.status(200).json(new ApiResponse(200, updated, 'Project updated successfully'));
  } catch (error) {
    next(error);
  }
};

const deleteProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    await projectService.deleteProject(id);
    return res.status(200).json(new ApiResponse(200, null, 'Project deleted successfully'));
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProjects,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject
};
