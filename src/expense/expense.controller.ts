import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { Expense } from './schemas/expense.schema';

@Controller('expenses')
export class ExpenseController {
  constructor(private readonly service: ExpenseService) {}

  @Post()
  create(@Body() dto: CreateExpenseDto): Promise<Expense> {
    return this.service.create(dto);
  }

  @Get()
  findAll(): Promise<Expense[]> {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Expense> {
    return this.service.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateExpenseDto): Promise<Expense> {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.service.remove(id);
  }
}
