import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './User.entity';
import { Transaction } from './Transaction.entity';

export enum AccountType {
  CASH = 'CASH',
  BANK = 'BANK',
  CREDIT_CARD = 'CREDIT_CARD',
  E_WALLET = 'E_WALLET',
  INVESTMENT = 'INVESTMENT',
  SAVINGS = 'SAVINGS'
}

@Entity('accounts')
export class Account {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({
    type: 'enum',
    enum: AccountType,
    default: AccountType.CASH
  })
  type!: AccountType;

  @Column("decimal", { 
    precision: 10, 
    scale: 2, 
    default: 0,
    transformer: { 
      from: (value: string) => parseFloat(value),
      to: (value: number) => value
    }
  })
  balance!: number;

  @Column({ nullable: true })
  bankName?: string;

  @Column({ nullable: true })
  accountNumber?: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  color?: string;

  @Column({ nullable: true })
  icon?: string;

  @Column({ default: true })
  isActive!: boolean;

  @ManyToOne(() => User, user => user.accounts)
  user!: User;

  @Column()
  userId!: number;

  @OneToMany(() => Transaction, transaction => transaction.account)
  transactions!: Transaction[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
} 