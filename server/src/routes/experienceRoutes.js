const express = require('express');
const router = express.Router();
const { getExperiences } = require('../controllers/experienceController');

router.get('/', getExperiences);

module.exports = router;
