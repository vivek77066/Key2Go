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

  useEffect(() => {
    axios.get(url + "/api/bookings/all").then((response) => {
      const result = response.data;
      // console.log(result)
      if (result && Array.isArray(result)) {
        setBookings(result);
      } else {
        setBookings([]);  // Prevents map() from breaking
        console.error("Unexpected API response format:", result);
      }
      
    });
  }, []);

  return (
    <div className="booking-container">
      <h2 className="title-header">Bookings</h2>
      <hr />
      <TableContainer component={Paper} className="table-container">
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
              <StyledTableCell align="center"></StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.map((db) => (
              <StyledTableRow key={db.bookingId}>
                <StyledTableCell align="center">{db.bookingId}</StyledTableCell>
                <StyledTableCell align="center">{db.carVarient}</StyledTableCell>
                <StyledTableCell align="center">
                  {new Date(db.bookingDate).toDateString()}
                </StyledTableCell>
                <StyledTableCell align="center">{db.location}</StyledTableCell>
                <StyledTableCell align="center">{db.username}</StyledTableCell>
                <StyledTableCell align="center">{db.securityDeposit}</StyledTableCell>
                <StyledTableCell align="center">{db.fromDate}</StyledTableCell>
                <StyledTableCell align="center">{db.toDate}</StyledTableCell>
                <StyledTableCell align="center">{db.secondPayStatus}</StyledTableCell>
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
