// src/food-item/food-item.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FoodItemDocument = FoodItem & Document;

@Schema({ timestamps: true })
export class FoodItem {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  type: 'main' | 'side'; // món chính hoặc phụ

  @Prop({ required: true })
  price: number; // giá tham khảo
}

export const FoodItemSchema = SchemaFactory.createForClass(FoodItem);
