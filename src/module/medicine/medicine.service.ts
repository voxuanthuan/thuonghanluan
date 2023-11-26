import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { UpdateMedicineDto } from './dto/update-medicine.dto';
import { Medicine, MedicineDocument } from './schemas/medicine.schema';

@Injectable()
export class MedicineService {
  constructor(
    @InjectModel(Medicine.name)
    private readonly medicineModel: Model<Medicine>,
  ) {}
  create(createMedicineDto: CreateMedicineDto): Promise<MedicineDocument> {
    return this.medicineModel.create(createMedicineDto);
  }

  findAll() {
    return this.medicineModel.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} medicine`;
  }

  update(id: number, updateMedicineDto: UpdateMedicineDto) {
    return this.medicineModel.findByIdAndUpdate(id, updateMedicineDto);
  }

  remove(id: number) {
    return `This action removes a #${id} medicine`;
  }
}
