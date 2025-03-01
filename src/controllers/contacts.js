import {
  createContact,
  updateContact,
  deleteContact,
  getAllContacts,
  getContactById,
} from '../servises/contacts.js';

import createHttpError from 'http-errors';

import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

export const getContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);
  const { user } = req;
  const contacts = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
    user,
  });
  if (!contacts) throw createHttpError(404, 'Contact not found');
  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const { user } = req;
  const contact = await getContactById(contactId, user);
  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }
  res.status(200).json({
    status: 200,
    message: `Succesfully found contact width id ${contactId}`,
    data: contact,
  });
};

export const createContactController = async (req, res) => {
  const photo = req.file;

  let photoUrl;

  if (photo) {
    const result = await saveFileToCloudinary(req.file.path);
    photoUrl = result;
  }
  if (!req.body || Object.keys(req.body).length === 0) {
    throw createHttpError(400, 'Request body is missing');
  }
  const { user } = req;

  const result = await createContact({
    ...req.body,
    userId: user._id,
    photo: photoUrl,
  });
  if (!result) throw createHttpError(404, 'Filed to create a contact');

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: result,
  });
};

export const patchContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const { user } = req;
  const photo = req.file;

  let photoUrl;

  if (photo) {
    const result = await saveFileToCloudinary(req.file.path);
    photoUrl = result;
  }

  const result = await updateContact(contactId, user, {
    ...req.body,
    photo: photoUrl,
  });
  if (!result) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }
  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: result.contact,
  });
};

export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const { user } = req;

  const contact = await deleteContact(contactId, user);
  if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }
  res.status(204).end();
};
