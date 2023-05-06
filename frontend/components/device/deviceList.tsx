import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  useTheme,
} from "@mui/material";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { IDevice } from "../../../types/device";
import backendApi from "../../lib/axios/backend_api";
import StickyFooter from "../stickyFooter";
import TopTab from "../topTab/topTab";
import { formatDistanceToNow } from "date-fns";

const DeviceList: NextPage<{ userId: number }> = ({ userId }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [devices, setDevices] = useState<IDevice[]>();

  const theme = useTheme();

  useEffect(() => {
    backendApi.get<IDevice[]>(`/device/user/${userId}`).then((response) => {
      setDevices(response.data);
    });
  }, [userId, setDevices]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100dvh",
      }}
    >
      <TopTab />
      <Paper
        sx={{
          flexGrow: 1,
          margin: "20px",
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
              {devices
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
          count={devices?.length || 0}
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
