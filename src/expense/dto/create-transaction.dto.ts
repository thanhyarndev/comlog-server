import { IsNotEmpty, IsString, IsNumber, Min, IsOptional, IsEnum } from 'class-validator';

export class CreateTransactionDto {
  @IsNotEmpty()
  @IsString()
  expenseId: string;

  @IsNotEmpty()
  @IsString()
  employeeId: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  amount: number;

  @IsOptional()
  @IsString()
  note?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  receivedAmount?: number;

  @IsOptional()
  @IsEnum(['unpaid', 'partial', 'paid'])
  status?: 'unpaid' | 'partial' | 'paid';
}
