import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Transaction } from './Transaction.entity';
import { UserRole } from './UserRole.entity';
import { Account } from './Account.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({ nullable: true })
  firstName!: string;

  @Column({ nullable: true })
  lastName!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany(() => Transaction, transaction => transaction.user)
  transactions!: Transaction[];

  @ManyToMany(() => UserRole)
  @JoinTable({
    name: 'user_role_mappings',
    joinColumn: {
      name: 'userId',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'roleId',
      referencedColumnName: 'id'
    }
  })
  roles!: UserRole[];

  @OneToMany(() => Account, account => account.user)
  accounts!: Account[];
} 