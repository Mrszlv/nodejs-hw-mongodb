import { Router } from 'express';
import { crtlWrapper } from '../utils/ctrlWrapper.js';
import {
  createContactController,
  deleteContactController,
  getContactByIdController,
  getContactsController,
  patchContactController,
} from '../controllers/contacts.js';

const router = Router();

router.get('/contacts', crtlWrapper(getContactsController));
router.get('/contacts/:contactId', crtlWrapper(getContactByIdController));
router.post('/contacts', crtlWrapper(createContactController));
router.patch('/contacts/:contactId', crtlWrapper(patchContactController));
router.delete('/contacts/:contactId', crtlWrapper(deleteContactController));

export default router;
