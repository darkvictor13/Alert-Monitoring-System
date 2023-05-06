import DeviceList from "../components/device/deviceList";
import { useAuth } from "../hooks/useAuth";

const Notifications = () => {
  const { id } = useAuth();
  return <DeviceList userId={id} />;
};

export default Notifications;
