const { prisma, getIsPrismaConnected } = require('../config/prisma');

const fallbackSkills = [
  // Backend
  { id: 1, name: "Node.js", category: "BACKEND", proficiencyPercentage: 92, iconName: "Server", featured: true },
  { id: 2, name: "Express", category: "BACKEND", proficiencyPercentage: 90, iconName: "Cpu", featured: true },
  { id: 3, name: "REST APIs", category: "BACKEND", proficiencyPercentage: 95, iconName: "Globe", featured: true },
  { id: 4, name: "JWT", category: "BACKEND", proficiencyPercentage: 90, iconName: "KeyRound", featured: true },
  { id: 5, name: "RBAC", category: "BACKEND", proficiencyPercentage: 88, iconName: "ShieldCheck", featured: true },
  { id: 6, name: "Database Design", category: "BACKEND", proficiencyPercentage: 92, iconName: "Database", featured: true },
  { id: 7, name: "Transactions", category: "BACKEND", proficiencyPercentage: 85, iconName: "GitCommit", featured: true },
  { id: 8, name: "Logging", category: "BACKEND", proficiencyPercentage: 88, iconName: "Terminal", featured: true },

  // Frontend
  { id: 9, name: "React", category: "FRONTEND", proficiencyPercentage: 88, iconName: "Code2", featured: true },
  { id: 10, name: "JavaScript", category: "FRONTEND", proficiencyPercentage: 90, iconName: "FileCode", featured: true },
  { id: 11, name: "HTML", category: "FRONTEND", proficiencyPercentage: 95, iconName: "Layout", featured: true },
  { id: 12, name: "CSS", category: "FRONTEND", proficiencyPercentage: 92, iconName: "Palette", featured: true },
  { id: 13, name: "Tailwind CSS", category: "FRONTEND", proficiencyPercentage: 90, iconName: "Layers", featured: true },

  // Languages
  { id: 14, name: "Python", category: "LANGUAGES", proficiencyPercentage: 90, iconName: "FileCode2", featured: true },
  { id: 15, name: "Java", category: "LANGUAGES", proficiencyPercentage: 85, iconName: "Coffee", featured: true },
  { id: 16, name: "JavaScript", category: "LANGUAGES", proficiencyPercentage: 90, iconName: "FileCode", featured: true },
  { id: 17, name: "SQL", category: "LANGUAGES", proficiencyPercentage: 92, iconName: "Database", featured: true },
  { id: 18, name: "C", category: "LANGUAGES", proficiencyPercentage: 80, iconName: "Binary", featured: true },

  // Database
  { id: 19, name: "MySQL", category: "DATABASE", proficiencyPercentage: 92, iconName: "Database", featured: true },

  // Cloud & Tools
  { id: 20, name: "Git", category: "CLOUD_TOOLS", proficiencyPercentage: 90, iconName: "GitBranch", featured: true },
  { id: 21, name: "GitHub", category: "CLOUD_TOOLS", proficiencyPercentage: 92, iconName: "Github", featured: true },
  { id: 22, name: "Docker", category: "CLOUD_TOOLS", proficiencyPercentage: 82, iconName: "Box", featured: true },
  { id: 23, name: "Azure", category: "CLOUD_TOOLS", proficiencyPercentage: 80, iconName: "Cloud", featured: true },
  { id: 24, name: "Postman", category: "CLOUD_TOOLS", proficiencyPercentage: 90, iconName: "Send", featured: true },
  { id: 25, name: "VS Code", category: "CLOUD_TOOLS", proficiencyPercentage: 95, iconName: "Monitor", featured: true }
];

class SkillRepository {
  async findAll() {
    if (getIsPrismaConnected() && prisma) {
      try {
        return await prisma.skill.findMany({
          orderBy: [{ category: 'asc' }, { displayOrder: 'asc' }]
        });
      } catch (err) {
        console.warn('Prisma skill query failed, using fallback:', err.message);
      }
    }
    return fallbackSkills;
  }

  async create(data) {
    if (getIsPrismaConnected() && prisma) {
      return await prisma.skill.create({ data });
    }
    const newSkill = { id: fallbackSkills.length + 1, ...data };
    fallbackSkills.push(newSkill);
    return newSkill;
  }

  async delete(id) {
    if (getIsPrismaConnected() && prisma) {
      return await prisma.skill.delete({ where: { id: parseInt(id) } });
    }
    const index = fallbackSkills.findIndex(s => s.id === parseInt(id));
    if (index !== -1) {
      return fallbackSkills.splice(index, 1)[0];
    }
    return null;
  }
}

module.exports = new SkillRepository();
