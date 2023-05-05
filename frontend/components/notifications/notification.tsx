import { Announcement } from "@mui/icons-material";
import { Box, Typography, useTheme } from "@mui/material";
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
  const theme = useTheme();
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
        padding: "20px 20px 10px 20px",
        margin: "10px",
        borderRadius: "5px",
        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
        transition: "all 0.3s ease",
        "&:hover": {
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
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
          justifyContent: "flex-start",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        <Announcement />
        <Typography>
          O dispositivo <b>{notification.generatedBy}</b> informa
          {" " + notification.text}.
        </Typography>
      </Box>
      <Typography
        sx={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-end",
        }}
      >
        {timeAgo}
      </Typography>
    </Box>
  );
};

export default Notification;
