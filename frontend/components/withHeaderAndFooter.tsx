import { NextPage } from "next";
import StickyFooter from "./stickyFooter";
import TopTab from "./topTab/topTab";

export default function WithHeaderAndFooter({ component }: { component: any }) {
  return (
    <>
      <TopTab />
      {component}
      <StickyFooter />
    </>
  );
}
