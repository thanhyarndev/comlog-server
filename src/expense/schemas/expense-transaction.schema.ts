import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Expense } from './expense.schema';

export type ExpenseTransactionDocument = ExpenseTransaction & Document;

@Schema({ timestamps: true })
export class ExpenseTransaction {
  @Prop({ type: Types.ObjectId, ref: Expense.name, required: true })
  expenseId: Types.ObjectId;

  @Prop({ required: true })
  employeeId: string;

  @Prop({ required: true })
  amount: number;

  @Prop()
  note?: string;

  @Prop({ default: 0 })
  receivedAmount: number;

  @Prop({ default: 'unpaid', enum: ['unpaid', 'partial', 'paid'] })
  status: 'unpaid' | 'partial' | 'paid';

  @Prop({ type: [String], default: [] })
  tagIds: string[];
}

export const ExpenseTransactionSchema = SchemaFactory.createForClass(ExpenseTransaction);
