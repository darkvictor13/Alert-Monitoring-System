import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ICreateDevice } from 'types/device';

export class CreateDeviceDto implements ICreateDevice {
  @IsString()
  @IsOptional()
  @ApiProperty()
  name: string;

  @IsNumber()
  @ApiProperty()
  userId: number;
}
