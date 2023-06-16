import {
  Box,
  Button,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  useTheme,
} from "@mui/material";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { IDevice } from "../../../types/device";
import backendApi from "../../lib/axios/backend_api";
import StickyFooter from "../stickyFooter";
import TopTab from "../topTab/topTab";
import { formatDistanceToNow } from "date-fns";
import { Add, Send } from "@mui/icons-material";
import { useAuth } from "../../hooks/useAuth";
import { useSWRClient } from "../../hooks/useSwrClient";

const DeviceList: NextPage<{ userId: number }> = ({ userId }) => {
  // show modal for creating device
  const [showCreateDevice, setShowCreateDevice] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  //const [devices, setDevices] = useState<IDevice[]>();
  const theme = useTheme();

  const { data, isLoading, mutateAndRefetch } = useSWRClient<IDevice[]>(
    `/device/user/${userId}`
  );

  const CreateDevice = () => {
    const { isAuth, id } = useAuth();
    const handleCreateDevice = async (
      event: React.FormEvent<HTMLFormElement>
    ) => {
      event.preventDefault();
      const form = new FormData(event.currentTarget);
      const name = form.get("name") as string;
      try {
        await backendApi.post("/device", { name, userId: id });
        setShowCreateDevice(false);
        mutateAndRefetch();
      } catch (error) {
        console.log(error);
      }
    };
    return (
      <Box
        sx={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "50dvw",
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Box
          component="form"
          onSubmit={handleCreateDevice}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            name="name"
            label="Device name"
            type="text"
            id="name"
            autoComplete="current-device-name"
          />
          <Button
            startIcon={<Send />}
            variant="contained"
            type="submit"
            sx={{ alignSelf: "flex-end", marginTop: "20px" }}
          >
            Create
          </Button>
        </Box>
      </Box>
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100dvh",
      }}
    >
      <TopTab />
      <Button
        onClick={() => {
          setShowCreateDevice(true);
        }}
        variant="contained"
        startIcon={<Add />}
        sx={{ margin: "20px", width: "fit-content", alignSelf: "flex-end" }}
      >
        Create Device
      </Button>
      <Modal open={showCreateDevice} onClose={() => setShowCreateDevice(false)}>
        <CreateDevice />
      </Modal>
      <Paper
        sx={{
          flexGrow: 1,
          margin: "0px 20px 20px 20px",
          width: "auto",
          border: `1px solid ${theme.palette.primary.main}`,
          borderRadius: "16px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
        elevation={4}
      >
        <TableContainer
          sx={{
            borderRadius: "16px",
          }}
          component={Box}
        >
          <Table>
            <TableHead
              sx={{
                backgroundColor: theme.palette.primary.dark,
                color: theme.palette.primary.contrastText,
              }}
            >
              <TableRow
                sx={{
                  "& > *": {
                    fontWeight: "bold",
                  },
                  textTransform: "uppercase",
                }}
              >
                <TableCell>Uuid</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Created</TableCell>
                <TableCell>Last Updated</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((device) => (
                  <TableRow key={device.uuid}>
                    <TableCell>{device.uuid}</TableCell>
                    <TableCell>{device.name}</TableCell>
                    <TableCell>
                      {formatDistanceToNow(new Date(device.createdAt), {
                        addSuffix: true,
                      })}
                    </TableCell>
                    <TableCell>
                      {formatDistanceToNow(new Date(device.lastUpdatedAt), {
                        addSuffix: true,
                      })}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[1, 10, 25, 100]}
          component="div"
          count={data?.length || 0}
          page={page}
          onPageChange={(event, page) => {
            setPage(page);
          }}
          onRowsPerPageChange={(event) => {
            setRowsPerPage(parseInt(event.target.value));
            setPage(0);
          }}
        />
      </Paper>
      <StickyFooter />
    </Box>
  );
};

export default DeviceList;
