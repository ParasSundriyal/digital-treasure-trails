import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createServer } from '../server/src/server.js';
import { connectToDatabase } from '../server/src/config/db.js';

let app: ReturnType<typeof createServer> | null = null;
let dbConnected = false;

// Initialize server and database connection
const initServer = async () => {
  if (!app) {
    if (!dbConnected) {
      try {
        await connectToDatabase();
        dbConnected = true;
      } catch (error) {
        console.error('Database connection error:', error);
        throw error;
      }
    }
    app = createServer();
  }
  return app;
};

// Vercel serverless function handler
export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  try {
    const server = await initServer();
    return server(req, res);
  } catch (error) {
    console.error('Server initialization error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
