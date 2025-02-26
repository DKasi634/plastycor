import { Handler } from "@netlify/functions";
import { transporter } from "./send-verification-email";
import { initializeAdminApp } from "./send-verification-email";


if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

initializeAdminApp();

export const handler: Handler = async (event, context) => {
  console.log("Received event:", event); // Log the incoming request
  if(event.httpMethod !== "POST"){
    return { 
      statusCode:405, body: JSON.stringify({error:"Method Not Allowed"})
     }
  }
  try {
    // Parse and validate input
    const { name, email, message } = JSON.parse(event.body || "{}");
    if (!name || !email || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing required fields" }),
      };
    }

    // Send email
    const mailOptions = {
      from: `"Formulaire de contact sur plastycor.org "`,
      to: process.env.SMTP_USER,
      subject: `Nouveau message provenant de votre formulair de contact`,
      text: `Nom: ${name}\nEmail: ${email}\nMessage: ${message}`,
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