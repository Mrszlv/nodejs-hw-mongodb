import express from 'express';
import pino from 'pino';
import { pinoHttp } from 'pino-http';
import cors from 'cors';

import { env } from './utils/env.js';

import { getAllContacts, getContactById } from './servises/contacts.js';

const PORT = Number(env('PORT', '3000'));

export const setupServer = () => {
  const app = express();

  const logger = pino({
    level: process.env.LOG_LEVEL || 'info',
    transport: { target: 'pino-pretty' },
  });

  app.use(cors());
  app.use(pinoHttp({ logger }));

  app.get('/contacts', async (req, res) => {
    const contacts = await getAllContacts();
    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  });

  app.get('/contacts/:contactId', async (req, res, next) => {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id: ${contactId}`,
      data: contact,
    });
  });

  app.use('*', (req, res, next) => {
    res.status(404).json({ message: 'Not found!' });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
