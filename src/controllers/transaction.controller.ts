import { Request, Response, NextFunction } from 'express';
import { TransactionService } from '../services/transaction.service';
import { CreateTransactionDto, UpdateTransactionDto, TransactionFilterDto } from '../dtos/transaction.dto';
import { validateOrReject } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { AuthRequest } from '../middlewares/auth.middleware';

export class TransactionController {
  private transactionService: TransactionService;

  constructor() {
    this.transactionService = new TransactionService();
  }

  create = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dto = plainToClass(CreateTransactionDto, req.body);
      await validateOrReject(dto);

      const transaction = await this.transactionService.createTransaction(req.user!.id, dto);
      
      res.status(201).json({
        status: 'success',
        data: transaction,
      });
    } catch (error) {
      next(error);
    }
  };

  getAll = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const filters = plainToClass(TransactionFilterDto, req.query);
      await validateOrReject(filters);

      const [transactions, count] = await this.transactionService.getTransactions(
        req.user!.id,
        filters,
      );

      res.status(200).json({
        status: 'success',
        data: transactions,
        count,
      });
    } catch (error) {
      next(error);
    }
  };

  getOne = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const transaction = await this.transactionService.getTransactionById(
        req.user!.id,
        Number(req.params.id),
      );

      res.status(200).json({
        status: 'success',
        data: transaction,
      });
    } catch (error) {
      next(error);
    }
  };

  update = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dto = plainToClass(UpdateTransactionDto, req.body);
      await validateOrReject(dto);

      const transaction = await this.transactionService.updateTransaction(
        req.user!.id,
        Number(req.params.id),
        dto,
      );

      res.status(200).json({
        status: 'success',
        data: transaction,
      });
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      await this.transactionService.deleteTransaction(req.user!.id, Number(req.params.id));

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
} 