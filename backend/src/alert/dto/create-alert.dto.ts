import { IsEnum, IsJSON, IsUUID } from 'class-validator';
import { AlertType } from 'types/alert';

export class CreateAlertDto {
  @IsEnum(AlertType)
  type: AlertType;

  @IsUUID('all')
  deviceUuid: string;

  @IsJSON()
  data: string;
}
