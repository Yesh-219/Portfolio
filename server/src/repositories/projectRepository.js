const { prisma, getIsPrismaConnected } = require('../config/prisma');

const fallbackProjects = [
  {
    id: 1,
    title: "Speech Emotion Recognition",
    slug: "speech-emotion-recognition",
    tagline: "Deep Learning & Real-Time Audio Emotion Classification API",
    description: "An advanced Deep Learning audio processing pipeline built with TensorFlow, CNN, and LSTM architectures to predict human emotional states from real-time speech signals, deployed via a Flask REST API.",
    architectureDetails: "Utilizes MFCC (Mel-Frequency Cepstral Coefficients) audio feature extraction fed into a hybrid 1D-CNN + Bidirectional LSTM neural network for temporal feature learning and dynamic classification.",
    technologies: ["Python", "TensorFlow", "CNN", "LSTM", "Flask", "REST API", "Audio Processing", "Deep Learning"],
    category: "DEEP_LEARNING",
    featured: true,
    imageUrl: "https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&w=1200&q=80",
    githubUrl: "https://github.com/",
    demoUrl: "https://demo.speech-emotion.dev",
    displayOrder: 1
  },
  {
    id: 2,
    title: "Recipe Sharing Platform",
    slug: "recipe-sharing-platform",
    tagline: "Full Stack CRUD Application with Authentication & Interactive Features",
    description: "A feature-complete full stack web platform enabling culinary enthusiasts to create, share, comment on, and manage recipes with secure authentication, admin controls, and relational database management.",
    architectureDetails: "Built with Flask, MySQL database schema with foreign key constraints, session/cookie authentication, image uploading, and interactive UI component interactions.",
    technologies: ["Flask", "MySQL", "HTML", "CSS", "JavaScript", "REST APIs", "CRUD", "Authentication"],
    category: "FULL_STACK",
    featured: true,
    imageUrl: "https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&w=1200&q=80",
    githubUrl: "https://github.com/",
    demoUrl: "https://demo.recipeshare.dev",
    displayOrder: 2
  }
];

class ProjectRepository {
  async findAll(category) {
    if (getIsPrismaConnected() && prisma) {
      try {
        const where = category && category !== 'All' ? { category: category.toUpperCase() } : {};
        return await prisma.project.findMany({
          where,
          orderBy: [{ displayOrder: 'asc' }, { createdAt: 'desc' }]
        });
      } catch (err) {
        console.warn('Prisma project query failed, using fallback:', err.message);
      }
    }
    if (category && category !== 'All') {
      return fallbackProjects.filter(p => p.category === category.toUpperCase() || p.category === category);
    }
    return fallbackProjects;
  }

  async findBySlug(slug) {
    if (getIsPrismaConnected() && prisma) {
      try {
        return await prisma.project.findUnique({ where: { slug } });
      } catch (err) {
        console.warn('Prisma project slug query failed:', err.message);
      }
    }
    return fallbackProjects.find(p => p.slug === slug) || null;
  }

  async create(data) {
    if (getIsPrismaConnected() && prisma) {
      return await prisma.project.create({ data });
    }
    const newProj = { id: fallbackProjects.length + 1, ...data };
    fallbackProjects.push(newProj);
    return newProj;
  }

  async update(id, data) {
    if (getIsPrismaConnected() && prisma) {
      return await prisma.project.update({ where: { id: parseInt(id) }, data });
    }
    const index = fallbackProjects.findIndex(p => p.id === parseInt(id));
    if (index !== -1) {
      fallbackProjects[index] = { ...fallbackProjects[index], ...data };
      return fallbackProjects[index];
    }
    return null;
  }

  async delete(id) {
    if (getIsPrismaConnected() && prisma) {
      return await prisma.project.delete({ where: { id: parseInt(id) } });
    }
    const index = fallbackProjects.findIndex(p => p.id === parseInt(id));
    if (index !== -1) {
      const deleted = fallbackProjects.splice(index, 1);
      return deleted[0];
    }
    return null;
  }
}

module.exports = new ProjectRepository();
