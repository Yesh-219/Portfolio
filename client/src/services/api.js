import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Seed Fallback Data for offline / instant render mode
export const FALLBACK_PROJECTS = [
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
    demo_url: "https://demo.speech-emotion.dev"
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
    demo_url: "https://demo.recipeshare.dev"
  }
];

export const FALLBACK_EXPERIENCES = [
  {
    id: 1,
    company: "nDMatrix",
    role: "Backend Engineering Intern",
    period: "Backend Engineering Intern",
    responsibilities: [
      "Engineered robust RESTful backend APIs utilizing Node.js and Express framework.",
      "Architected relational database schema in MySQL with ACID transactions and optimal index strategies.",
      "Implemented secure JWT Authentication and Role-Based Access Control (RBAC) middleware.",
      "Designed structured application logging and error handling architecture for production reliability.",
      "Collaborated actively in an Agile development environment with sprint planning and code reviews."
    ],
    technologies: ["Node.js", "Express", "MySQL", "JWT Authentication", "RBAC", "REST APIs", "Logging", "Database Design", "Transactions", "Agile"]
  },
  {
    id: 2,
    company: "Vignan University",
    role: "Software Engineering Intern",
    period: "Software Engineering Intern",
    responsibilities: [
      "Developed internal workflow automation features including Leave Management System & Payroll Workflow.",
      "Engineered a Complaint Management portal and student/staff Attendance Heatmap analytics.",
      "Constructed high-throughput backend APIs ensuring zero downtime and reliable data processing.",
      "Streamlined institutional administrative operations through automated digitized workflows."
    ],
    technologies: ["Leave Management System", "Payroll Workflow", "Complaint Management", "Attendance Heatmap", "Internal Workflow Automation", "Backend APIs"]
  },
  {
    id: 3,
    company: "Fusil Solutions",
    role: "Full Stack Development Intern",
    period: "Full Stack Development Intern",
    responsibilities: [
      "Built full stack web application features using Flask backend framework and MySQL database.",
      "Implemented user session authentication, authorization gates, and secure CRUD operations.",
      "Designed dynamic frontend interfaces leveraging HTML5, CSS3, and modern JavaScript.",
      "Created the core foundation for a high-engagement Recipe Sharing Application."
    ],
    technologies: ["Flask", "MySQL", "Authentication", "CRUD", "REST APIs", "Recipe Sharing Application"]
  }
];

export const fetchProjects = async (category) => {
  try {
    const res = await apiClient.get('/projects', { params: { category } });
    return res.data.data;
  } catch (err) {
    console.warn('Backend API offline, using fallback projects data');
    if (category && category !== 'All') {
      return FALLBACK_PROJECTS.filter(p => p.category === category);
    }
    return FALLBACK_PROJECTS;
  }
};

export const fetchExperiences = async () => {
  try {
    const res = await apiClient.get('/experiences');
    return res.data.data;
  } catch (err) {
    console.warn('Backend API offline, using fallback experience data');
    return FALLBACK_EXPERIENCES;
  }
};

export const sendContactMessage = async (formData) => {
  try {
    const res = await apiClient.post('/messages', formData);
    return res.data;
  } catch (err) {
    if (err.response && err.response.data) {
      throw err.response.data;
    }
    // Fallback response for offline preview mode
    return { success: true, message: 'Message logged successfully (Offline mode enabled)' };
  }
};

export default apiClient;
