import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ExpenseDocument = Expense & Document;

@Schema({ timestamps: true })
export class Expense {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  date: string; // ISO format

  @Prop()
  notes?: string;

  @Prop({ default: false })
  isFinalized?: boolean;

  // ✅ thêm để phân biệt tạo theo session hay thủ công
  @Prop({ default: false })
  isSessionBased?: boolean;

  // ✅ ID của session nếu có
  @Prop({ type: String, default: null })
  sessionId?: string;

  @Prop({ type: [String], default: [] })
  tagIds: string[];
}

export const ExpenseSchema = SchemaFactory.createForClass(Expense);
