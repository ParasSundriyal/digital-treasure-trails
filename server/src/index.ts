// This file is ONLY for local development
// For Vercel deployment, use api/[...path].ts instead

// Prevent execution in Vercel/production environment
if (process.env.VERCEL || process.env.VERCEL_ENV) {
  console.log('Skipping server startup - running in Vercel environment');
  process.exit(0);
}

import env from './config/env.js';
import { connectToDatabase } from './config/db.js';
import { createServer } from './server.js';

const start = async () => {
  try {
    await connectToDatabase();
    const app = createServer();
    app.listen(env.PORT, () => {
      console.log(`Treasure hunt API ready on port ${env.PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server', error);
    process.exit(1);
  }
};

void start();
