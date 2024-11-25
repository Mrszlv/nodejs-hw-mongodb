import express from 'express';
import pino from 'pino';
import { pinoHttp } from 'pino-http';
import cors from 'cors';

import contactsRouter from './routers/contacts.js';

import { env } from './utils/env.js';

import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';

const PORT = Number(env('PORT', '3000'));

export const setupServer = () => {
  const app = express();
  app.use(express.json());

  const logger = pino({
    level: process.env.LOG_LEVEL || 'info',
    transport: { target: 'pino-pretty' },
  });

  app.use(cors());
  app.use(pinoHttp({ logger }));

  app.get('/', (req, res) => {
    res.json({ message: 'Helo world!' });
  });

  app.use(contactsRouter);
  app.use('*', notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
