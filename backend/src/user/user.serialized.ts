import { Exclude } from 'class-transformer';

export class SerializedUser {
  @Exclude()
  password: string;
}
