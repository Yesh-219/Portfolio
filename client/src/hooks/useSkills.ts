export const ENGINEERING_METRICS = {
  dsa: '500+',
  internships: '3+',
  projects: '2+',
  keyTags: ['REST APIs', 'JWT', 'RBAC', 'Backend Engineering'],
};

export const PROGRAMMING_LANGUAGES = [
  { name: 'Python', proficiency: 90, primaryUse: 'AI / Backend' },
  { name: 'Java', proficiency: 85, primaryUse: 'DSA / Enterprise' },
  { name: 'JavaScript', proficiency: 95, primaryUse: 'Full Stack' },
  { name: 'SQL', proficiency: 88, primaryUse: 'Databases' },
  { name: 'C', proficiency: 75, primaryUse: 'Core Fundamentals' },
];

export const EXPERTISE_DOMAINS = [
  {
    category: 'Backend',
    skills: ['Node.js', 'Express', 'REST APIs', 'JWT', 'RBAC', 'Authentication', 'Authorization', 'Logging', 'Transactions']
  },
  {
    category: 'Frontend',
    skills: ['React', 'HTML', 'CSS', 'JavaScript', 'Tailwind', 'Responsive Design', 'Animations']
  },
  {
    category: 'Databases',
    skills: ['MySQL', 'Schema Design', 'Indexes', 'Transactions', 'Query Optimization']
  },
  {
    category: 'AI & Machine Learning',
    skills: ['Python', 'TensorFlow', 'CNN', 'LSTM', 'Speech Emotion Recognition']
  },
  {
    category: 'Tools & Cloud',
    skills: ['Git', 'GitHub', 'Docker', 'Azure', 'VS Code', 'Postman']
  }
];

export const CERTIFICATIONS = [
  {
    title: 'Business Intelligence & Analytics',
    issuer: 'NPTEL',
    year: '2025',
    url: '/certs/Business Intelligence & Analytics.pdf'
  },
  {
    title: 'Data Analytics with Python',
    issuer: 'NPTEL',
    year: '2024',
    url: '/certs/Data Analytics with Python.pdf'
  },
  {
    title: 'Learning Analytics Tools',
    issuer: 'NPTEL',
    year: '2024',
    url: '/certs/Learning Analytics Tools.pdf'
  },
  {
    title: 'Pattern Recognition and Application',
    issuer: 'NPTEL',
    year: '2024',
    url: '/certs/Pattern Recognition and Application.pdf'
  },
  {
    title: 'Python for Data Science',
    issuer: 'NPTEL',
    year: '2023',
    url: '/certs/Python For Data Science.pdf'
  },
  {
    title: 'Responsible & Safe AI Systems',
    issuer: 'NPTEL',
    year: '2025',
    url: '/certs/Responsible & Safe AI Systems.pdf'
  },
  {
    title: 'NPTEL Star Badge',
    issuer: 'NPTEL',
    year: '2024',
    url: '/certs/Nptel-Star.png'
  },
  {
    title: 'Google Specialization',
    issuer: 'Coursera',
    year: '2024',
    url: '/certs/Google courseera.jpg'
  },
  {
    title: 'Apache Spark',
    issuer: 'Udemy',
    year: '2023',
    url: '/certs/udemy Apache spark.jpg'
  },
  {
    title: 'Artificial Intelligence and Machine Learning',
    issuer: 'Certification',
    year: '2026',
    url: '/certs/Artificial Intelligence and Machine Learning.pdf'
  }
];

export const TECH_WALL_ITEMS = [
  'React', 'Node', 'Express', 'MySQL', 'Python', 'Java', 
  'Docker', 'Azure', 'GitHub', 'TensorFlow', 'Flask', 
  'REST API', 'JWT', 'RBAC', 'HTML', 'Tailwind'
];

export function useSkills() {
  return {
    metrics: ENGINEERING_METRICS,
    languages: PROGRAMMING_LANGUAGES,
    domains: EXPERTISE_DOMAINS,
    certifications: CERTIFICATIONS,
    techWall: TECH_WALL_ITEMS
  };
}
