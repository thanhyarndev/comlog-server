import { Controller, Post, Get, Param, Body, Put, Delete, Query } from '@nestjs/common';
import { ExpenseTransactionService } from './expense-transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { ExpenseTransaction } from './schemas/expense-transaction.schema';

@Controller('expense-transactions')
export class ExpenseTransactionController {
  constructor(private readonly service: ExpenseTransactionService) {}

  @Post()
  create(@Body() dto: CreateTransactionDto): Promise<ExpenseTransaction> {
    return this.service.create(dto);
  }

  @Get('by-expense/:expenseId')
  findByExpense(
    @Param('expenseId') expenseId: string,
  ): Promise<ExpenseTransaction[]> {
    return this.service.findByExpense(expenseId);
  }

  @Get('filter')
  findByFilter(
    @Query('expenseId') expenseId?: string,
    @Query('employeeId') employeeId?: string,
  ): Promise<ExpenseTransaction[]> {
    return this.service.findByFilter({ expenseId, employeeId });
  }

  @Get()
  findByMultipleExpenseIds(
    @Query('expenseIds') expenseIds?: string[],
  ): Promise<ExpenseTransaction[]> {
    return this.service.findByExpenseIds(expenseIds);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() dto: CreateTransactionDto,
  ): Promise<ExpenseTransaction> {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.service.remove(id);
  }
}
