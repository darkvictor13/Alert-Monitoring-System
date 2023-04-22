import { NextPage } from "next";
import Router from "next/router";
import { useEffect, useState } from "react";
import { ISerializedUser } from "../../../types/user";
import { useAuth } from "../../hooks/useAuth";
import backendApi from "../../lib/axios/backend_api";
import { getLocalStorageLoggedUser } from "../../lib/localStorage/utils";
import BaseUserForm from "./baseUserForm";

const UpdateUser: NextPage = () => {
  const { isAuth } = useAuth();

  while (!isAuth) {
    return <div>Is not Logged</div>;
  }

  const user = getLocalStorageLoggedUser();
  if (!user) {
    return <div>Is not Logged</div>;
  }

  return (
    <BaseUserForm
      isCreate={false}
      user={user}
      onSubmitted={async (updateUser) => {
        await backendApi.patch(`/user/${user.id}`, JSON.stringify(updateUser));
        Router.push("/");
      }}
    />
  );
};

export default UpdateUser;
