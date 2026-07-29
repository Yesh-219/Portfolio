const express = require('express');
const router = express.Router();
const { getProjects, getProjectBySlug, createProject, updateProject, deleteProject } = require('../controllers/projectController');
const validate = require('../middleware/validate');
const { createProjectSchema, updateProjectSchema } = require('../validators/projectValidator');
const { authenticateToken } = require('../middleware/authMiddleware');

/**
 * @openapi
 * /projects:
 *   get:
 *     summary: Fetch All Projects
 *     tags: [Projects]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by category (All, Deep Learning, Full Stack, Backend)
 *     responses:
 *       200:
 *         description: List of projects
 */
router.get('/', getProjects);

/**
 * @openapi
 * /projects/{slug}:
 *   get:
 *     summary: Fetch Project Details by Slug
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Project details
 */
router.get('/:slug', getProjectBySlug);

/**
 * @openapi
 * /projects:
 *   post:
 *     summary: Create New Project (Admin)
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Project created
 */
router.post('/', authenticateToken, validate(createProjectSchema), createProject);

/**
 * @openapi
 * /projects/{id}:
 *   put:
 *     summary: Update Project (Admin)
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Project updated
 */
router.put('/:id', authenticateToken, validate(updateProjectSchema), updateProject);

/**
 * @openapi
 * /projects/{id}:
 *   delete:
 *     summary: Delete Project (Admin)
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Project deleted
 */
router.delete('/:id', authenticateToken, deleteProject);

module.exports = router;
