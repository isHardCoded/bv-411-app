import AppError from '../errors/AppError.js';

export const errorMiddleware = (err, req, res, next) => {
  if (err instanceof AppError) {
    return res.status(err.status).json({
      message: err.message,
    });
  }

  console.error(err);
  return res.status(500).json({
    message: 'Ошибка сервера',
  });
};
