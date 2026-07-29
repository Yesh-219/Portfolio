const ExperienceModel = require('../models/ExperienceModel');
const ApiResponse = require('../utils/apiResponse');

const getExperiences = async (req, res, next) => {
  try {
    const experiences = await ExperienceModel.getAll();
    return res.status(200).json(new ApiResponse(200, experiences, 'Experiences retrieved successfully'));
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getExperiences
};
