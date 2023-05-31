import { useRouter } from "next/router";
import NotificationList from "../../components/notifications/notificationList";
import { useAuth } from "../../hooks/useAuth";

const Notifications = () => {
  const { id } = useAuth();
  return <NotificationList userId={id} />;
};

export default Notifications;
