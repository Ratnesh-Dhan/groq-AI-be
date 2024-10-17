const nodemailer = require('nodemailer');
require('dotenv').config();

// Create a transporter using SMTP
let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',  // Replace with your SMTP host
  port: 587,  // Replace with your SMTP port
  secure: false,  // true for 465, false for other ports
  auth: {
    user: process.env.MAIL,  // Replace with your email
    pass: process.env.PASSWORD  // Replace with your password or app-specific password
  }
});

// Define the email options
// let mailOptions = {
//   from: '"this is test" <your-email@gmail.com>',  // sender address
//   to: 'recipient@example.com',  // list of receivers
//   subject: 'Test Email from Node.js',  // Subject line
//   text: 'Hello world! This is a test email sent from Node.js using nodemailer.'  // plain text body
// };

// Send the email
function sendEmail(to, subject, text) {
    return new Promise((resolve, reject) => {
      const mailOptions = { from: `"Generated with Groq AI" <${process.env.MAIL}>`, to, subject, text };
      
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log('Error:', error);
          reject(error);
        } else {
          console.log('Message sent: %s', info.messageId);
          resolve(info);
        }
      });
    });
  }
  module.exports = { sendEmail };