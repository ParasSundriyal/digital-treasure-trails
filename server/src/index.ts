/**
 * Local Development Server Entry Point
 * 
 * This file is ONLY for local development.
 * For Vercel deployment, the serverless function handler is in api/[...path].ts
 * 
 * DO NOT import or execute this file in Vercel/production environments.
 */

// Check environment FIRST - before any imports
// This prevents execution in Vercel environments
const isVercel = process.env.VERCEL || process.env.VERCEL_ENV || process.env.VERCEL_URL;

if (isVercel) {
  console.log('Skipping local server startup - running in Vercel environment');
  process.exit(0);
}

// Use dynamic imports to prevent module evaluation in Vercel
// This ensures imports only happen in local development
const startLocalServer = async () => {
  try {
    // Dynamic imports - only executed in local dev
    const { default: env } = await import('./config/env.js');
    const { connectToDatabase } = await import('./config/db.js');
    const { createServer } = await import('./server.js');
    
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
