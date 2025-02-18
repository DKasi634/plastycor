import { Handler } from '@netlify/functions';
import admin from 'firebase-admin';
import * as dotenv from 'dotenv';
import {NetlifyFunctionResponse} from "../../src/api/types"

dotenv.config();
// Initialize Firebase Admin only once
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.VITE_FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY,
    }),
  });
}

export const handler: Handler = async (event):Promise<NetlifyFunctionResponse> => {
  try {
    // Parse the request body
    const { email } = JSON.parse(event.body || '{}');

    if (!email) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid request. Email is required.' }),
      };
    }

    // Get the user by email
    const user = await admin.auth().getUserByEmail(email);

    // Disable the user (set disabled to true)
    await admin.auth().updateUser(user.uid, { disabled: true });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: `User ${email} has been disabled.` }),
    };
  } catch (error) {
    console.error('Error disabling user:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to disable user.' }),
    };
  }
};
