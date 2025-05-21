import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ExpenseController } from './expense.controller';
import { ExpenseService } from './expense.service';
import { Expense, ExpenseSchema } from './schemas/expense.schema';
import { ExpenseTransaction, ExpenseTransactionSchema } from './schemas/expense-transaction.schema';
import { ExpenseTransactionService } from './expense-transaction.service';
import { ExpenseTransactionController } from './expense-transaction.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Expense.name, schema: ExpenseSchema },
      { name: ExpenseTransaction.name, schema: ExpenseTransactionSchema },
    ]),
  ],
  controllers: [ExpenseController, ExpenseTransactionController],
  providers: [ExpenseService, ExpenseTransactionService],
  exports: [
    MongooseModule, 
  ],
})
export class ExpenseModule {}
