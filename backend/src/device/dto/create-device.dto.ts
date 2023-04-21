import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateDeviceDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsNumber()
  userId: number;
}
