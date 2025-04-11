import ContactCollection from '../db/models/Contact.js';

export const getContacts = async (page = 1, perPage = 10) => {
  const skip = (page - 1) * perPage;
  const data = await ContactCollection.find().skip(skip).limit(perPage);
  return data;
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
