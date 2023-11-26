// prescription.model.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Types } from 'mongoose';
import { Medicine } from 'src/module/medicine/schemas/medicine.schema';

export type PrescriptionDocument = HydratedDocument<Prescription>;

@Schema()
export class Prescription extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({
    type: [
      {
        medicine: { type: Types.ObjectId, ref: 'Medicine' },
        dosage: {
          amount: Number,
          unit: String,
        },
      },
    ],
    required: true,
  })
  medicines: Array<{
    medicine: Types.ObjectId | Medicine;
    dosage: {
      amount: number;
      unit: string;
    };
  }>;

  // Additional prescription details can be added here.

  // Timestamps for creation and update
  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;

  @Prop({ type: Boolean, default: false })
  deleted: boolean;
}

export const PrescriptionSchema = SchemaFactory.createForClass(Prescription);
