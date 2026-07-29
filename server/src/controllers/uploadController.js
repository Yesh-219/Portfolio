const { uploadToCloudinary } = require('../services/uploadService');
const ApiResponse = require('../utils/apiResponse');
const ApiError = require('../utils/apiError');

const uploadFile = async (req, res, next) => {
  try {
    if (!req.file) {
      throw new ApiError(400, 'No file uploaded');
    }
    const folder = req.body.folder || 'portfolio';
    const result = await uploadToCloudinary(req.file.buffer, folder);
    return res.status(201).json(new ApiResponse(201, result, 'File uploaded to Cloudinary successfully'));
  } catch (error) {
    next(error);
  }
};

module.exports = {
  uploadFile
};
