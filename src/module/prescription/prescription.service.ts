import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePrescriptionDto } from './dto/create-prescription.dto';
import { UpdatePrescriptionDto } from './dto/update-prescription.dto';
import {
  Prescription,
  PrescriptionDocument,
} from './schemas/prescription.schema';

@Injectable()
export class PrescriptionService {
  constructor(
    @InjectModel(Prescription.name)
    private readonly prescriptionModel: Model<Prescription>,
  ) {}
  create(
    createPrescriptionDto: CreatePrescriptionDto,
  ): Promise<PrescriptionDocument> {
    return this.prescriptionModel.create(createPrescriptionDto);
  }

  findAll() {
    return this.prescriptionModel.find();
  }

  findOne(id: number) {
    return this.prescriptionModel.findById(id);
  }

  update(id: number, updatePrescriptionDto: UpdatePrescriptionDto) {
    return this.prescriptionModel.findByIdAndUpdate(id, updatePrescriptionDto);
  }

  remove(id: number) {
    return this.prescriptionModel.findByIdAndRemove(id);
  }
}
