const nodemailer = require('nodemailer');
const config = require('config');

// Create a transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use your email service provider (e.g., 'gmail', 'smtp.mailtrap.io', etc.)
  auth: {
    user: config.get('emailUser'), // Email address from which emails will be sent
    pass: config.get('emailPassword'), // Email account password or an app-specific password
  },
});

// Send an email notification
const sendEmail = (to, subject, text, html) => {
  const mailOptions = {
    from: config.get('emailUser'), // Sender's email
    to, // Recipient's email
    subject, // Email subject
    text, // Plain text body
    html, // HTML body (optional)
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
      return;
    }
    console.log('Email sent: ' + info.response);
  });
};

// Example of sending a simple welcome email
const sendWelcomeEmail = (userEmail, userName) => {
  const subject = 'Welcome to Our E-Commerce Platform!';
  const text = `Hi ${userName},\n\nWelcome to our e-commerce platform! We are excited to have you on board. Feel free to explore our products and services.\n\nBest Regards,\nE-Commerce Team`;
  const html = `<p>Hi ${userName},</p><p>Welcome to our e-commerce platform! We are excited to have you on board. Feel free to explore our products and services.</p><p>Best Regards,<br/>E-Commerce Team</p>`;

  sendEmail(userEmail, subject, text, html);
};

// Example of sending an order confirmation email
const sendOrderConfirmationEmail = (userEmail, orderId) => {
  const subject = `Order Confirmation #${orderId}`;
  const text = `Thank you for your order! Your order ID is ${orderId}. We are processing your order and will notify you once it's shipped.`;
  const html = `<p>Thank you for your order! Your order ID is <strong>${orderId}</strong>. We are processing your order and will notify you once it's shipped.</p>`;

  sendEmail(userEmail, subject, text, html);
};

// Example of sending a password reset email
const sendPasswordResetEmail = (userEmail, resetToken) => {
  const resetLink = `${config.get('baseUrl')}/reset-password?token=${resetToken}`;
  const subject = 'Password Reset Request';
  const text = `We received a request to reset your password. Click the following link to reset your password: ${resetLink}`;
  const html = `<p>We received a request to reset your password. Click the following link to reset your password:</p><p><a href="${resetLink}">Reset Password</a></p>`;

  sendEmail(userEmail, subject, text, html);
};

module.exports = {
  sendEmail,
  sendWelcomeEmail,
  sendOrderConfirmationEmail,
  sendPasswordResetEmail,
};
