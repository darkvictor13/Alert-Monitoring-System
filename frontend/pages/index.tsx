import Head from "next/head";
import Image from "next/image";
import { NextPage } from "next";
import { Box, Container, Paper, Tab, Tabs, Typography } from "@mui/material";
import { useAuth } from "../hooks/useAuth";
import StickyFooter from "../components/stickyFooter";
import TopTab from "../components/topTab/topTab";
import WithHeaderAndFooter from "../components/withHeaderAndFooter";

const HomePage = () => {
  const { isAuth } = useAuth();
  while (!isAuth) {
    return <div>loading...</div>;
  }
  return (
    <Box
      sx={{
        height: "100dvh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <TopTab />
      <Container
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <Typography variant="h3">
          Welcome to the Alert Monitoring System
        </Typography>
        <Typography variant="h6">
          This is a system that allows you to monitor the status of your devices
          and receive notifications when devices send alerts.
        </Typography>
      </Container>
      <StickyFooter />
    </Box>
  );
};

HomePage.getLayout = function getLayout(page: any) {
  return <WithHeaderAndFooter component={page} />;
};

export default HomePage;
