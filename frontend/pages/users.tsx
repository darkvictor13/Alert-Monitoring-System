import { NextPage } from "next";
import Head from "next/head";
import ShowUser from "../components/user/showUser/showUser";
import { IUser } from "../../types/user";
import backendApi from "../lib/axios/backend_api";
import { useEffect, useState } from "react";

const Users: NextPage = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await backendApi.get<IUser[]>("/user");
      setUsers(response.data);
    };
    fetchUsers();
  }, []);

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
