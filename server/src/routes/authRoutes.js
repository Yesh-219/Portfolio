const express = require('express');
const router = express.Router();
const { login, refresh, logout, getMe } = require('../controllers/authController');
const validate = require('../middleware/validate');
const { loginSchema, refreshTokenSchema } = require('../validators/authValidator');
const { authenticateToken } = require('../middleware/authMiddleware');

/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: Admin Login
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@yeswanth.dev
 *               password:
 *                 type: string
 *                 example: Admin@12345
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post('/login', validate(loginSchema), login);

/**
 * @openapi
 * /auth/refresh:
 *   post:
 *     summary: Refresh Access Token
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Token refreshed
 */
router.post('/refresh', refresh);

/**
 * @openapi
 * /auth/logout:
 *   post:
 *     summary: Logout Admin User
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Logged out
 */
router.post('/logout', logout);

/**
 * @openapi
 * /auth/me:
 *   get:
 *     summary: Get Current User Session
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Session active
 */
router.get('/me', authenticateToken, getMe);

module.exports = router;
