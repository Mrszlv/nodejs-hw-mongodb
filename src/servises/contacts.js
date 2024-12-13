import { SORT_ORDER } from '../constans/constans.js';
import { ContactsColection } from '../db/models/contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = 'name',
  filter = {},
  user,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;
  const contactsQuery = ContactsColection.find({ userId: user._id });

  if (filter.contactType) {
    contactsQuery.where('contactType').equals(filter.contactType);
  }
  if (filter.isFavourite) {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }

  const [contactsCount, contacts] = await Promise.all([
    ContactsColection.find().merge(contactsQuery).countDocuments(),
    contactsQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);
  const paginationData = calculatePaginationData(contactsCount, perPage, page);
  return { data: contacts, ...paginationData };
};

export const getContactById = async (contactId, user) => {
  const contact = await ContactsColection.findOne({
    _id: contactId,
    userId: user._id,
  });
  return contact;
};

export const createContact = async (payload) => {
  const contact = await ContactsColection.create(payload);
  return contact;
};

export const updateContact = async (contactId, user, contact, options = {}) => {
  const updateResult = await ContactsColection.findOneAndUpdate(
    { _id: contactId, userId: user._id },
    contact,
    { new: true, includeResultMetadata: true, ...options },
  );
  if (!updateResult || !updateResult.value) return null;
  return {
    contact: updateResult.value,
    isNew: Boolean(updateResult?.lastErrorObject.upserted),
  };
};

export const deleteContact = async (contactId, user) => {
  const contact = await ContactsColection.findOneAndDelete({
    _id: contactId,
    userId: user._id,
  });
  return contact;
};
