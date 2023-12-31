import { BadRequestException, Injectable } from '@nestjs/common';
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
  async create(
    createMedicineDto: CreateMedicineDto,
  ): Promise<MedicineDocument> {
    const medicineExist = await this.medicineModel.findOne({
      name: createMedicineDto.name,
    });
    if (medicineExist) {
      throw new BadRequestException('Tên vị thuốc đã tồn tại');
    }
    return this.medicineModel.create(createMedicineDto);
  }

  findAll() {
    return this.medicineModel.find({ deleted: false });
  }

  findOne(id: string) {
    return this.medicineModel.findById(id);
  }

  update(id: string, updateMedicineDto: UpdateMedicineDto) {
    return this.medicineModel.findByIdAndUpdate(id, updateMedicineDto);
  }

  remove(id: string) {
    return this.medicineModel.findByIdAndUpdate(id, {
      deleted: false,
    });
  }
}
