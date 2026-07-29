const bcrypt = require('bcryptjs');
const { prisma, getIsPrismaConnected } = require('../config/prisma');

const DEFAULT_ADMIN_HASH = bcrypt.hashSync('Admin@12345', 10);

class UserRepository {
  async findByEmail(email) {
    if (getIsPrismaConnected() && prisma) {
      try {
        return await prisma.user.findUnique({ where: { email } });
      } catch (err) {
        console.warn('Prisma user lookup error:', err.message);
      }
    }
    if (email === 'admin@yeswanth.dev' || email === 'yeswanthkaluva@gmail.com') {
      return {
        id: 1,
        name: "Yeswanth Kumar Kaluva",
        email,
        passwordHash: DEFAULT_ADMIN_HASH,
        role: "ADMIN"
      };
    }
    return null;
  }

  async saveRefreshToken(userId, token, expiresAt) {
    if (getIsPrismaConnected() && prisma) {
      try {
        return await prisma.refreshToken.create({
          data: {
            userId,
            token,
            expiresAt
          }
        });
      } catch (err) {
        console.warn('Prisma save refresh token error:', err.message);
      }
    }
    return { userId, token, expiresAt };
  }

  async findRefreshToken(token) {
    if (getIsPrismaConnected() && prisma) {
      try {
        return await prisma.refreshToken.findUnique({
          where: { token },
          include: { user: true }
        });
      } catch (err) {
        console.warn('Prisma find refresh token error:', err.message);
      }
    }
    return null;
  }

  async revokeRefreshToken(token) {
    if (getIsPrismaConnected() && prisma) {
      try {
        return await prisma.refreshToken.update({
          where: { token },
          data: { revoked: true }
        });
      } catch (err) {
        console.warn('Prisma revoke token error:', err.message);
      }
    }
    return true;
  }
}

module.exports = new UserRepository();
