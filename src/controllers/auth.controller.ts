import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service';
import { RegisterDto, LoginDto } from '../dtos/auth.dto';
import { validateOrReject } from 'class-validator';
import { plainToClass } from 'class-transformer';

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const registerDto = plainToClass(RegisterDto, req.body);
      await validateOrReject(registerDto);

      const { user, accessToken } = await this.authService.register(registerDto);
      
      res.status(201).json({
        status: 'success',
        data: {
          user,
          accessToken,
        },
      });
    } catch (error) {
      next(error);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const loginDto = plainToClass(LoginDto, req.body);
      await validateOrReject(loginDto);

      const { user, accessToken, refreshToken } = await this.authService.login(loginDto);

      res.status(200).json({
        status: 'success',
        data: {
          user,
          accessToken,
          refreshToken,
        },
      });
    } catch (error) {
      next(error);
    }
  };
} 