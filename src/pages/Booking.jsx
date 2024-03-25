import { useContext, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/userAuthentication/AuthProvider";
import AuthModal from "../components/userAuthentication/AuthModal";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteBooking,
  fetchAllBookings,
  updateBooking,
} from "../features/bookings/bookingsSlice";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  MRT_EditActionButtons,
  MaterialReactTable,
  // createRow,
  useMaterialReactTable,
} from "material-react-table";
import {
  Box,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@mui/material";

export default function Booking() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser, identity } = useContext(AuthContext);
  const bookings = useSelector((state) => state.bookings.bookings);

  useEffect(() => {
    dispatch(fetchAllBookings());
  }, [dispatch, currentUser]);

  const statusSelectOptions = ["Pending", "Confirmed", "Rejected", "Completed"];

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "Id",
        enableEditing: false,
        size: 80,
      },
      {
        accessorKey: "room.title",
        header: "Room Name",
        enableEditing: false,
        size: 150,
      },
      {
        accessorKey: "contact_name",
        header: "Contact Name",
        enableEditing: identity && !identity.is_admin,
        size: 150,
      },
      {
        accessorKey: "phone_number",
        header: "Phone Number",
        enableEditing: identity && !identity.is_admin,
        size: 150,
      },
      {
        accessorKey: "booking_date",
        header: "Date",
        enableEditing: false,
        size: 150,
      },
      {
        accessorKey: "booking_time",
        header: "Time",
        enableEditing: false,
        size: 150,
      },
      {
        accessorKey: "status",
        header: "Status",
        editVariant: "select",
        editSelectOptions: statusSelectOptions,
        enableEditing: identity && identity.is_admin,
        size: 150,
      },
      // {
      //   accessorKey: "created_at",
      //   header: "Creation Time",
      //   size: 150,
      // },
      // {
      //   accessorKey: "updated_at",
      //   header: "Last Updated Time",
      //   size: 150,
      // },
    ],
    [identity]
  );

  const handleUpdateBooking = async ({ values, table }) => {
    console.log({values})
    dispatch(updateBooking(values));
    table.setEditingRow(null);
  };

  const openDeleteConfirmModal = (row) => {
    const booking_id = row.id
    console.log({row})
    console.log({booking_id})
    if (window.confirm("Are you sure you want to delete this booking?")) {
      dispatch(deleteBooking(booking_id))
    }
  };

  const table = useMaterialReactTable({
    columns,
    data: bookings,
    editDisplayMode: "modal",
    enableEditing: true,
    getRowId: (row) => row.id,
    onEditingRowSave: handleUpdateBooking,
    renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h6">Edit Booking</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          {internalEditComponents} {/* or render custom edit components here */}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),

    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Tooltip title="Edit">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        {!identity.is_admin && (
          <Tooltip title="Delete">
            <IconButton
              color="error"
              onClick={() => openDeleteConfirmModal(row)}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        )}
      </Box>
    ),
  });

  if (!currentUser) {
    return <AuthModal show="login" onHide={() => navigate("/")} />;
  }

  return <MaterialReactTable table={table} />;
}
