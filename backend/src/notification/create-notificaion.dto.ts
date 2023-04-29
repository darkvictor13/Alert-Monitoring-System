import { User } from 'src/user/entities/user.entity';

export class CreateNotificationDto {
  user: number | User;
  generatedBy: string;
  text: string;
}
