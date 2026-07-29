const { PrismaClient } = require('@prisma/client');

let prisma = null;
let isPrismaConnected = false;

try {
  prisma = new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
  });

  // Self-test database connection asynchronously
  prisma.$connect()
    .then(() => {
      isPrismaConnected = true;
      console.log('✅ Prisma ORM successfully connected to MySQL Database.');
    })
    .catch((err) => {
      console.warn('⚠️ Prisma ORM MySQL Connection Warning:', err.message);
      console.warn('ℹ️ Enterprise API fallback data layer active for offline operation.');
    });
} catch (error) {
  console.warn('⚠️ Could not initialize PrismaClient:', error.message);
}

module.exports = {
  prisma,
  getIsPrismaConnected: () => isPrismaConnected,
};
