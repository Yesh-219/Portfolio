const contactService = require('../services/contactService');
const ApiResponse = require('../utils/apiResponse');

const submitContact = async (req, res, next) => {
  try {
    const clientInfo = {
      ipAddress: req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress,
      userAgent: req.headers['user-agent']
    };

    const savedMessage = await contactService.processContactSubmission(req.body, clientInfo);
    return res.status(201).json(new ApiResponse(201, savedMessage, 'Thank you! Your message has been sent successfully.'));
  } catch (error) {
    next(error);
  }
};

const getMessages = async (req, res, next) => {
  try {
    const messages = await contactService.getAllMessages();
    return res.status(200).json(new ApiResponse(200, messages, 'Contact messages retrieved'));
  } catch (error) {
    next(error);
  }
};

module.exports = {
  submitContact,
  getMessages
};
