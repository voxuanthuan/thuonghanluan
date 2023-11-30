import { BadRequestException, Injectable } from '@nestjs/common';
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
  async create(
    createPrescriptionDto: CreatePrescriptionDto,
  ): Promise<PrescriptionDocument> {
    const prescriptExist = await this.prescriptionModel.findOne({
      name: createPrescriptionDto.name,
    });
    if (prescriptExist) {
      throw new BadRequestException('Tên bài thuốc đã tồn tại!');
    }
    return this.prescriptionModel.create(createPrescriptionDto);
  }

  findAll(query) {
    return this.prescriptionModel
      .find({ name: { $regex: `^${query.name}` } })
      .populate('medicines.medicine');
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
