import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductItemDocument = ProductItem & Document;

@Schema()
export class ProductItem {
  @Prop({ required: true, unique: true })
  epc: string;

  @Prop({ required: true })
  sku: string;

  @Prop({ default: false })
  isCheckout: boolean;
}

export const ProductItemSchema = SchemaFactory.createForClass(ProductItem);