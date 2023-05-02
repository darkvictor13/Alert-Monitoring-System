import Head from "next/head";
import Image from "next/image";
import { NextPage } from "next";
import { Container, Tab, Tabs } from "@mui/material";
import { useAuth } from "../hooks/useAuth";
import StickyFooter from "../components/stickyFooter";
import TopTab from "../components/topTab/topTab";

const HomePage: NextPage = () => {
  const { isAuth } = useAuth();
  return (
    <>
      <TopTab />
      <Container>
        {isAuth ? <div>Is Logged</div> : <div>Is not Logged</div>}
      </Container>
      <StickyFooter />
    </>
  );
};

export default HomePage;
