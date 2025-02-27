import { Request, Response, NextFunction } from 'express';
import { AppError } from '../types/error';
import { Permission } from '../types/permission';
import { AuthRequest } from './auth.middleware';
import { AppDataSource } from '../config/database';
import { User } from '../entities/User.entity';

export const hasPermission = (requiredPermission: Permission) => {
  return async (req: AuthRequest, _res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        throw new AppError('Unauthorized', 401);
      }

      // Get fresh user data with roles
      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOne({
        where: { id: req.user.id },
        relations: ['roles']
      });

      if (!user) {
        throw new AppError('User not found', 404);
      }

      // Check if user has the required permission through any of their roles
      const hasRequiredPermission = user.roles.some(role => 
        role.permissions.includes(requiredPermission)
      );

      if (!hasRequiredPermission) {
        throw new AppError('Forbidden: Insufficient permissions', 403);
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

export const hasRole = (requiredRoles: string[]) => {
  return async (req: AuthRequest, _res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        throw new AppError('Unauthorized', 401);
      }

      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOne({
        where: { id: req.user.id },
        relations: ['roles']
      });

      if (!user) {
        throw new AppError('User not found', 404);
      }

      const hasRequiredRole = user.roles.some(role => 
        requiredRoles.includes(role.name)
      );

      if (!hasRequiredRole) {
        throw new AppError('Forbidden: Insufficient role', 403);
      }

      next();
    } catch (error) {
      next(error);
    }
  };
}; 