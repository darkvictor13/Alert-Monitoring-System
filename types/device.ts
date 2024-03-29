import { ISerializedUser } from "./user";

export interface IDevice {
  uuid: string;
  name: string;
  createdAt: Date;
  lastUpdatedAt: Date;
  user?: ISerializedUser | number;
}

export interface ICreateDevice {
  name: string;
  userId: number;
}
