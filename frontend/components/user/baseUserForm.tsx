import Head from "next/head";
import { NextPage } from "next";
import { ICreateUser } from "../../../types/user";
import {
  Avatar,
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Cancel, Edit, Update } from "@mui/icons-material";
import MuiPhoneNumber from "material-ui-phone-number";
import { useState } from "react";
import { IPropsBaseUserForm } from "./propsBaseUserForm";

const BaseUserForm: NextPage<IPropsBaseUserForm> = ({
  onSubmitted,
  isCreate,
  user,
}) => {
  const [phone, setPhone] = useState(user?.phoneNumber || "");
  const title = isCreate ? "Sign up" : "Update";

  const getCreateUserFromForm = (e: React.FormEvent<HTMLFormElement>) => {
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
    return payload;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const createUser = getCreateUserFromForm(e);
    await onSubmitted(createUser);
  };

  return (
    <>
      <Head>
        <title>{title}</title>
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
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {title}
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <TextField
                margin="normal"
                defaultValue={user?.firstName}
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
                defaultValue={user?.lastName}
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
              defaultValue={user?.email}
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            {isCreate && (
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
            )}
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
              <Button
                startIcon={isCreate ? <Edit /> : <Update />}
                type="submit"
                variant="contained"
              >
                {isCreate ? "Sign up" : "Update"}
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

export default BaseUserForm;
