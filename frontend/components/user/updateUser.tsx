import { NextPage } from "next";
import Router from "next/router";
import { useEffect, useState } from "react";
import { ICreateUser, ISerializedUser } from "../../../types/user";
import { useAuth } from "../../hooks/useAuth";
import backendApi from "../../lib/axios/backend_api";
import {
  getLocalStorageLoggedUser,
  setLocalStorageLoggedUser,
} from "../../lib/localStorage/utils";
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
        // get all fields that are different from the user
        const payload: Partial<ICreateUser> = {};
        if (updateUser.email !== user.email) {
          payload.email = updateUser.email;
        }
        if (updateUser.firstName !== user.firstName) {
          payload.firstName = updateUser.firstName;
        }
        if (updateUser.lastName !== user.lastName) {
          payload.lastName = updateUser.lastName;
        }
        if (updateUser.phoneNumber !== user.phoneNumber) {
          payload.phoneNumber = updateUser.phoneNumber;
        }
        if (updateUser.telegramId !== user.telegramId) {
          payload.telegramId = updateUser.telegramId;
        }

        console.log(payload);

        if (Object.keys(payload).length === 0) {
          return;
        }

        console.log("passei pelo check");

        await backendApi.patch(`/user/${user.id}`, JSON.stringify(payload));
        console.log("passei pelo patch");
        setLocalStorageLoggedUser({
          ...user,
          ...payload,
        } as ISerializedUser);
        Router.push("/");
      }}
    />
  );
};

export default UpdateUser;
