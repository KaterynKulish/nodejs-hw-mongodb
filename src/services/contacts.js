import ContactCollection from '../db/models/Contact.js';

export const getContacts = () => ContactCollection.find();

export const getContactsById = (id) => ContactCollection.findOne({ _id: id });

export const addContact = (payload) => ContactCollection.create(payload);

export const updateContact = async (_id, payload) => {
  const data = await ContactCollection.findOneAndUpdate({ _id }, payload, {
    new: true,
  });

  return data;
};

export const deleteContact = (_id) =>
  ContactCollection.findOneAndDelete({ _id });
