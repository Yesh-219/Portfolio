const express = require('express');
const router = express.Router();
const { submitMessage, getMessages } = require('../controllers/messageController');
const { contactLimiter } = require('../middleware/rateLimiter');
const { authenticateToken } = require('../middleware/authMiddleware');

router.post('/', contactLimiter, submitMessage);
router.get('/', authenticateToken, getMessages);

module.exports = router;
