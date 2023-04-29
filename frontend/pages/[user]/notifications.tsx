import { useRouter } from "next/router";
import NotificationList from "../../components/notifications/notificationList";

const Notifications = () => {
  const router = useRouter();
  const { user } = router.query;
  const userId = user ? parseInt(user as string) : -1;

  return <NotificationList userId={userId} />;
};

export default Notifications;
