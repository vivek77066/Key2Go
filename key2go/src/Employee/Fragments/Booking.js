import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { url } from "../../Commons/constants";
import "./Booking.css";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  "&.MuiTableCell-head": {
    backgroundColor: "#000",
    color: "#fff",
    fontWeight: "bold",
  },
  "&.MuiTableCell-body": {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#f5f5f5",
  },
}));

function Booking() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchBookings();
    fetchEmployees();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get(url + "/api/bookings/all");
      const result = response.data;

      if (result && Array.isArray(result)) {
        setBookings(result);
      } else {
        setBookings([]);
        console.error("Unexpected API response format for bookings:", result);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(url + "/api/users/role/employee");
      const result = response.data;
      if (result && Array.isArray(result)) {
        setEmployees(result);
      } else {
        setEmployees([]);
        console.error("Unexpected API response format for employees:", result);
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  return (
    <div className="embooking-container">
      <h2 className="emtitle-header">Bookings</h2>
      <hr />
      <TableContainer component={Paper} className="emtable-container">
        <Table className="custom-table" sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Booking ID</StyledTableCell>
              <StyledTableCell align="center">Car Variants</StyledTableCell>
              <StyledTableCell align="center">Booking Date</StyledTableCell>
              <StyledTableCell align="center">Pickup Location</StyledTableCell>
              <StyledTableCell align="center">User Name</StyledTableCell>
              <StyledTableCell align="center">Advance</StyledTableCell>
              <StyledTableCell align="center">From Date</StyledTableCell>
              <StyledTableCell align="center">To Date</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.map((db) => (
              <StyledTableRow key={db.bookingId}>
                <StyledTableCell align="center">{db.bookingId}</StyledTableCell>
                <StyledTableCell align="center">{db.car.carName}</StyledTableCell>
                <StyledTableCell align="center">
                  {new Date(db.fromDate).toDateString()}
                </StyledTableCell>
                <StyledTableCell align="center">{db.address}</StyledTableCell>
                <StyledTableCell align="center">{db.user.username}</StyledTableCell>
                <StyledTableCell align="center">{db.totalAmount / 2}</StyledTableCell>
                <StyledTableCell align="center">{db.fromDate}</StyledTableCell>
                <StyledTableCell align="center">{db.toDate}</StyledTableCell>
                <StyledTableCell align="center">
                  <button
                    onClick={() => navigate("/confirm_booking", { state: { booking: db } })}
                    className="details-btn"
                  >
                    Details
                  </button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

    </div>
  );
}

export default Booking;
