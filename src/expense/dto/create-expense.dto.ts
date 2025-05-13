import { IsNotEmpty, IsString, IsDateString, IsNumber, Min } from 'class-validator';

export class CreateExpenseDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsDateString()
  date: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  totalAmount: number;

  @IsNumber()
  @Min(0)
  totalReceived?: number;
}
