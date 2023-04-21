import { AlertType } from 'types/alert';

export class CreateAlertDto {
  type: AlertType;
  deviceUuid: string;
  data: string;
}
