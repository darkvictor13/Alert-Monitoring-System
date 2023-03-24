import Router from "next/router";
import { useState, useEffect } from "react";

export const useAuth = (): boolean => {
  const [isAuth, setIsAuth] = useState(false);
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
  }, []);
  return isAuth;
};

export const handleAuth = (isAuth: boolean) => {
  if (!isAuth) {
    Router.push("/signin");
  }
};
