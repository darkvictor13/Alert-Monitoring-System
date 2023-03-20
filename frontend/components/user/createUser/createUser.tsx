import Head from "next/head";
import styles from "./createUser.module.css";
import stylesCommon from "../../common.module.css";
import { NextPage } from "next";
import Router from "next/router";
import { ICreateUser } from "../../../../types/user";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Cancel, Edit } from "@mui/icons-material";
import MuiPhoneNumber from "material-ui-phone-number";
import { useState } from "react";
import backendApi from "../../../lib/axios/backend_api";

const CreateUser: NextPage = () => {
  const [phone, setPhone] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("submit");

    const formData = new FormData(e.currentTarget);
    const payload: ICreateUser = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
    };
    if (phone) {
      payload.phoneNumber = phone;
    }

    const response = await backendApi.post<ICreateUser>(
      "/user",
      JSON.stringify(payload)
    );
    if (response.status >= 200 && response.status < 300) {
      Router.push("/users");
    } else {
      Router.push("/error");
    }
  }

  return (
    <>
      <Head>
        <title>Sing In</title>
      </Head>
      <Container component="main" maxWidth="md">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            marginTop: "10%",
          }}
        >
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="firstName"
                label="First name"
                type="text"
                id="firstName"
                autoComplete="current-firstName"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="lastName"
                label="Last name"
                type="text"
                id="lastName"
                autoComplete="current-lastName"
              />
            </Box>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirm password"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="current-password"
              />
            </Box>
            <MuiPhoneNumber
              defaultCountry={"br"}
              value={phone}
              onChange={(e) => setPhone(e.toString())}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                mt: 6,
                justifyContent: "space-evenly",
              }}
            >
              <Button startIcon={<Edit />} type="submit" variant="contained">
                Sign Up
              </Button>
              <Button
                startIcon={<Cancel />}
                type="button"
                href="/"
                variant="contained"
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default CreateUser;
