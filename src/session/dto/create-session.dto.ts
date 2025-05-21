import { IsArray, IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateSessionDto {
  @IsString()
  expenseId: string;

  @IsArray()
  @IsString({ each: true })
  items: string[]; // tên các món ăn

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
