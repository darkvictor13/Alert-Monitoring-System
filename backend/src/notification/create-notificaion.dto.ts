import { User } from 'src/user/entities/user.entity';
import { AlertType } from 'types/alert';

export class CreateNotificationDto {
  user: number | User;
  generatedBy: string;
  text: string;
  type: AlertType;
  alertId: number;
  imagePath?: string;
}
