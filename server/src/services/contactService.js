const messageRepository = require('../repositories/messageRepository');
const { sendContactNotification } = require('./emailService');
const logger = require('../config/logger');

class ContactService {
  async processContactSubmission(formData, clientInfo) {
    const messageData = {
      ...formData,
      ipAddress: clientInfo.ipAddress,
      userAgent: clientInfo.userAgent
    };

    const savedMessage = await messageRepository.create(messageData);
    logger.info(`New contact inquiry saved from ${formData.name} (${formData.email})`);

    // Asynchronously send email notification
    sendContactNotification(formData).catch(err => {
      logger.error('Failed to send email notification:', err.message);
    });

    return savedMessage;
  }

  async getAllMessages() {
    return await messageRepository.findAll();
  }
}

module.exports = new ContactService();
