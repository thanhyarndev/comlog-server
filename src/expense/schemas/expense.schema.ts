import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ExpenseDocument = Expense & Document;

@Schema({ timestamps: true })
export class Expense {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  date: string; // ISO format: yyyy-MM-dd

  @Prop()
  notes?: string;

  @Prop({ default: false })
  isFinalized?: boolean;
}

export const ExpenseSchema = SchemaFactory.createForClass(Expense);
