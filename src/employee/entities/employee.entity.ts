import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EmployeeDocument = Employee & Document;

@Schema({ timestamps: true })
export class Employee {
  @Prop({ required: true })
  name: string;

  @Prop()
  alias?: string;

  @Prop({ required: true, enum: ['male', 'female'] })
  gender: 'male' | 'female';
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);