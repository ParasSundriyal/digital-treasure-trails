import { config } from 'dotenv';

config();

const required = ['ADMIN_EMAIL', 'ADMIN_PASSWORD', 'JWT_SECRET'] as const;

required.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`Missing required admin env variable: ${key}`);
  }
});

export const adminConfig = {
  email: process.env.ADMIN_EMAIL as string,
  password: process.env.ADMIN_PASSWORD as string,
  jwtSecret: process.env.JWT_SECRET as string,
};


