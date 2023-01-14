import styles from "./login.module.css";
import stylesCommon from "../common.module.css";
import type { NextPage } from "next";

const Login: NextPage = () => {
  return (
    <div className={stylesCommon.centered_div}>
      <form
        method="post"
        action={process.env.NEXT_PUBLIC_HOST + "/api/auth/login"}
      >
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" required />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            minLength={4}
            required
          />
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
