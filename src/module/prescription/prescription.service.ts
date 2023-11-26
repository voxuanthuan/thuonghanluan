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
    return this.prescriptionModel.find().populate('medicines.medicine');
  }

  findOne(id: string) {
    return this.prescriptionModel.findById(id).populate('medicines.medicine');
  }

  update(id: string, updatePrescriptionDto: UpdatePrescriptionDto) {
    return this.prescriptionModel.findByIdAndUpdate(id, updatePrescriptionDto);
  }

  remove(id: string) {
    return this.prescriptionModel.findByIdAndRemove(id);
  }
}
