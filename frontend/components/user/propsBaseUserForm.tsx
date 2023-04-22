import { ICreateUser, ISerializedUser } from "../../../types/user";

export interface IPropsBaseUserForm {
  isCreate: boolean;
  user?: ISerializedUser;
  onSubmitted: (user: Partial<ICreateUser>) => Promise<void>;
}
