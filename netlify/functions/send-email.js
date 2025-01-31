

const nodemailer = require("nodemailer");

exports.handler = async (event) => {
  const { name, email, message } = JSON.parse(event.body);

  // Validate input
  if (!name || !email || !message) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "All fields are required" }),
    };
  }

  // Configure SMTP
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // Send email
  try {
    await transporter.sendMail({
      from: `"Website Form" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      subject: `New Message from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to send email" }),
    };
  }
};