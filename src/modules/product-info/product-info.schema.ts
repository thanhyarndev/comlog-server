import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductInfoDocument = ProductInfo & Document;

@Schema()
export class ProductInfo {
  @Prop({ required: true, unique: true })
  sku: string;

  @Prop()
  name: string;

  @Prop()
  price: number;

  @Prop()
  description: string;
}

export const ProductInfoSchema = SchemaFactory.createForClass(ProductInfo);