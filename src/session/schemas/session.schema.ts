// session.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type SessionDocument = Session & Document;

@Schema({ timestamps: true })
export class Session {

  @Prop({ required: true })
  expenseId: Types.ObjectId; // tham chiếu về Expense

  @Prop({ default: [] })
  items: string[]; // danh sách món ăn để chọn

  @Prop({ default: false })
  isActive: boolean;
}

export const SessionSchema = SchemaFactory.createForClass(Session);