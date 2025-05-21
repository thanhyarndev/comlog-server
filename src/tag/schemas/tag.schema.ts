import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TagDocument = Tag & Document;

@Schema({ timestamps: true })
export class Tag {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop()
  color?: string;

  @Prop()
  icon?: string;
}

export const TagSchema = SchemaFactory.createForClass(Tag);
