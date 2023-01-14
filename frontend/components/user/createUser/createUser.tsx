import Head from "next/head";
import styles from "./createUser.module.css";
import stylesCommon from "../../common.module.css";
import { NextPage } from "next";
import Router from "next/router";
import { ICreateUser } from "../../../types/user";

const CreateUser: NextPage = () => {
  function handleGoBack() {
    Router.push("/");
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const payload: ICreateUser = {
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
    };

    const response = await fetch(process.env.NEXT_PUBLIC_HOST + "/api/user", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      Router.push("/error");
    } else {
      Router.push("/users");
    }
  }

  return (
    <>
      <Head>
        <title>Sing In</title>
      </Head>
      <div className={stylesCommon.centered_div}>
        <form onSubmit={handleSubmit}>
          <div>
            <h1 className={styles.title_h1}>Sing In</h1>
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
                required
                minLength={4}
              />
            </div>
          </div>
          <button className={stylesCommon.basic_button} type="submit">
            Create User
          </button>
        </form>
        <button className={stylesCommon.basic_button} onClick={handleGoBack}>
          Go Back
        </button>
      </div>
    </>
  );
};

export default CreateUser;
