import { Handler } from '@netlify/functions';
import admin from 'firebase-admin';
import * as dotenv from 'dotenv';
import { NetlifyFunctionResponse } from "../../src/api/types"
import { initializeAdminApp } from './send-verification-email';

dotenv.config();

// Initialize Firebase Admin only once
initializeAdminApp()

export const handler: Handler = async (event): Promise<NetlifyFunctionResponse> => {
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

    // Enable the user (set disabled to false)
    await admin.auth().updateUser(user.uid, { disabled: false });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: `User ${email} has been enabled.` }),
    };
  } catch (error) {
    console.error('Error enabling user:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to enable user.' }),
    };
  }
};
