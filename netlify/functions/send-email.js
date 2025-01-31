const nodemailer = require("nodemailer");

exports.handler = async (event) => {
  console.log("Received event:", event); // Log the incoming request

  try {
    // Parse and validate input
    const { name, email, message } = JSON.parse(event.body);
    if (!name || !email || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing required fields" }),
      };
    }

    console.log("Using SMTP User:", process.env.SMTP_USER); // Log SMTP user

    // Configure transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false, // Bypass SSL verification
      },
    });

    // Test SMTP connection
    await transporter.verify((error) => {
      if (error) {
        console.error("SMTP Connection Error:", error);
        throw error;
      } else {
        console.log("SMTP Server Ready");
      }
    });

    // Send email
    const mailOptions = {
      from: `"Plastycor Website Contact Form"`,
      to: process.env.SMTP_USER,
      subject: `New Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    console.error("Full error:", error); // Log the entire error
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};