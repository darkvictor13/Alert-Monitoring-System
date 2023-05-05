import Head from "next/head";
import Image from "next/image";
import { NextPage } from "next";
import { Container, Tab, Tabs } from "@mui/material";
import { useAuth } from "../hooks/useAuth";
import StickyFooter from "../components/stickyFooter";
import TopTab from "../components/topTab/topTab";
import WithHeaderAndFooter from "../components/withHeaderAndFooter";

const HomePage = () => {
  const { isAuth } = useAuth();
  return (
    <>
      <Container>
        {isAuth ? <div>Is Logged</div> : <div>Is not Logged</div>}
      </Container>
    </>
  );
};

HomePage.getLayout = function getLayout(page: any) {
  return <WithHeaderAndFooter component={page} />;
};

export default HomePage;
