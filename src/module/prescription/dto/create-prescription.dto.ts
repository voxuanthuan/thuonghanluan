import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { Medicine } from '../interface/medicine.interface';

export class CreatePrescriptionDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsArray()
  medicines: Medicine[];
}
