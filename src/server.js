import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import contactRouter from './routers/contacts.js';

import { getEnvVar } from './utils/getEnvVar.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
const PORT = Number(getEnvVar('port', '3001'));

export const setupServer = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  // app.use(
  //   pino({
  //     transport: {
  //       target: 'pino-pretty',
  //     },
  //   }),
  // );

  app.use('/contacts', contactRouter);

  app.use('/contacts/:id', contactRouter);

  app.use('*', notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
};
