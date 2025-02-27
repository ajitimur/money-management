import { Request, Response, NextFunction } from 'express';
import { AppError } from '../types/error';

export const errorHandler = (
  err: Error | AppError,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
    return;
  }

  // Handle unexpected errors
  console.error('Unexpected error:', err);
  res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
};

export const notFoundHandler = (req: Request, res: Response, _next: NextFunction): void => {
  res.status(404).json({
    status: 'error',
    message: `Cannot ${req.method} ${req.url}`,
  });
}; 