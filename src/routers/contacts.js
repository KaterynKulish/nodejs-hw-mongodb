import { Router } from 'express';
import {
  addContactController,
  deleteContactController,
  getContactsByIdController,
  getContactsController,
  updateContactsController,
} from '../controllers/contacts.js';
import { getContacts, getContactsById } from '../services/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const contactRouter = Router();

contactRouter.get('/', ctrlWrapper(getContactsController));

contactRouter.get('/:id', ctrlWrapper(getContactsByIdController));

contactRouter.post('/', ctrlWrapper(addContactController));

contactRouter.patch('/:id', ctrlWrapper(updateContactsController));

contactRouter.delete('/:id', ctrlWrapper(deleteContactController));

export default contactRouter;
