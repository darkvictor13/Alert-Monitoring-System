import { INotification } from "../../../types/notification";

const NotificationMoreInfo = ({
  notification,
}: {
  notification: INotification;
}) => {
  return (
    <div>
      <h1>Notification More Info</h1>
      <p>{notification.text}</p>
    </div>
  );
};

export default NotificationMoreInfo;
