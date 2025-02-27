import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Transaction } from './Transaction.entity';
import { SubCategory } from './SubCategory.entity';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ default: 'EXPENSE' })
  type!: 'INCOME' | 'EXPENSE';

  @Column({ nullable: true })
  color!: string;

  @Column({ nullable: true })
  icon!: string;

  @OneToMany(() => Transaction, transaction => transaction.category)
  transactions!: Transaction[];

  @OneToMany(() => SubCategory, subCategory => subCategory.category)
  subCategories!: SubCategory[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
} 