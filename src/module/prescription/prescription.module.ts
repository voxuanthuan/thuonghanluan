import { Module } from '@nestjs/common';
import { PrescriptionService } from './prescription.service';
import { PrescriptionController } from './prescription.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Prescription,
  PrescriptionSchema,
} from './schemas/prescription.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Prescription.name,
        schema: PrescriptionSchema,
      },
    ]),
  ],
  controllers: [PrescriptionController],
  providers: [PrescriptionService],
  exports: [PrescriptionService],
})
export class PrescriptionModule {}
