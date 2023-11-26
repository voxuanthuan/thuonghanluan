import { IsOptional, IsString } from 'class-validator';

export class CreateMedicineDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  dosage: string;
}
