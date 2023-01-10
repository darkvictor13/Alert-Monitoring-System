import styles from "./login.module.css";

export default function Login() {
  return (
    <main>
      <form
        method="post"
        action={process.env.NEXT_PUBLIC_HOST + "/api/auth/login"}
      >
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" />
        </div>
        <button className={styles.login_button} type="submit">
          Login
        </button>
      </form>
      <button>Create an account</button>
    </main>
  );
}
