const express = require('express');
const router = express.Router();
const { submitContact, getMessages } = require('../controllers/contactController');
const validate = require('../middleware/validate');
const { contactFormSchema } = require('../validators/contactValidator');
const { contactLimiter } = require('../middleware/rateLimiter');
const { authenticateToken } = require('../middleware/authMiddleware');

/**
 * @openapi
 * /contact:
 *   post:
 *     summary: Submit Contact Message
 *     tags: [Contact]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, message]
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               subject:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       201:
 *         description: Message sent successfully
 */
router.post('/', contactLimiter, validate(contactFormSchema), submitContact);

/**
 * @openapi
 * /contact/messages:
 *   get:
 *     summary: Get All Messages (Admin)
 *     tags: [Contact]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of contact messages
 */
router.get('/messages', authenticateToken, getMessages);

module.exports = router;
