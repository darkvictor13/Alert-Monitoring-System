import { Exclude } from 'class-transformer';

export class SerializedUser {
  id: number;
  email: string;
  @Exclude()
  password: string;
  firstName: string;
  lastName: string;
}
