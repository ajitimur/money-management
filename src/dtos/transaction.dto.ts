import { IsNotEmpty, IsNumber, IsDate, IsUUID, IsOptional, IsEnum, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTransactionDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  amount!: number;

  @IsNotEmpty()
  description!: string;

  @IsDate()
  @Type(() => Date)
  date!: Date;

  @IsEnum(['INCOME', 'EXPENSE'])
  type!: 'INCOME' | 'EXPENSE';

  @IsNotEmpty()
  @IsNumber()
  categoryId!: number;

  @IsOptional()
  notes?: string;
}

export class UpdateTransactionDto extends CreateTransactionDto {
  @IsOptional()
  amount!: number;

  @IsOptional()
  description!: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  date!: Date;

  @IsOptional()
  @IsEnum(['INCOME', 'EXPENSE'])
  type!: 'INCOME' | 'EXPENSE';

  @IsOptional()
  @IsNumber()
  categoryId!: number;
}

export class TransactionFilterDto {
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  startDate?: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  endDate?: Date;

  @IsOptional()
  @IsEnum(['INCOME', 'EXPENSE'])
  type?: 'INCOME' | 'EXPENSE';

  @IsOptional()
  @IsNumber()
  categoryId?: number;

  @IsOptional()
  search?: string;
} 