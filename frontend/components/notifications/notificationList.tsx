import { Box } from "@mui/system";
import { NextPage } from "next";
import useSWR from "swr";
import { useSWRClient } from "../../hooks/useSwrClient";
import { INotification } from "../../../types/notification";
import Notification from "./notification";
import TopTab from "../topTab/topTab";
import StickyFooter from "../stickyFooter";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import NoNotifications from "./noNotifications";

const DEFAULT_NUMBER_OF_NOTIFICATIONS = 10;
const INCREMENT_NUMBER_OF_NOTIFICATIONS = 10;

const NotificationList: NextPage<{ userId: number }> = ({ userId }) => {
  const [numberOfNotifications, setNumberOfNotifications] = useState(
    DEFAULT_NUMBER_OF_NOTIFICATIONS
  );
  const { data } = useSWRClient<INotification[]>(
    `/notification?userId=${userId}&takeLimit=${numberOfNotifications}`
  );

  // just render the notifications and the load more button
  const renderNotifications = () => {
    return (
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
            marginBottom: "20px",
          }}
        >
          Load More
        </Button>
      </Box>
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100dvh",
      }}
    >
      <TopTab />
      {(data?.length || 0) > 0 ? renderNotifications() : <NoNotifications />}
      <StickyFooter />
    </Box>
  );
};

export default NotificationList;
