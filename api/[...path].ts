import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createServer } from '../server/src/server.js';
import { connectToDatabase } from '../server/src/config/db.js';

// Cache the Express app and DB connection across serverless invocations
let app: ReturnType<typeof createServer> | null = null;
let dbConnectionPromise: Promise<void> | null = null;

// Initialize server and database connection (optimized for serverless)
const initServer = async () => {
  // Create Express app if not exists
  if (!app) {
    app = createServer();
  }

  // Ensure database connection (reuse existing connection if available)
  if (!dbConnectionPromise) {
    dbConnectionPromise = connectToDatabase().catch((error) => {
      console.error('Database connection error:', error);
      dbConnectionPromise = null; // Reset on error to allow retry
      throw error;
    });
  }

  // Wait for database connection
  await dbConnectionPromise;

  return app;
};

// Vercel serverless function handler
export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Set timeout for serverless functions (Vercel has a max execution time)
  const timeout = setTimeout(() => {
    if (!res.headersSent) {
      res.status(504).json({ 
        error: 'Gateway timeout',
        message: 'Request took too long to process'
      });
    }
  }, 25000); // 25 seconds (Vercel free tier has 10s, pro has 60s)

  try {
    const server = await initServer();
    
    // Clear timeout on successful response
    const originalEnd = res.end.bind(res);
    res.end = function(...args: Parameters<typeof res.end>) {
      clearTimeout(timeout);
      return originalEnd(...args);
    };

    return server(req, res);
  } catch (error) {
    clearTimeout(timeout);
    
    console.error('Server initialization error:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      path: req.url,
      method: req.method,
    });

    if (!res.headersSent) {
      res.status(500).json({ 
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' 
          ? (error instanceof Error ? error.message : 'Unknown error')
          : 'An error occurred while processing your request'
      });
    }
  }
}
