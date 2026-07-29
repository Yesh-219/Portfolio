const nodemailer = require('nodemailer');

const sendContactNotification = async ({ name, email, subject, message }) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    const mailOptions = {
      from: `"Portfolio Contact Form" <${process.env.SMTP_USER || 'no-reply@yeswanth.dev'}>`,
      to: process.env.NOTIFICATION_EMAIL || 'yeswanthkaluva@gmail.com',
      subject: `[Portfolio Inquiry] ${subject || 'New Contact Submission'} from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #0b0f19; color: #f8fafc; padding: 24px; border-radius: 12px;">
          <h2 style="color: #3b82f6; margin-bottom: 16px;">New Message Received</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #14b8a6;">${email}</a></p>
          <p><strong>Subject:</strong> ${subject || 'N/A'}</p>
          <hr style="border-color: rgba(255,255,255,0.1); margin: 20px 0;" />
          <p><strong>Message:</strong></p>
          <p style="background: rgba(255,255,255,0.05); padding: 16px; border-radius: 8px; white-space: pre-wrap;">${message}</p>
        </div>
      `
    };

    if (process.env.SMTP_USER && process.env.SMTP_PASS && process.env.SMTP_USER !== 'test@gmail.com') {
      await transporter.sendMail(mailOptions);
      console.log(`📧 Notification email sent to ${mailOptions.to}`);
    } else {
      console.log(`ℹ️  SMTP credentials not fully configured. Logged message internally for ${name} (${email}).`);
    }
    return true;
  } catch (error) {
    console.error('❌ Failed to dispatch email notification:', error.message);
    return false;
  }
};

module.exports = {
  sendContactNotification
};
