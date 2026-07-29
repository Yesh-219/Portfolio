const { pool, getIsConnected } = require('../config/db');

const inMemoryMessages = [];

class MessageModel {
  static async create({ name, email, subject, message, ip_address, user_agent }) {
    if (getIsConnected() && pool) {
      try {
        const [result] = await pool.execute(
          `INSERT INTO messages (name, email, subject, message, ip_address, user_agent)
           VALUES (?, ?, ?, ?, ?, ?)`,
          [name, email, subject || null, message, ip_address || null, user_agent || null]
        );
        return { id: result.insertId, name, email, subject, message, created_at: new Date() };
      } catch (err) {
        console.warn('MySQL message insert failed, using memory fallback:', err.message);
      }
    }
    const newMessage = { id: inMemoryMessages.length + 1, name, email, subject, message, ip_address, user_agent, is_read: false, created_at: new Date() };
    inMemoryMessages.push(newMessage);
    return newMessage;
  }

  static async getAll() {
    if (getIsConnected() && pool) {
      try {
        const [rows] = await pool.execute('SELECT * FROM messages ORDER BY created_at DESC');
        return rows;
      } catch (err) {
        console.warn('MySQL message query failed:', err.message);
      }
    }
    return inMemoryMessages;
  }
}

module.exports = MessageModel;
