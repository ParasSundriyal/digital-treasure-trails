import type { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

export const notFoundHandler = (_req: Request, res: Response) => {
  res.status(404).json({ message: 'Route not found' });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof ZodError) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: err.errors,
    });
  }

  const status = err.statusCode ?? 500;
  const message = err.message ?? 'Unexpected server error';
  console.error(err);
  return res.status(status).json({ message });
};

