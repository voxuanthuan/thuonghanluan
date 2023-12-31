// medication.model.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

export type MedicineDocument = HydratedDocument<Medicine>;

@Schema()
export class Medicine extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop()
  dosage: string;

  // You can add more fields as needed, such as side effects, etc.

  // Timestamps for creation and update
  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;

  @Prop({ type: Boolean, default: false })
  deleted: boolean;
}

export const MedicineSchema = SchemaFactory.createForClass(Medicine);
