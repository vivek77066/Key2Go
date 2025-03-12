import { url } from "../../Commons/constants";
import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import "./Users.css"; // Import CSS file

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  "&.MuiTableCell-head": {
    backgroundColor: "#000",
    color: "#fff",
  },
  "&.MuiTableCell-body": {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#f2f2f2",
  },
}));

const Users = () => {
  const [users, setUsers] = useState([]);

  const deleteUser = (id) => {
    axios.delete(url + "/user/" + id).then((res) => {
      const result = res.data;

      if (result.status === "success") {
        alert("User deleted successfully");
        GetAllUsers(); // Refresh the list after deletion
      } else {
        alert("Error while deleting User");
      }
    });
  };

  useEffect(() => {
    GetAllUsers();
  }, []);

  const GetAllUsers = () => {
    axios.get(url + "/user/role/user").then((response) => {
      const result = response.data;
      if (result.status === "success") {
        setUsers(result.data);
      } else {
        alert("Error while loading data");
      }
    });
  };

  return (
    <div className="container">
      <div className="page-heading">
        <h1 className="title">Users Overview</h1>
      </div>

      <h4>User List:</h4>
      <TableContainer component={Paper} className="table-container">
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">User Name</StyledTableCell>
              <StyledTableCell align="center">Phone</StyledTableCell>
              <StyledTableCell align="center">Email</StyledTableCell>
              <StyledTableCell align="center">Address</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((db) => (
              <StyledTableRow key={db.id}>
                <StyledTableCell align="center">{db.username}</StyledTableCell>
                <StyledTableCell align="center">{db.phone}</StyledTableCell>
                <StyledTableCell align="center">{db.email}</StyledTableCell>
                <StyledTableCell align="center">{db.address}</StyledTableCell>
                <StyledTableCell align="center">
                  <button
                    onClick={() => deleteUser(db.id)}
                    className="btn btn-warning"
                  >
                    Delete User
                  </button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Users;
