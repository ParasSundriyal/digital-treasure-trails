import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import env from './config/env.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import router from './routes/index.js';

export const createServer = () => {
  const app = express();

  app.use(helmet());
  app.use(
    cors({
      origin: env.CLIENT_URL,
      credentials: true,
    }),
  );
  app.use(express.json({ limit: '10kb' }));
  app.use(morgan('dev'));

  app.get('/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  app.use('/api', router);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};

