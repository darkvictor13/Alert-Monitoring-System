import { NextPage } from "next";
import Router from "next/router";
import { ICreateUser } from "../../../types/user";
import backendApi from "../../lib/axios/backend_api";
import { login } from "../../lib/auth";
import BaseUserForm from "./baseUserForm";
import { forwardRef, ReactElement, Ref, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";

const CreateUser: NextPage = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const baseCloseDialog = () => {
    setOpenDialog(false);
    Router.push("/");
  };

  const Transition = forwardRef(function Transition(
    props: TransitionProps & {
      children: ReactElement<any, any>;
    },
    ref: Ref<unknown>
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  return (
    <>
      <BaseUserForm
        isCreate={true}
        onSubmitted={async (createUser: Partial<ICreateUser>) => {
          if (!createUser.email || !createUser.password) {
            throw new Error("Email and password are required to create user");
          }
          setOpenDialog(true);
          await backendApi.post<ICreateUser>(
            "/user",
            JSON.stringify(createUser)
          );
          await login({
            email: createUser.email,
            password: createUser.password,
          });
        }}
      />
      <Dialog
        open={openDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={baseCloseDialog}
      >
        <DialogTitle>
          {"Gostaria de ativar os alertas no Telegram?"}
        </DialogTitle>
        <DialogContent dividers>
          <DialogContentText id="alert-dialog-slide-description">
            Para receber os alertas gerados por essa aplicação no Telegram, é
            necessário enviar uma mensagem para nosso bot alert_bot.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={baseCloseDialog}>Não</Button>
          <Button
            onClick={() => {
              window.open(
                "https://t.me/backend_alert_bot?start=start",
                "_blank"
              );
              baseCloseDialog();
            }}
          >
            Sim
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreateUser;
