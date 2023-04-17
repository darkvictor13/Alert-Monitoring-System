import { ILogin } from "../../types/login";
import { ISerializedUser } from "../../types/user";
import backendApi from "./axios/backend_api";
import { setLocalStorageLoggedUser } from "./localStorage/utils";

export function logout() {
  if (typeof window !== "undefined") {
    document.cookie =
      "connect.sid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }
}

export async function login(login: ILogin) {
  console.log("login", login);
  await backendApi.post<ILogin>("/auth/login", login);
  console.log("login success");
  const { data } = await backendApi.get<ISerializedUser>("/user", {
    params: {
      email: login.email,
    },
  });
  console.log("data", data);

  setLocalStorageLoggedUser(data);

  return data;
}
