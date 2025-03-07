import { AppDataSource } from '../config/database';
import { Account, AccountType } from '../entities/Account.entity';
import { CreateAccountDto, UpdateAccountDto } from '../dtos/account.dto';
import { AppError } from '../types/error';

export class AccountService {
  private accountRepository = AppDataSource.getRepository(Account);

  async createAccount(userId: number, dto: CreateAccountDto): Promise<Account> {
    const account = this.accountRepository.create({
      ...dto,
      userId
    });

    return await this.accountRepository.save(account);
  }

  async getAccounts(userId: number, includeInactive = false): Promise<Account[]> {
    const query: any = { userId };
    
    if (!includeInactive) {
      query.isActive = true;
    }

    return await this.accountRepository.find({
      where: query,
      order: {
        type: 'ASC',
        name: 'ASC'
      }
    });
  }

  async getAccountById(userId: number, id: number): Promise<Account> {
    const account = await this.accountRepository.findOne({
      where: { id, userId }
    });

    if (!account) {
      throw new AppError('Account not found', 404);
    }

    return account;
  }

  async updateAccount(userId: number, id: number, dto: UpdateAccountDto): Promise<Account> {
    const account = await this.getAccountById(userId, id);
    
    Object.assign(account, dto);
    
    return await this.accountRepository.save(account);
  }

  async deleteAccount(userId: number, id: number): Promise<void> {
    const account = await this.getAccountById(userId, id);
    
    // Check if account has transactions
    const hasTransactions = await this.accountRepository
      .createQueryBuilder('account')
      .leftJoin('account.transactions', 'transaction')
      .where('account.id = :id', { id })
      .andWhere('transaction.id IS NOT NULL')
      .getExists();

    if (hasTransactions) {
      // Instead of deleting, mark as inactive
      account.isActive = false;
      await this.accountRepository.save(account);
    } else {
      await this.accountRepository.remove(account);
    }
  }

  async getAccountBalance(userId: number, id: number): Promise<number> {
    const account = await this.getAccountById(userId, id);
    return account.balance;
  }

  async createDefaultAccounts(userId: number): Promise<Account[]> {
    const defaultAccounts = [
      {
        name: 'Cash',
        type: AccountType.CASH,
        icon: 'payments',
        color: '#4CAF50'
      },
      {
        name: 'Bank Account',
        type: AccountType.BANK,
        icon: 'account_balance',
        color: '#2196F3'
      },
      {
        name: 'Credit Card',
        type: AccountType.CREDIT_CARD,
        icon: 'credit_card',
        color: '#F44336'
      }
    ];

    const accounts: Account[] = [];

    for (const accountData of defaultAccounts) {
      const account = this.accountRepository.create({
        ...accountData,
        userId
      });
      accounts.push(await this.accountRepository.save(account));
    }

    return accounts;
  }
} 