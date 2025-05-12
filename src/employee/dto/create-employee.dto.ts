import { IsEnum, IsOptional, IsString } from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  alias?: string;

  @IsEnum(['male', 'female'])
  gender: 'male' | 'female';
}