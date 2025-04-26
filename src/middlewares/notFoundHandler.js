import createHttpError from 'http-errors';
export const notFoundHandler = (req, res) => {
  // console.log(error);
  throw createHttpError(404, 'Route not found');
};
