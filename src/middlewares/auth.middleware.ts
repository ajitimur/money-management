import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { config } from '../config';
import { AppError } from '../types/error';
import { AppDataSource } from '../config/database';
import { User } from '../entities/User.entity';

export interface AuthRequest extends Request {
  user?: User;
}

export const authenticate = async (
  req: AuthRequest,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError('No token provided', 401);
    }

    const token = authHeader.split(' ')[1];
    const decoded = verify(token, config.jwt.secret) as { userId: string };

    const user = await AppDataSource.getRepository(User).findOne({
      where: { id: Number(decoded.userId) },
    });

    if (!user) {
      throw new AppError('User not found', 401);
    }

    req.user = user;
    next();
  } catch (error) {
    next(new AppError('Invalid token', 401));
  }
}; 