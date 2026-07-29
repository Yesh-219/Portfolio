const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

let pool = null;
let isConnected = false;

try {
  pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'portfolio_db',
    port: parseInt(process.env.DB_PORT || '3306'),
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });

  // Quick connectivity check
  pool.getConnection()
    .then(conn => {
      console.log('✅ Connected to MySQL Database successfully.');
      isConnected = true;
      conn.release();
    })
    .catch(err => {
      console.warn('⚠️  MySQL Connection Notice:', err.message);
      console.warn('ℹ️  API will operate with dynamic in-memory fallback datasets if DB is offline.');
    });
} catch (error) {
  console.warn('⚠️  Could not create MySQL pool:', error.message);
}

module.exports = {
  pool,
  getIsConnected: () => isConnected
};
