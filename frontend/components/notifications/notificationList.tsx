import { Box } from "@mui/system";
import { NextPage } from "next";
import useSWR from "swr";
import { useSWRClient } from "../../hooks/useSwrClient";
import { INotification } from "../../../types/notification";

const NotificationList: NextPage<{ userId: number }> = ({ userId }) => {
  const { data, error } = useSWRClient<INotification[]>(
    `/notification/${userId}`
  );
  return (
    <Box>
      {data?.map((notification) => (
        <div key={notification.id}>{notification.id}</div>
      ))}
    </Box>
  );
};

export default NotificationList;
