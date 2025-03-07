import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './User.entity';
import { Category } from './Category.entity';
import { SubCategory } from './SubCategory.entity';
import { Account } from './Account.entity';

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('decimal', { precision: 10, scale: 2 })
  amount!: number;

  @Column()
  description!: string;

  @Column({ type: 'date' })
  date!: Date;

  @Column({ default: 'EXPENSE' })
  type!: 'INCOME' | 'EXPENSE';

  @ManyToOne(() => Category, category => category.transactions)
  category!: Category;

  @Column()
  categoryId!: number;

  @ManyToOne(() => User, user => user.transactions)
  user!: User;

  @Column()
  userId!: number;

  @Column({ nullable: true })
  notes!: string;

  @ManyToOne(() => SubCategory, subCategory => subCategory.transactions)
  subCategory!: SubCategory;

  @Column({ nullable: true })
  subCategoryId!: string;

  @ManyToOne(() => Account, account => account.transactions)
  account!: Account;

  @Column()
  accountId!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
} 