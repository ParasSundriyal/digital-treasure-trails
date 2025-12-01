/**
 * Local Development Server Entry Point
 * 
 * This file is ONLY for local development.
 * For Vercel deployment, the serverless function handler is in api/[...path].ts
 * 
 * DO NOT import or execute this file in Vercel/production environments.
 */

// Prevent execution in Vercel/production environment
if (process.env.VERCEL || process.env.VERCEL_ENV || process.env.VERCEL_URL) {
  console.log('Skipping local server startup - running in Vercel environment');
  process.exit(0);
}

import env from './config/env.js';
import { connectToDatabase } from './config/db.js';
import { createServer } from './server.js';

const startLocalServer = async () => {
  try {
    // Connect to database
    await connectToDatabase();
    
    // Create Express app
    const app = createServer();
    
    // Start listening on PORT (local dev only)
    app.listen(env.PORT, () => {
      console.log(`🚀 Treasure hunt API running locally on http://localhost:${env.PORT}`);
      console.log(`📝 Environment: ${env.NODE_ENV}`);
      console.log(`🌐 Client URL: ${env.CLIENT_URL}`);
    });
  } catch (error) {
    console.error('❌ Failed to start local server:', error);
    process.exit(1);
  }
};

// Start the server
void startLocalServer();
