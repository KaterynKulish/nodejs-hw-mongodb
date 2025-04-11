import { sortList } from '../constants/index.js';
import ContactCollection from '../db/models/Contact.js';
import { calcPaginationData } from '../utils/calcPaginationData.js';

export const getContacts = async ({
  page = 1,
  perPage = 10,
  sortBy = '_id',
  sortOrder = sortList[0],
}) => {
  const skip = (page - 1) * perPage;

  const data = await ContactCollection.find()
    .skip(skip)
    .limit(perPage)
    .sort({ [sortBy]: sortOrder });

  const totalItems = await ContactCollection.find().countDocuments();

  const paginationData = calcPaginationData({ totalItems, page, perPage });

  return { data, page, perPage, totalItems, ...paginationData };
};

export const getContactsById = (id) => ContactCollection.findOne({ _id: id });

export const addContact = (payload) => ContactCollection.create(payload);

export const updateContact = async (_id, payload) => {
  const data = await ContactCollection.findOneAndUpdate({ _id }, payload, {
    new: true,
    // upsert: true,
  });

  return data;
};

export const deleteContact = (_id) =>
  ContactCollection.findOneAndDelete({ _id });
