import { Between, ILike } from 'typeorm';
import { AppDataSource } from '../config/database';
import { Transaction } from '../entities/Transaction.entity';
import { Category } from '../entities/Category.entity';
import { User } from '../entities/User.entity';
import { CreateTransactionDto, UpdateTransactionDto, TransactionFilterDto } from '../dtos/transaction.dto';
import { AppError } from '../types/error';

export class TransactionService {
  private transactionRepository = AppDataSource.getRepository(Transaction);
  private categoryRepository = AppDataSource.getRepository(Category);

  async createTransaction(userId: number, dto: CreateTransactionDto): Promise<Transaction> {
    const category = await this.categoryRepository.findOne({
      where: { id: dto.categoryId },
    });

    if (!category) {
      throw new AppError('Category not found', 404);
    }

    const transaction = this.transactionRepository.create({
      ...dto,
      userId,
    });

    return await this.transactionRepository.save(transaction);
  }

  async getTransactions(userId: number, filters: TransactionFilterDto): Promise<[Transaction[], number]> {
    const queryBuilder = this.transactionRepository
      .createQueryBuilder('transaction')
      .leftJoinAndSelect('transaction.category', 'category')
      .where('transaction.userId = :userId', { userId });

    if (filters.startDate && filters.endDate) {
      queryBuilder.andWhere('transaction.date BETWEEN :startDate AND :endDate', {
        startDate: filters.startDate,
        endDate: filters.endDate,
      });
    }

    if (filters.type) {
      queryBuilder.andWhere('transaction.type = :type', { type: filters.type });
    }

    if (filters.categoryId) {
      queryBuilder.andWhere('transaction.categoryId = :categoryId', {
        categoryId: filters.categoryId,
      });
    }

    if (filters.search) {
      queryBuilder.andWhere('transaction.description ILIKE :search', {
        search: `%${filters.search}%`,
      });
    }

    return await queryBuilder
      .orderBy('transaction.date', 'DESC')
      .getManyAndCount();
  }

  async getTransactionById(userId: number, id: number): Promise<Transaction> {
    const transaction = await this.transactionRepository.findOne({
      where: { id, userId },
      relations: ['category'],
    });

    if (!transaction) {
      throw new AppError('Transaction not found', 404);
    }

    return transaction;
  }

  async updateTransaction(userId: number, id: number, dto: UpdateTransactionDto): Promise<Transaction> {
    const transaction = await this.getTransactionById(userId, id);

    if (dto.categoryId) {
      const category = await this.categoryRepository.findOne({
        where: { id: dto.categoryId },
      });

      if (!category) {
        throw new AppError('Category not found', 404);
      }
    }

    Object.assign(transaction, dto);
    return await this.transactionRepository.save(transaction);
  }

  async deleteTransaction(userId: number, id: number): Promise<void> {
    const transaction = await this.getTransactionById(userId, id);
    await this.transactionRepository.remove(transaction);
  }
} 