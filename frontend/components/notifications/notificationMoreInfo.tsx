import { Container, Paper, Typography } from "@mui/material";
import { AlertType } from "../../../types/alert";
import { INotification } from "../../../types/notification";

const NotificationMoreInfo = ({
  notification,
}: {
  notification: INotification;
}) => {
  const generateTitle = () => {
    switch (notification.type) {
      case AlertType.PRESENCE_ALERT:
        return "Mais informações sobre o alerta de presença";
      case AlertType.PRESENCE_ALERT_WITH_PHOTO:
        return "Mais informações sobre o alerta de presença com foto";
      default:
        return "Mais informações sobre o alerta";
    }
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper>
        <Typography variant="h3">{generateTitle()}</Typography>
      </Paper>
    </Container>
  );
};

export default NotificationMoreInfo;
