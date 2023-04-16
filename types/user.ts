export interface IUser {
  id: number;
  email: string;
}

export interface ISerializedUser {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  telegramId: string;
  createdAt: Date;
  lastUpdatedAt: Date;
}

export interface ICreateUser {
  email: string;
  password: string;

  firstName: string;
  lastName: string;

  phoneNumber?: string;

  telegramId?: string;
}
