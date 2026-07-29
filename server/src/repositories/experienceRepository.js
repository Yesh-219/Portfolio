const { prisma, getIsPrismaConnected } = require('../config/prisma');

const fallbackExperiences = [
  {
    id: 1,
    company: "nDMatrix",
    role: "Backend Engineering Intern",
    location: "Remote",
    startDate: "2024-01-01T00:00:00.000Z",
    endDate: "2024-06-01T00:00:00.000Z",
    isCurrent: false,
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
    location: "Vadlamudi, AP",
    startDate: "2023-06-01T00:00:00.000Z",
    endDate: "2023-12-01T00:00:00.000Z",
    isCurrent: false,
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
    location: "On-site",
    startDate: "2023-01-01T00:00:00.000Z",
    endDate: "2023-05-01T00:00:00.000Z",
    isCurrent: false,
    responsibilities: [
      "Built full stack web application features using Flask backend framework and MySQL database.",
      "Implemented user session authentication, authorization gates, and secure CRUD operations.",
      "Designed dynamic frontend interfaces leveraging HTML5, CSS3, and modern JavaScript.",
      "Created the core foundation for a high-engagement Recipe Sharing Application."
    ],
    technologies: ["Flask", "MySQL", "Authentication", "CRUD", "REST APIs", "Recipe Sharing Application"]
  }
];

class ExperienceRepository {
  async findAll() {
    if (getIsPrismaConnected() && prisma) {
      try {
        return await prisma.experience.findMany({
          orderBy: [{ displayOrder: 'asc' }, { startDate: 'desc' }]
        });
      } catch (err) {
        console.warn('Prisma experience query failed, using fallback:', err.message);
      }
    }
    return fallbackExperiences;
  }

  async create(data) {
    if (getIsPrismaConnected() && prisma) {
      return await prisma.experience.create({ data });
    }
    const newExp = { id: fallbackExperiences.length + 1, ...data };
    fallbackExperiences.push(newExp);
    return newExp;
  }

  async delete(id) {
    if (getIsPrismaConnected() && prisma) {
      return await prisma.experience.delete({ where: { id: parseInt(id) } });
    }
    const index = fallbackExperiences.findIndex(e => e.id === parseInt(id));
    if (index !== -1) {
      return fallbackExperiences.splice(index, 1)[0];
    }
    return null;
  }
}

module.exports = new ExperienceRepository();
