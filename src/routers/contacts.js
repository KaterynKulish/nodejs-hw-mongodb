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
import { validateBody } from '../utils/validateBody.js';
import {
  addContactSchema,
  updateContactSchema,
} from '../validation/contacts.js';
import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';

const contactRouter = Router();

contactRouter.use(authenticate);

contactRouter.get('/', ctrlWrapper(getContactsController));

contactRouter.get('/:id', isValidId, ctrlWrapper(getContactsByIdController));

contactRouter.post(
  '/',
  validateBody(addContactSchema),
  ctrlWrapper(addContactController),
);

contactRouter.patch(
  '/:id',
  isValidId,
  validateBody(updateContactSchema),
  ctrlWrapper(updateContactsController),
);

contactRouter.delete('/:id', isValidId, ctrlWrapper(deleteContactController));

export default contactRouter;
