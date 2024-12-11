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
  checkRoles(ROLES.ADMIN),
  authenticate,
  ctrlWrapper(getContactsController),
);

router.get(
  '/:contactId',
  checkRoles(ROLES.ADMIN, ROLES.USER),
  authenticate,
  isValidId,
  ctrlWrapper(getContactByIdController),
);

router.post(
  '/',
  checkRoles(ROLES.ADMIN),
  authenticate,
  jsonParser,
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);

router.patch(
  '/:contactId',
  checkRoles(ROLES.ADMIN, ROLES.USER),
  authenticate,
  isValidId,
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactController),
);

router.delete(
  '/:contactId',
  checkRoles(ROLES.ADMIN),
  authenticate,
  isValidId,
  ctrlWrapper(deleteContactController),
);

export default router;
