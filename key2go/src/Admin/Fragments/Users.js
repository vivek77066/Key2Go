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
    axios.delete(url + "/api/users/" + id).then((res) => {
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
    axios.get(url + "/api/users/role/user").then((response) => {
      const result = response.data;
      if (Array.isArray(result)) {
        setUsers(result);
      } else {
        setUsers([]); // Set an empty array to prevent errors
      }
    });
  };

  return (
    <div className="User_container">
      <div className="page-heading">
        <h1 className="title">Users Overview</h1>
      </div>

      <h4>User List:</h4>
      <TableContainer component={Paper} className="table-container">
        <Table sx={{ minWidth: 700 }} className="Admin_customized_table">
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
            {Array.isArray(users) && users.length > 0 ? (
              users.map((db) => (
                <StyledTableRow key={db.id}>
                  <StyledTableCell align="center">
                    {db.username}
                  </StyledTableCell>
                  <StyledTableCell align="center">{db.phone}</StyledTableCell>
                  <StyledTableCell align="center">{db.email}</StyledTableCell>
                  <StyledTableCell align="center">{db.address}</StyledTableCell>
                  <StyledTableCell align="center">
                    <button
                      onClick={() => deleteUser(db.id)}
                      className="Delete_User"
                    >
                      Delete User
                    </button>
                  </StyledTableCell>
                </StyledTableRow>
              ))
            ) : (
              <StyledTableRow>
                <StyledTableCell colSpan={5} align="center">
                  No users found.
                </StyledTableCell>
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Users;
