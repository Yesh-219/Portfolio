const bcrypt = require('bcryptjs');
const { pool, getIsConnected } = require('../config/db');

// Default Admin credentials in fallback mode: admin@yeswanth.dev / Admin@12345
const DEFAULT_ADMIN_HASH = bcrypt.hashSync('Admin@12345', 10);

class UserModel {
  static async findByEmail(email) {
    if (getIsConnected() && pool) {
      try {
        const [rows] = await pool.execute('SELECT * FROM users WHERE email = ? LIMIT 1', [email]);
        if (rows.length > 0) return rows[0];
      } catch (err) {
        console.warn('MySQL user lookup failed:', err.message);
      }
    }
    if (email === 'admin@yeswanth.dev' || email === 'yeswanthkaluva@gmail.com') {
      return {
        id: 1,
        name: "Yeswanth Kumar Kaluva",
        email: email,
        password_hash: DEFAULT_ADMIN_HASH,
        role: "admin"
      };
    }
    return null;
  }
}

module.exports = UserModel;
