const { pool, getIsConnected } = require('../config/db');

const seedSkills = [
  // Backend
  { name: "Node.js", category: "Backend", proficiency_percentage: 92, icon_name: "Server" },
  { name: "Express", category: "Backend", proficiency_percentage: 90, icon_name: "Cpu" },
  { name: "REST APIs", category: "Backend", proficiency_percentage: 95, icon_name: "Globe" },
  { name: "JWT", category: "Backend", proficiency_percentage: 90, icon_name: "KeyRound" },
  { name: "RBAC", category: "Backend", proficiency_percentage: 88, icon_name: "ShieldCheck" },
  { name: "Database Design", category: "Backend", proficiency_percentage: 92, icon_name: "Database" },
  { name: "Transactions", category: "Backend", proficiency_percentage: 85, icon_name: "GitCommit" },
  { name: "Logging", category: "Backend", proficiency_percentage: 88, icon_name: "Terminal" },

  // Frontend
  { name: "React", category: "Frontend", proficiency_percentage: 88, icon_name: "Code2" },
  { name: "JavaScript", category: "Frontend", proficiency_percentage: 90, icon_name: "FileCode" },
  { name: "HTML", category: "Frontend", proficiency_percentage: 95, icon_name: "Layout" },
  { name: "CSS", category: "Frontend", proficiency_percentage: 92, icon_name: "Palette" },
  { name: "Tailwind CSS", category: "Frontend", proficiency_percentage: 90, icon_name: "Layers" },

  // Languages
  { name: "Python", category: "Languages", proficiency_percentage: 90, icon_name: "FileCode2" },
  { name: "Java", category: "Languages", proficiency_percentage: 85, icon_name: "Coffee" },
  { name: "JavaScript", category: "Languages", proficiency_percentage: 90, icon_name: "FileCode" },
  { name: "SQL", category: "Languages", proficiency_percentage: 92, icon_name: "Database" },
  { name: "C", category: "Languages", proficiency_percentage: 80, icon_name: "Binary" },

  // Database
  { name: "MySQL", category: "Database", proficiency_percentage: 92, icon_name: "Database" },

  // Cloud & Tools
  { name: "Git", category: "Cloud & Tools", proficiency_percentage: 90, icon_name: "GitBranch" },
  { name: "GitHub", category: "Cloud & Tools", proficiency_percentage: 92, icon_name: "Github" },
  { name: "Docker", category: "Cloud & Tools", proficiency_percentage: 82, icon_name: "Box" },
  { name: "Azure", category: "Cloud & Tools", proficiency_percentage: 80, icon_name: "Cloud" },
  { name: "Postman", category: "Cloud & Tools", proficiency_percentage: 90, icon_name: "Send" },
  { name: "VS Code", category: "Cloud & Tools", proficiency_percentage: 95, icon_name: "Monitor" }
];

class SkillModel {
  static async getAll() {
    if (getIsConnected() && pool) {
      try {
        const [rows] = await pool.execute('SELECT * FROM skills ORDER BY category ASC, display_order ASC');
        if (rows.length > 0) return rows;
      } catch (err) {
        console.warn('MySQL skill fetch error, using fallback:', err.message);
      }
    }
    return seedSkills;
  }
}

module.exports = SkillModel;
