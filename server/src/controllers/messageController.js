const MessageModel = require('../models/MessageModel');
const ApiResponse = require('../utils/apiResponse');
const ApiError = require('../utils/apiError');
const { sendContactNotification } = require('../services/emailService');

const submitMessage = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      throw new ApiError(400, 'Name, email, and message are required fields');
    }

    const ip_address = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const user_agent = req.headers['user-agent'];

    const savedMessage = await MessageModel.create({
      name,
      email,
      subject,
      message,
      ip_address,
      user_agent
    });

    // Asynchronously dispatch email notification
    sendContactNotification({ name, email, subject, message }).catch(err => console.error(err));

    return res.status(201).json(new ApiResponse(201, savedMessage, 'Thank you! Your message has been sent successfully.'));
  } catch (error) {
    next(error);
  }
};

const getMessages = async (req, res, next) => {
  try {
    const messages = await MessageModel.getAll();
    return res.status(200).json(new ApiResponse(200, messages, 'Messages retrieved for admin'));
  } catch (error) {
    next(error);
  }
};

module.exports = {
  submitMessage,
  getMessages
};
