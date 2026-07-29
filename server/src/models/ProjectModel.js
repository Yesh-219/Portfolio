const { pool, getIsConnected } = require('../config/db');

const seedProjects = [
  {
    id: 1,
    title: "Speech Emotion Recognition",
    slug: "speech-emotion-recognition",
    tagline: "Deep Learning & Real-Time Audio Emotion Classification API",
    description: "An advanced Deep Learning audio processing pipeline built with TensorFlow, CNN, and LSTM architectures to predict human emotional states from real-time speech signals, deployed via a Flask REST API.",
    architecture_details: "Utilizes MFCC (Mel-Frequency Cepstral Coefficients) audio feature extraction fed into a hybrid 1D-CNN + Bidirectional LSTM neural network for temporal feature learning and dynamic classification.",
    technologies: ["Python", "TensorFlow", "CNN", "LSTM", "Flask", "REST API", "Audio Processing", "Deep Learning"],
    category: "Deep Learning",
    featured: true,
    image_url: "https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&w=1200&q=80",
    github_url: "https://github.com/",
    demo_url: "https://demo.speech-emotion.dev",
    display_order: 1
  },
  {
    id: 2,
    title: "Recipe Sharing Platform",
    slug: "recipe-sharing-platform",
    tagline: "Full Stack CRUD Application with Authentication & Interactive Features",
    description: "A feature-complete full stack web platform enabling culinary enthusiasts to create, share, comment on, and manage recipes with secure authentication, admin controls, and relational database management.",
    architecture_details: "Built with Flask, MySQL database schema with foreign key constraints, session/cookie authentication, image uploading, and interactive UI component interactions.",
    technologies: ["Flask", "MySQL", "HTML", "CSS", "JavaScript", "REST APIs", "CRUD", "Authentication"],
    category: "Full Stack",
    featured: true,
    image_url: "https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&w=1200&q=80",
    github_url: "https://github.com/",
    demo_url: "https://demo.recipeshare.dev",
    display_order: 2
  }
];

class ProjectModel {
  static async getAll(category) {
    if (getIsConnected() && pool) {
      try {
        let query = 'SELECT * FROM projects';
        const params = [];
        if (category && category !== 'All') {
          query += ' WHERE category = ?';
          params.push(category);
        }
        query += ' ORDER BY display_order ASC, created_at DESC';
        const [rows] = await pool.execute(query, params);
        return rows.map(r => ({
          ...r,
          technologies: typeof r.technologies === 'string' ? JSON.parse(r.technologies) : r.technologies
        }));
      } catch (err) {
        console.warn('MySQL project fetch error, using memory fallback:', err.message);
      }
    }
    if (category && category !== 'All') {
      return seedProjects.filter(p => p.category === category);
    }
    return seedProjects;
  }

  static async getBySlug(slug) {
    if (getIsConnected() && pool) {
      try {
        const [rows] = await pool.execute('SELECT * FROM projects WHERE slug = ? LIMIT 1', [slug]);
        if (rows.length > 0) {
          const r = rows[0];
          return {
            ...r,
            technologies: typeof r.technologies === 'string' ? JSON.parse(r.technologies) : r.technologies
          };
        }
      } catch (err) {
        console.warn('MySQL slug fetch error:', err.message);
      }
    }
    return seedProjects.find(p => p.slug === slug) || null;
  }

  static async create(projectData) {
    if (getIsConnected() && pool) {
      const { title, slug, tagline, description, architecture_details, technologies, category, featured, image_url, github_url, demo_url } = projectData;
      const [result] = await pool.execute(
        `INSERT INTO projects (title, slug, tagline, description, architecture_details, technologies, category, featured, image_url, github_url, demo_url)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [title, slug, tagline, description, architecture_details, JSON.stringify(technologies), category, featured ? 1 : 0, image_url, github_url, demo_url]
      );
      return { id: result.insertId, ...projectData };
    }
    const newProj = { id: seedProjects.length + 1, ...projectData };
    seedProjects.push(newProj);
    return newProj;
  }
}

module.exports = ProjectModel;
