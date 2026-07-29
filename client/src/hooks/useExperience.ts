import { useState } from 'react';
import { Experience } from '../types';

const EXPERIENCE_DATA: Experience[] = [
  {
    id: 'ndmatrix',
    company: 'nDMatrix',
    role: 'Backend Engineering Intern',
    period: 'March 2026 – May 2026',
    type: 'Backend Engineering',
    location: 'Hyderabad',
    isCurrent: true,
    logoPlaceholder: 'nD',
    highlights: [
      'Designed a relational MySQL schema supporting multiple interconnected modules.',
      'Built secure REST APIs using Node.js and Express.',
      'Implemented JWT authentication.',
      'Implemented RBAC middleware.',
      'Worked with database transactions.',
      'Built reusable backend architecture.',
      'Improved debugging using structured logging.',
      'Worked in Agile teams.'
    ],
    responsibilities: [
      'Engineered and optimized core backend services handling user authentication and role-based access control.',
      'Collaborated closely with cross-functional Agile teams to deliver API endpoints for the frontend.',
      'Ensured high data integrity using MySQL transactions and structured error logging via Winston.'
    ],
    technologies: ['Node.js', 'Express', 'MySQL', 'JWT', 'REST API', 'Git', 'Docker'],
    challenges: 'Ensuring atomicity in database operations when dealing with complex, multi-table updates while maintaining high throughput.',
    solutions: 'Implemented robust database transactions and normalized the schema to reduce redundancy. Integrated comprehensive structured logging to catch edge cases early in development.',
    architectureHighlights: 'Microservice-ready Express architecture with modular routes, dedicated controllers, centralized error handling, and security middlewares (Helmet, CORS).',
    keyLearnings: 'Deepened my understanding of backend security, scalable database design, and the importance of observability in production environments.'
  },
  {
    id: 'vignan',
    company: 'Vignan University',
    role: 'Software Engineering Intern',
    period: 'August 2025 – July 2026',
    logoPlaceholder: 'VU',
    highlights: [
      'Built Leave Management System.',
      'Developed Payroll Workflow.',
      'Built Complaint Management System.',
      'Designed Attendance Heatmap.',
      'Developed REST APIs.',
      'Worked with backend workflow automation.',
      'Collaborated with faculty.'
    ],
    responsibilities: [
      'Developed an end-to-end university management suite encompassing leave management, payroll, and complaints.',
      'Automated backend workflows to streamline administrative tasks for faculty and staff.',
      'Visualized complex data through an interactive Attendance Heatmap.'
    ],
    technologies: ['Node.js', 'Express', 'MySQL', 'JavaScript', 'Git'],
    challenges: 'Designing a flexible data model that could handle varied workflows like leave approvals and payroll calculations seamlessly.',
    solutions: 'Utilized advanced SQL queries and robust backend state machines in Node.js to manage workflow transitions securely.',
    keyLearnings: 'Gained significant experience in building enterprise-level administrative systems and translating real-world business requirements into technical solutions.'
  },
  {
    id: 'fusil',
    company: 'Fusil Solutions',
    role: 'Full Stack Development Intern',
    period: 'June 2024 – July 2024',
    logoPlaceholder: 'FS',
    highlights: [
      'Recipe Sharing Platform.',
      'Authentication.',
      'REST APIs.',
      'CRUD.',
      'Admin Dashboard.',
      'Responsive UI.'
    ],
    responsibilities: [
      'Developed a responsive Full Stack Recipe Sharing Platform from scratch.',
      'Built the entire administrative dashboard for content moderation.',
      'Handled user authentication flows and CRUD operations.'
    ],
    technologies: ['Flask', 'MySQL', 'HTML', 'CSS', 'JavaScript'],
    keyLearnings: 'Learned the fundamentals of full-stack integration, bridging Python (Flask) backends with vanilla web frontends.'
  }
];

export function useExperience() {
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);

  return {
    experiences: EXPERIENCE_DATA,
    selectedExperience,
    setSelectedExperience,
  };
}
