import { NotificationsNone } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { NextPage } from "next";

const NoNotifications: NextPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "20px",
        flexGrow: 1,
      }}
    >
      <NotificationsNone sx={{ fontSize: "100px" }} />
      <Typography variant="h4">No notifications to show</Typography>
    </Box>
  );
};

export default NoNotifications;
