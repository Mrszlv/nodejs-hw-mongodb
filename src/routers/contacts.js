import { Router } from 'express';

import {
  createContactController,
  deleteContactController,
  getContactByIdController,
  getContactsController,
  patchContactController,
} from '../controllers/contacts.js';
import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contacts.js';

import { crtlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValidId.js';
import { validateBody } from '../middlewares/validateBody.js';

const router = Router();

router.get('/contacts', crtlWrapper(getContactsController));

router.get(
  '/contacts/:contactId',
  isValidId,
  crtlWrapper(getContactByIdController),
);

router.post(
  '/contacts',
  validateBody(createContactSchema),
  crtlWrapper(createContactController),
);

router.patch(
  '/contacts/:contactId',
  isValidId,
  validateBody(updateContactSchema),
  crtlWrapper(patchContactController),
);

router.delete(
  '/contacts/:contactId',
  isValidId,
  crtlWrapper(deleteContactController),
);

export default router;
