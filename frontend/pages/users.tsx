import { NextPage } from "next";
import Head from "next/head";
import ShowUser from "../components/user/showUser/showUser";
import { IUser } from "../../types/user";
import backendApi from "../lib/axios/backend_api";

export async function getServerSideProps() {
  const response = await backendApi.get<IUser[]>("/user", {
    withCredentials: true,
  });
  if (response.status >= 400) {
    return {
      redirect: {
        destination: "/error",
        permanent: false,
      },
    };
  }
  return {
    props: {
      users: response.data,
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
