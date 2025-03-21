import React, { useState, useEffect } from "react";
import axios from "axios";
import { url } from "../../Commons/constants";
import { useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import "./CarCompanyFragment.css";
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

const CarCategory = () => {
  const navigate = useNavigate();
  const [carComImg1, setCarComImg1] = useState(undefined);
  const [carCompany , setCarCompany] = useState([])
  const [companyName, setCompanyName] = useState("");
  const [showForm, setShowForm] = useState(false); // Controls form visibility

  useEffect(() => {
    GetAllCompanies();
  }, []);

  const GetAllCompanies = () => {
    axios.get(url + "/api/cars/company")
      .then((response) => {
        setCarCompany(Array.isArray(response.data) ? response.data : []);
        
      })
      .catch((error) => {
        console.error("Error fetching cars:", error);
      });
  };
  const HandleDeleteCompany =
    async (id) => {
      try {
        await axios.delete(url + `/api/cars/company/${id}`);
        alert("Car Company deleted successfully");
        GetAllCompanies();
      } catch (error) {
        alert("Error while deleting...");
        console.error(error);
      }
    };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!carComImg1 || !companyName) {
      alert("Please fill in all fields.");
      return;
    }

    const data = new FormData();
    data.append("carComImg", carComImg1);
    data.append("companyName", companyName);
    console.log(data)

    axios.post(url + "/api/cars/Company", data)
      .then((response) => {
        if (response.data) {
          alert("Car Company added successfully");
          GetAllCompanies();
          setShowForm(false); // Close form after success
          setCompanyName(""); // Clear form inputs
          setCarComImg1(undefined);
        } else {
          alert("Error while adding");
        }
      })
      .catch((error) => {
        console.error("Error adding car:", error);
        alert("Error while adding");
      });
  };

  const handleAddCar = () => {
    setShowForm(true); // Show the form
  };

  const handleCloseForm = () => {
    setShowForm(false); // Hide the form
  };

  return (
    <div className="cccontainer">
      <h2>Car Company</h2>
      <hr />

      {/* Add New Car Button */}
      <button className="add-car-btn" onClick={handleAddCar}>Add New Company</button>

      {/* Form to Add New Car */}
      {showForm && (
        <div className="form-popup">
          <h3>Add New Company</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Car Company name</label>
              <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} required />
            </div>

            <div className="form-group">
              <label>Car Company Image</label>
              <input type="file" onChange={(e) => setCarComImg1(e.target.files[0])} accept="image/*" required />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn">Add</button>
              <button type="button" className="btn-close" onClick={handleCloseForm}>Close</button>
            </div>
          </form>
        </div>
      )}

      <h2>Available Companies</h2>
      <TableContainer component={Paper} className="emtable-container">
        <Table className="custom-table" sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Company Logo</StyledTableCell>
              <StyledTableCell align="center">Company Name</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {carCompany.map((db) => (
              console.log(db.carComImg),
              <StyledTableRow key={db.carCompanyId}>
                <StyledTableCell align="center"> <img
                    style={{ height: "300px", width: "400px" }}
                    src={url + "/" + db.carComImg}
                    alt={db.companyName}
                  /></StyledTableCell>
                <StyledTableCell align="center">{db.companyName}</StyledTableCell>
                <StyledTableCell align="center">
                  <button
                    onClick={() => HandleDeleteCompany(db.carCompanyId)}
                    className="details-btn"
                  >
                    Delete
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

export default CarCategory;
