/* eslint-disable @next/next/no-img-element */
import { Announcement } from "@mui/icons-material";
import {
  Box,
  Button,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import { NextPage } from "next";
import {
  INotification,
  INotificationWithoutUser,
} from "../../../types/notification";
import { formatDistanceToNow } from "date-fns";
import { useEffect, useState } from "react";
import Router from "next/router";
import { AlertType } from "../../../types/alert";
import Image from "next/image";

const TableCellInfo = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => {
  return (
    <TableRow>
      <TableCell
        style={{
          borderRight: "1px solid #ccc",
          textAlign: "center",
        }}
      >
        <Typography variant="h6">{label}</Typography>
      </TableCell>
      <TableCell
        style={{
          textAlign: "center",
        }}
      >
        <Typography variant="h6">{value}</Typography>
      </TableCell>
    </TableRow>
  );
};

const Notification: NextPage<{ notification: INotificationWithoutUser }> = ({
  notification,
}) => {
  const baseUrl = process.env.NEXT_PUBLIC_HOST;
  if (!baseUrl) {
    throw new Error("Missing NEXT_PUBLIC_BASE_URL env var");
  }
  const url = baseUrl + "/" + notification.alertId.toString() + ".jpg";
  console.log("url", url);
  const theme = useTheme();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

  const [timeAgo, setTimeAgo] = useState(
    formatDistanceToNow(new Date(notification.createdAt), {
      addSuffix: true,
    })
  );
  useEffect(() => {
    const interval = setInterval(() => {
      const newTimeAgo = formatDistanceToNow(new Date(notification.createdAt), {
        addSuffix: true,
        includeSeconds: true,
      });
      if (newTimeAgo !== timeAgo) {
        setTimeAgo(newTimeAgo);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [notification.createdAt, timeAgo]);

  const generateTitle = () => {
    console.log("notification.type", notification.type);
    const alertType = notification.type as AlertType;
    if (alertType == AlertType.PRESENCE_ALERT) {
      return "Mais informações sobre o alerta de presença";
    }
    if (alertType == AlertType.PRESENCE_ALERT_WITH_PHOTO) {
      return "Mais informações sobre o alerta de presença com foto";
    }
    return "Alerta";
  };

  return (
    <>
      <Box
        onClick={handleOpen}
        sx={{
          cursor: "pointer",
          width: "50%",
          border: "2px solid black",
          padding: "20px 20px 10px 20px",
          margin: "10px",
          borderRadius: "5px",
          boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
          transition: "all 0.3s ease",
          "&:hover": {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
          },
          "&:hover *": {
            fontSize: "larger",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: "20px",
            marginBottom: "30px",
          }}
        >
          <Announcement />
          <Typography>
            O dispositivo <b>{notification.generatedBy}</b> informa:
            {" " + notification.text}.
          </Typography>
        </Box>
        <Typography
          sx={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "flex-end",
          }}
        >
          {timeAgo}
        </Typography>
      </Box>
      <Modal open={isModalOpen} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "fit-content",
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            maxHeight: "90vh",
            overflowY: "auto",
          }}
        >
          <Typography variant="h4" mb="24px" textAlign="center">
            {generateTitle()}
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                <TableCellInfo
                  label="Dispositivo"
                  value={notification.generatedBy}
                />
                <TableCellInfo label="Alerta" value={notification.text} />
                <TableCellInfo
                  label="Criado em"
                  value={new Date(notification.createdAt).toLocaleString()}
                />
              </TableBody>
            </Table>
            {notification.type == AlertType.PRESENCE_ALERT_WITH_PHOTO && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  marginBottom: "10px",
                }}
              >
                <Typography variant="h6" mt="24px">
                  Foto do alerta
                </Typography>
                <img src={url} alt="Foto do alerta" />
              </Box>
            )}
          </TableContainer>
          <Button
            variant="contained"
            onClick={handleClose}
            sx={{ marginTop: "10px", selfAlign: "flex-end" }}
          >
            Close
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default Notification;
