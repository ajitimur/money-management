import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Category } from './Category.entity';
import { Transaction } from './Transaction.entity';

@Entity('sub_categories')
export class SubCategory {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ nullable: true })
  description!: string;

  @Column({ nullable: true })
  color!: string;

  @Column({ nullable: true })
  icon!: string;

  @ManyToOne(() => Category, category => category.subCategories, { onDelete: 'CASCADE' })
  category!: Category;

  @Column()
  categoryId!: number;

  @OneToMany(() => Transaction, transaction => transaction.subCategory)
  transactions!: Transaction[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
} 