import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ExpenseDocument = Expense & Document;

@Schema({ timestamps: true })
export class Expense {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  date: string;

  @Prop({ required: true })
  totalAmount: number;

  @Prop({ default: 0 })
  totalReceived: number;
}

export const ExpenseSchema = SchemaFactory.createForClass(Expense);
