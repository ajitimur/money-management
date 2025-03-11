import { Request, Response, NextFunction } from 'express';
import { AccountService } from '../services/account.service';
import { CreateAccountDto, UpdateAccountDto } from '../dtos/account.dto';
import { validateOrReject } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { AuthRequest } from '../middlewares/auth.middleware';

export class AccountController {
  private accountService: AccountService;

  constructor() {
    this.accountService = new AccountService();
  }

  create = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dto = plainToClass(CreateAccountDto, req.body);
      await validateOrReject(dto);

      const account = await this.accountService.createAccount(req.user!.id, dto);
      
      res.status(201).json({
        status: 'success',
        data: account
      });
    } catch (error) {
      next(error);
    }
  };

  getAll = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const includeInactive = req.query.includeInactive === 'true';
      const accounts = await this.accountService.getAccounts(req.user!.id, includeInactive);
      console.log(accounts);

      res.status(200).json({
        status: 'success',
        data: accounts
      });
    } catch (error) {
      next(error);
    }
  };

  getOne = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const account = await this.accountService.getAccountById(
        req.user!.id,
        parseInt(req.params.id)
      );

      res.status(200).json({
        status: 'success',
        data: account
      });
    } catch (error) {
      next(error);
    }
  };

  update = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dto = plainToClass(UpdateAccountDto, req.body);
      await validateOrReject(dto);

      const account = await this.accountService.updateAccount(
        req.user!.id,
        parseInt(req.params.id),
        dto
      );

      res.status(200).json({
        status: 'success',
        data: account
      });
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      await this.accountService.deleteAccount(
        req.user!.id,
        parseInt(req.params.id)
      );

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };

  createDefaults = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const accounts = await this.accountService.createDefaultAccounts(req.user!.id);

      res.status(201).json({
        status: 'success',
        data: accounts
      });
    } catch (error) {
      next(error);
    }
  };
} 