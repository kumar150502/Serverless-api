const nodemailer = require('nodemailer');
const AWS = require('aws-sdk'); // For local development environment variable access

exports.handler = async (event) => {
  const body = JSON.parse(event.body); // Parse request body
  const { receiver_email, subject, body_text } = body;

  if (!receiver_email || !subject || !body_text) {
    return {
      statusCode: 400, // Bad Request
      body: JSON.stringify({ message: 'Missing required fields' }),
    };
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST, // Access environment variables locally or via AWS Secrets Manager
      port: process.env.EMAIL_PORT,
      secure: false, // Adjust based on your email provider settings
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.
