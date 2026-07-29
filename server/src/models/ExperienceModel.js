const { pool, getIsConnected } = require('../config/db');

const seedExperiences = [
  {
    id: 1,
    company: "nDMatrix",
    role: "Backend Engineering Intern",
    location: "Remote",
    period: "Backend Engineering Intern",
    start_date: "2024-01-01",
    end_date: "2024-06-01",
    is_current: false,
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
    period: "Software Engineering Intern",
    start_date: "2023-06-01",
    end_date: "2023-12-01",
    is_current: false,
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
    period: "Full Stack Development Intern",
    start_date: "2023-01-01",
    end_date: "2023-05-01",
    is_current: false,
    responsibilities: [
      "Built full stack web application features using Flask backend framework and MySQL database.",
      "Implemented user session authentication, authorization gates, and secure CRUD operations.",
      "Designed dynamic frontend interfaces leveraging HTML5, CSS3, and modern JavaScript.",
      "Created the core foundation for a high-engagement Recipe Sharing Application."
    ],
    technologies: ["Flask", "MySQL", "Authentication", "CRUD", "REST APIs", "Recipe Sharing Application"]
  }
];

class ExperienceModel {
  static async getAll() {
    if (getIsConnected() && pool) {
      try {
        const [rows] = await pool.execute('SELECT * FROM experiences ORDER BY display_order ASC, start_date DESC');
        if (rows.length > 0) {
          return rows.map(r => ({
            ...r,
            responsibilities: typeof r.responsibilities === 'string' ? JSON.parse(r.responsibilities) : r.responsibilities,
            technologies: typeof r.technologies === 'string' ? JSON.parse(r.technologies) : r.technologies
          }));
        }
      } catch (err) {
        console.warn('MySQL experience fetch error, using memory fallback:', err.message);
      }
    }
    return seedExperiences;
  }
}

module.exports = ExperienceModel;
