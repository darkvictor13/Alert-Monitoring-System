import { NextPage } from "next";
import Head from "next/head";
import ShowUser from "../components/user/showUser/showUser";
import { IUser } from "../types/user";

export async function getServerSideProps() {
  const response = await fetch(process.env.NEXT_PUBLIC_HOST + "/api/user");
  if (!response.ok) {
    return {
      redirect: {
        destination: "/error",
        permanent: false,
      },
    };
  }
  const users: IUser[] = await response.json();
  return {
    props: {
      users,
    },
  };
}

const Users: NextPage<{ users: IUser[] }> = ({ users }) => {
  return (
    <>
      <Head>
        <title>Sing In</title>
      </Head>
      <h1>Users</h1>
      {users.map((user) => (
        <ShowUser key={user.id} user={user} />
      ))}
    </>
  );
};

export default Users;
