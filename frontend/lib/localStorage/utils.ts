import { ISerializedUser } from "../../../types/user";

export function getLocalStorageLoggedUser(): ISerializedUser | null {
  if (typeof window === "undefined") {
    return null;
  }
  if (!process.env.NEXT_PUBLIC_LOCAL_STORAGE_USER_KEY) {
    throw new Error("Missing NEXT_PUBLIC_LOCAL_STORAGE_USER_KEY env var");
  }
  const json = localStorage.getItem(
    process.env.NEXT_PUBLIC_LOCAL_STORAGE_USER_KEY
  );
  if (!json) {
    throw new Error("No user in local storage");
  }
  const user: ISerializedUser = JSON.parse(json);
  return user;
}

export function setLocalStorageLoggedUser(user: ISerializedUser) {
  if (typeof window === "undefined") {
    return;
  }
  if (!process.env.NEXT_PUBLIC_LOCAL_STORAGE_USER_KEY) {
    throw new Error("Missing NEXT_PUBLIC_LOCAL_STORAGE_USER_KEY env var");
  }
  localStorage.setItem(
    process.env.NEXT_PUBLIC_LOCAL_STORAGE_USER_KEY,
    JSON.stringify(user)
  );
}
