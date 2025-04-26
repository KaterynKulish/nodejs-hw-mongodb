import createHttpError from 'http-errors';

export const errorHandler = (error, req, res, next) => {
  console.log(error);
  const { status = 500, message = 'Something went wrong' } = error;

  res.status(status).json({
    message,
  });
};
