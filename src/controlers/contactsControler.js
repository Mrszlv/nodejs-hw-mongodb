import { ContactsColection } from '../db/models/contact.js';

export const getAllContacts = async (req, res) => {
  const contacts = await ContactsColection.find();
  return contacts;
};

export const getContactById = async (contactId) => {
  const contact = await ContactsColection.findById(contactId);
  return contact;
};
