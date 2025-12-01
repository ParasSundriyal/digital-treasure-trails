import { createServer } from './server.js';
import { connectToDatabase } from './config/db.js';
import env, { validateEnv } from './config/env.js';

// Prevent starting the local server accidentally in serverless environments
if (process.env.VERCEL || process.env.VERCEL_URL || process.env.VERCEL_ENV) {
  // If running on Vercel, do not start a long-running server
  // Local development uses this file to start a server only
} else {
  const app = createServer();
  validateEnv();
  connectToDatabase()
    .then(() => {
      app.listen(env.PORT, () => {
        console.log(`Server started on port ${env.PORT}`);
      });
    })
    .catch((err) => {
      console.error('Failed to connect to database', err);
      process.exit(1);
    });
}

export {}; // Keep this file an ES module-compatible script
