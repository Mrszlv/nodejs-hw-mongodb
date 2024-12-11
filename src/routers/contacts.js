import { Router } from 'express';
import express from 'express';

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

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { checkRoles } from '../middlewares/checkRoles.js';

import { isValidId } from '../middlewares/isValidId.js';
import { validateBody } from '../middlewares/validateBody.js';
import { authenticate } from '../middlewares/authenticate.js';
import { ROLES } from '../constans/constans.js';

const jsonParser = express.json();
const router = Router();
router.use(authenticate);

router.get(
  '/',
  authenticate,
  checkRoles(ROLES.ADMIN),
  ctrlWrapper(getContactsController),
);

router.get(
  '/:contactId',
  authenticate,
  checkRoles(ROLES.ADMIN, ROLES.USER),
  isValidId,
  ctrlWrapper(getContactByIdController),
);

router.post(
  '/',
  authenticate,
  checkRoles(ROLES.ADMIN),
  jsonParser,
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);

router.patch(
  '/:contactId',
  authenticate,
  checkRoles(ROLES.ADMIN, ROLES.USER),
  isValidId,
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactController),
);

router.delete(
  '/:contactId',
  authenticate,
  checkRoles(ROLES.ADMIN),
  isValidId,
  ctrlWrapper(deleteContactController),
);

export default router;
