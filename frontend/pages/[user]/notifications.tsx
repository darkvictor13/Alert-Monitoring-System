import { useRouter } from "next/router";
import NotificationList from "../../components/notifications/notificationList";
import { useAuth } from "../../hooks/useAuth";

const Notifications = () => {
  const { isAuth } = useAuth();
  const router = useRouter();
  const { user } = router.query;
  const userId = user ? parseInt(user as string) : -1;

  return <NotificationList userId={userId} />;
};

export default Notifications;
