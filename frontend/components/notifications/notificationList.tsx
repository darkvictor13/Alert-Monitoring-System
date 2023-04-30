import { Box } from "@mui/system";
import { NextPage } from "next";
import useSWR from "swr";
import { useSWRClient } from "../../hooks/useSwrClient";
import { INotification } from "../../../types/notification";
import Notification from "./notification";
import TopTab from "../topTab";
import StickyFooter from "../stickyFooter";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";

const DEFAULT_NUMBER_OF_NOTIFICATIONS = 10;
const INCREMENT_NUMBER_OF_NOTIFICATIONS = 10;

const NotificationList: NextPage<{ userId: number }> = ({ userId }) => {
  const [numberOfNotifications, setNumberOfNotifications] = useState(
    DEFAULT_NUMBER_OF_NOTIFICATIONS
  );
  const { data, error } = useSWRClient<INotification[]>(
    `/notification/${userId}/${numberOfNotifications}`
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
        <Box>
          <Button
            onClick={() =>
              setNumberOfNotifications(
                numberOfNotifications + INCREMENT_NUMBER_OF_NOTIFICATIONS
              )
            }
            variant="contained"
            color="primary"
            sx={{
              fontWeight: "bold",
              textTransform: "none",
              marginTop: "20px",
              marginBottom: "20px",
            }}
          >
            Load More
          </Button>
        </Box>
      </Box>
      <StickyFooter />
    </>
  );
};

export default NotificationList;
