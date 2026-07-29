const express = require('express');
const router = express.Router();
const { getIsPrismaConnected } = require('../config/prisma');

/**
 * @openapi
 * /health:
 *   get:
 *     summary: Application Health Status
 *     tags: [Health Check]
 *     responses:
 *       200:
 *         description: API Operational
 */
router.get('/', (req, res) => {
  res.status(200).json({
    status: 'UP',
    message: 'Enterprise Portfolio API Service Operational',
    timestamp: new Date()
  });
});

/**
 * @openapi
 * /health/db:
 *   get:
 *     summary: Database Health Status
 *     tags: [Health Check]
 *     responses:
 *       200:
 *         description: Database Connectivity Info
 */
router.get('/db', (req, res) => {
  const isConnected = getIsPrismaConnected();
  res.status(isConnected ? 200 : 503).json({
    status: isConnected ? 'CONNECTED' : 'OFFLINE_FALLBACK',
    database: 'MySQL (Prisma ORM)',
    timestamp: new Date()
  });
});

module.exports = router;
