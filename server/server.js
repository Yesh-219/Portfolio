const dotenv = require('dotenv');
dotenv.config();

const app = require('./src/app');
const logger = require('./src/config/logger');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  logger.info(`🚀 Portfolio Enterprise REST API Server Running on Port ${PORT}`);
  logger.info(`📖 Swagger Documentation available at http://localhost:${PORT}/api/docs`);
  console.log(`
🚀 ========================================================
   Enterprise REST API Running on Port ${PORT}
   Environment: ${process.env.NODE_ENV || 'development'}
   Swagger Docs: http://localhost:${PORT}/api/docs
   Health Status: http://localhost:${PORT}/api/v1/health
======================================================== 🚀
  `);
});
