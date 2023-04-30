import { Announcement } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { NextPage } from "next";
import {
  INotification,
  INotificationWithoutUser,
} from "../../../types/notification";
import { formatDistanceToNow } from "date-fns";
import { useEffect, useState } from "react";

const Notification: NextPage<{ notification: INotificationWithoutUser }> = ({
  notification,
}) => {
  console.log(JSON.stringify(notification));
  const [timeAgo, setTimeAgo] = useState(
    formatDistanceToNow(new Date(notification.createdAt), {
      addSuffix: true,
    })
  );
  useEffect(() => {
    const interval = setInterval(() => {
      const newTimeAgo = formatDistanceToNow(new Date(notification.createdAt), {
        addSuffix: true,
        includeSeconds: true,
      });
      if (newTimeAgo !== timeAgo) {
        setTimeAgo(newTimeAgo);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [notification.createdAt, timeAgo]);
  return (
    <Box
      sx={{
        width: "50%",
        border: "2px solid black",
        padding: "20px",
        margin: "10px",
        borderRadius: "5px",
        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
        transition: "all 0.3s ease",
        "&:hover": {
          backgroundColor: "#222",
        },
        "&:hover *": {
          fontSize: "larger",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
          gap: "30px",
          marginBottom: "20px",
        }}
      >
        <Announcement />
        <Typography>
          O dispositivo <b>{notification.generatedBy}</b> informa
          {" " + notification.text}
        </Typography>
      </Box>
      <Typography>{timeAgo}</Typography>
    </Box>
  );
};

export default Notification;
