import { MenuItem, useTheme } from "@mui/material";
import { NextPage } from "next";
import Router from "next/router";

const MyMenuTabItem: NextPage<{ text: string; route: string }> = ({
  text,
  route,
}) => {
  const theme = useTheme();

  return (
    <MenuItem
      sx={{
        "&:hover": {
          borderBottom: `2px solid ${theme.palette.primary.main}`,
        },
        borderBottom: "2px solid transparent",
      }}
      onClick={() => {
        Router.push(route);
      }}
    >
      {text}
    </MenuItem>
  );
};

export default MyMenuTabItem;
