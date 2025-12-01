import { config } from 'dotenv';

config();

const requiredKeys = ['MONGO_URI'] as const;

requiredKeys.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
});

const env = {
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  PORT: Number(process.env.PORT ?? 5000),
  CLIENT_URL: process.env.CLIENT_URL ?? process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}` 
    : 'http://localhost:5173',
  MONGO_URI: process.env.MONGO_URI as string,
};

export default env;

