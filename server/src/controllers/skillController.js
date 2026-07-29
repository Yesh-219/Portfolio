const SkillModel = require('../models/SkillModel');
const ApiResponse = require('../utils/apiResponse');

const getSkills = async (req, res, next) => {
  try {
    const rawSkills = await SkillModel.getAll();
    // Group skills by category
    const grouped = rawSkills.reduce((acc, skill) => {
      const cat = skill.category || 'Other';
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(skill);
      return acc;
    }, {});

    return res.status(200).json(new ApiResponse(200, { skills: rawSkills, grouped }, 'Skills retrieved successfully'));
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSkills
};
