import { Box } from "@mui/system";
import { NextPage } from "next";
import useSWR from "swr";
import { useSWRClient } from "../../hooks/useSwrClient";
import { INotification } from "../../../types/notification";
import Notification from "./notification";
import TopTab from "../topTab";
import StickyFooter from "../stickyFooter";

const NotificationList: NextPage<{ userId: number }> = ({ userId }) => {
  const { data, error } = useSWRClient<INotification[]>(
    `/notification/${userId}`
  );
  return (
    <>
      <TopTab />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        {data?.map((notification) => (
          <Notification key={notification.id} notification={notification} />
        ))}
      </Box>
      <StickyFooter />
    </>
  );
};

export default NotificationList;
