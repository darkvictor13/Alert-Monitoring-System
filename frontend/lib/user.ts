import { ISerializedUser } from "../../types/user";

export default function createEmptyUser(): ISerializedUser {
  return {
    id: -1,
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    telegramId: "",
    createdAt: new Date(),
    lastUpdatedAt: new Date(),
  };
}
