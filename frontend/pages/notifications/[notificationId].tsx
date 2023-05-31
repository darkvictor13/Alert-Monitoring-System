import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { INotification } from "../../../types/notification";
import NotificationMoreInfo from "../../components/notifications/notificationMoreInfo";
import backendApi from "../../lib/axios/backend_api";

const NotificationShowMoreInfo = () => {
  const router = useRouter();
  const [notification, setNotification] = useState<INotification | null>(null);
  const notificationId = router.query.notificationId;

  useEffect(() => {
    function fetchNotification() {
      backendApi
        .get<INotification[]>("/notification", {
          params: {
            notificationId,
          },
        })
        .then((response) => {
          if (response.data) {
            setNotification(response.data[0]);
          }
        });
    }
    fetchNotification();
  }, [notificationId]);

  if (!notification) {
    return <div>Loading...</div>;
  }

  return <NotificationMoreInfo notification={notification as INotification} />;
};

export default NotificationShowMoreInfo;
