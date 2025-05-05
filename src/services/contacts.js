import createHttpError from 'http-errors';
import { sortList } from '../constants/index.js';
import ContactCollection from '../db/models/Contact.js';
import { calcPaginationData } from '../utils/calcPaginationData.js';

export const getContacts = async ({
  page = 1,
  perPage = 10,
  sortBy = '_id',
  sortOrder = sortList[0],
  filters = {},
}) => {
  const skip = (page - 1) * perPage;

  const contactQuery = ContactCollection.find();

  if (filters.userId) {
    contactQuery.where('userId').equals(filters.userId);
  }

  if (filters.type) {
    contactQuery.where('contactType').equals(filters.type);
  }
  if (typeof filters.isFavourite === 'boolean')
    contactQuery.where('isFavourite').equals(filters.isFavourite);

  const totalItems = await ContactCollection.find()
    .merge(contactQuery)
    .countDocuments();

  const data = await contactQuery
    .skip(skip)
    .limit(perPage)
    .sort({ [sortBy]: sortOrder })
    .collation({ locale: 'en', strength: 2, numericOrdering: true });

  const paginationData = calcPaginationData({ totalItems, page, perPage });

  return { data, page, perPage, totalItems, ...paginationData };
};

export const getContactsById = (id, userId) =>
  ContactCollection.findOne({ _id: id, userId });

export const addContact = (payload) => ContactCollection.create(payload);

export const updateContact = async (_id, userId, payload, posterUrl) => {
  const data = await ContactCollection.findOneAndUpdate(
    { _id, userId },
    payload,
    {
      new: true,
      // upsert: true,
    },
  );

  return data;
};

export const deleteContact = (_id, userId) =>
  ContactCollection.findOneAndDelete({ _id, userId });
