const { z } = require('zod');

const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address format'),
  subject: z.string().max(200, 'Subject max length is 200 characters').optional().or(z.literal('')),
  message: z.string().min(5, 'Message must be at least 5 characters')
});

module.exports = {
  contactFormSchema
};
