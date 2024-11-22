import { ContactsColection } from '../db/models/contact.js';

export const getAllContacts = async (req, res) => {
  const contacts = await ContactsColection.find();
  return contacts;
};

export const getContactById = async (contactId) => {
  const contact = await ContactsColection.findById(contactId);
  return contact;
};

export const createContact = async (payload) => {
  const contact = await ContactsColection.create(payload);
  return contact;
};

export const updateContact = async (contactId, payload, options = {}) => {
  const rawResult = await ContactsColection.findOneAndUpdate(
    { _id: contactId },
    payload,
    { new: true, includeResultMetadata: true, ...options },
  );
  if (!rawResult || !rawResult.value) return null;
  return {
    contact: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};

export const deleteContact = async (contactId) => {
  const contact = await ContactsColection.findOneAndDelete({ _id: contactId });
  return contact;
};
