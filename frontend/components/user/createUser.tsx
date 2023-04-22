import { NextPage } from "next";
import Router from "next/router";
import { ICreateUser } from "../../../types/user";
import backendApi from "../../lib/axios/backend_api";
import { login } from "../../lib/auth";
import BaseUserForm from "./baseUserForm";

const CreateUser: NextPage = () => {
  return (
    <BaseUserForm
      isCreate={true}
      onSubmitted={async (createUser: Partial<ICreateUser>) => {
        if (!createUser.email || !createUser.password) {
          throw new Error("Email and password are required to create user");
        }
        await backendApi.post<ICreateUser>("/user", JSON.stringify(createUser));
        await login({
          email: createUser.email,
          password: createUser.password,
        });
        Router.push("/");
      }}
    />
  );
};

export default CreateUser;
