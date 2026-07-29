const { prisma, getIsPrismaConnected } = require('../config/prisma');

const fallbackMessages = [];

class MessageRepository {
  async create(data) {
    if (getIsPrismaConnected() && prisma) {
      try {
        return await prisma.message.create({ data });
      } catch (err) {
        console.warn('Prisma message create error, using memory fallback:', err.message);
      }
    }
    const newMessage = { id: fallbackMessages.length + 1, ...data, isRead: false, createdAt: new Date() };
    fallbackMessages.push(newMessage);
    return newMessage;
  }

  async findAll() {
    if (getIsPrismaConnected() && prisma) {
      try {
        return await prisma.message.findMany({
          orderBy: { createdAt: 'desc' }
        });
      } catch (err) {
        console.warn('Prisma message query error:', err.message);
      }
    }
    return fallbackMessages;
  }
}

module.exports = new MessageRepository();
