const express = require('express');
const router = express.Router();
const { uploadFile } = require('../controllers/uploadController');
const { upload } = require('../services/uploadService');
const { authenticateToken } = require('../middleware/authMiddleware');

/**
 * @openapi
 * /upload:
 *   post:
 *     summary: Upload Media File to Cloudinary (Admin)
 *     tags: [Media Upload]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *               folder:
 *                 type: string
 *     responses:
 *       201:
 *         description: Media uploaded
 */
router.post('/', authenticateToken, upload.single('file'), uploadFile);

module.exports = router;
