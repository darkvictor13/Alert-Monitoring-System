import Router from "next/router";
import { useState, useEffect } from "react";
import { ISerializedUser } from "../../types/user";
import { getLocalStorageLoggedUser } from "../lib/localStorage/utils";

export interface AuthorizedUser {
  id: number;
  isAuth: boolean;
}

export const useAuth = (): AuthorizedUser => {
  const [isAuth, setIsAuth] = useState(false);
  const [userId, setUserId] = useState(-1);
  useEffect(() => {
    // only run on client side
    if (typeof window === "undefined") {
      return;
    }

    const isAuth: boolean = document.cookie.includes("connect.sid");
    setIsAuth(isAuth);
    if (!isAuth) {
      Router.push("/signin");
    }

    const user: ISerializedUser = getLocalStorageLoggedUser();
    setUserId(user.id);
  }, []);
  return { id: userId, isAuth };
};

export const handleAuth = (isAuth: boolean) => {
  if (!isAuth) {
    Router.push("/signin");
  }
};
