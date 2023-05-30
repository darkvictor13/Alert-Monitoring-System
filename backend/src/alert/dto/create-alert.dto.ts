import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsJSON, IsUUID } from 'class-validator';
import { AlertType, ICreateAlert } from 'types/alert';

export class CreateAlertDto implements ICreateAlert {
  @IsEnum(AlertType)
  @ApiProperty()
  type: AlertType;

  @ApiProperty()
  @IsUUID('all')
  deviceUuid: string;

  @ApiProperty()
  @IsJSON()
  data: string;
}
