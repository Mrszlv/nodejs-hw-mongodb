import express from 'express';
import pino from 'pino';
import { pinoHttp } from 'pino-http';
import cors from 'cors';

import {
  getAllContacts,
  getContactById,
} from './controlers/contactsControler.js';

const PORT = process.env.PORT || 3000;

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
    res.status(200).json({ data: contacts });
  });

  app.get('/contacts/:contactId', async (req, res, next) => {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);
    if (!contact) {
      res.status(404).json({ message: 'Contact not found' });
      return;
    }
    res.status(200).json({ data: contact });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
