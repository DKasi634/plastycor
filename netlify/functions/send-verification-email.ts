import { Handler } from "@netlify/functions";
import * as admin from "firebase-admin";
import nodemailer from "nodemailer";

if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
  }
  

// Initialize Firebase Admin SDK if not already initialized
export const initializeAdminApp = () =>{
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.VITE_FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          // Ensure proper formatting of your private key
          privateKey: (process.env.FIREBASE_PRIVATE_KEY || "").replace(/\\n/g, "\n"),
        }),
      });
    }
}

initializeAdminApp();

interface RequestBody {
  email: string;
  displayName: string;
}

// Configure Nodemailer transporter with Hostinger SMTP settings
export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.hostinger.com", // Default Hostinger SMTP 
  port: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT): 465, // commonly 587 or 465
  secure: true, // true for port 465, false for others
  auth: {
    user: process.env.SMTP_USER || "info@plastycor.org", // Using main email account
    pass: process.env.SMTP_PASS,
  },
  tls: {
        rejectUnauthorized: false, // Bypass SSL verification
    },
});



export const handler: Handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  try {
    const requestBody: RequestBody = JSON.parse(event.body || "{}");
    const { email, displayName } = requestBody;

    if (!email || !displayName) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing required fields: email and displayName" }),
      };
    }
    
    // Generate the verification link using Firebase Admin SDK
    const verificationLink = await admin.auth().generateEmailVerificationLink(email);

    // Create a custom email message
    const mailOptions = {
        from: `"${process.env.SMTP_NOREPLY_ACCOUNT}"`,
        to: email,
        subject: "Vérifiez votre adresse e-mail sur Plastycor",
        text: `Bonjour ${displayName},
      
              Veuillez vérifier votre adresse e-mail en cliquant sur le lien ci-dessous :
              ${verificationLink}
      
              Si vous n'avez pas créé de compte, veuillez ignorer cet e-mail.
      
              Merci,
              L'équipe Plastycor`,
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
            <h2 style="color: #007BFF;">Bonjour ${displayName},</h2>
            <p>
              Veuillez vérifier votre adresse e-mail en cliquant sur le bouton ci-dessous :
            </p>
            <p>
              <a href="${verificationLink}" 
                 style="display: inline-block; padding: 10px 20px; margin: 10px 0; 
                 background-color: #007BFF; color: #fff; text-decoration: none; 
                 border-radius: 5px;">
                Vérifiez votre adresse e-mail
              </a>
            </p>
            <p>
              Si vous n'avez pas créé de compte, veuillez ignorer cet e-mail.
            </p>
            <p>Merci,<br>L'équipe Plastycor</p>
          </div>
        `,
      };
      

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, info }),
    };
  } catch (error: any) {
    console.error("Error sending verification email:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
