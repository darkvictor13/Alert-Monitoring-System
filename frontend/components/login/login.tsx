import styles from "./login.module.css";
import stylesCommon from "../common.module.css";
import type { NextPage } from "next";
import { ILogin } from "../../types/login";
import Router from "next/router";

const Login: NextPage = () => {
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const payload: ILogin = {
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
    };

    const response = await fetch(
      process.env.NEXT_PUBLIC_HOST + "/api/auth/login",
      {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      Router.push("/error");
    } else {
      Router.push("/users");
    }
  }

  return (
    <div className={stylesCommon.centered_div}>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" required />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" required />
        </div>
        <button className={stylesCommon.basic_button} type="submit">
          Login
        </button>
      </form>
      <button>Create an account</button>
    </div>
  );
};

export default Login;
