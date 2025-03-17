import React, { useState, useEffect } from "react";
import axios from "axios";
import { url } from "../../Commons/constants";
import { useNavigate } from "react-router-dom";
import "./CarCompanyFragment.css";
import { Button } from "react-bootstrap";

const CarCategory = () => {
  const navigate = useNavigate();
  const [carComImg, setCarComImg] = useState(undefined);
  const [carCompany , setCarCompany] = useState([])
  const [companyName, setCompanyName] = useState("");
  const [showForm, setShowForm] = useState(false); // Controls form visibility

  useEffect(() => {
    GetAllCompanies();
  }, []);

  const GetAllCompanies = () => {
    axios.get(url + "/api/cars/company")
      .then((response) => {
        console.log("GetAllCars API Response:", response.data);
        setCarCompany(Array.isArray(response.data) ? response.data : []);
      })
      .catch((error) => {
        console.error("Error fetching cars:", error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!carComImg || !companyName) {
      alert("Please fill in all fields.");
      return;
    }

    const data = new FormData();
    data.append("carComImg", carComImg);
    data.append("companyName", companyName);
    console.log(data)

    axios.post(url + "/api/cars/Company", data)
      .then((response) => {
        if (response.data) {
          alert("Car added successfully");
          GetAllCompanies();
          setShowForm(false); // Close form after success
          setCompanyName(""); // Clear form inputs
          setCarComImg(undefined);
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
              <input type="file" onChange={(e) => setCarComImg(e.target.files[0])} accept="image/*" required />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn">Add</button>
              <button type="button" className="btn-close" onClick={handleCloseForm}>Close</button>
            </div>
          </form>
        </div>
      )}

      <h2>Available Companies</h2>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Car Company</th>
          </tr>
        </thead>
        <tbody>
          {carCompany.map((company) => (
            <tr key={company.carCompanyId}>
              <td>
                <img className="car-image" src={`${url}/${company.carCompanyId.carComImg}`} alt={company.carName} />
              </td>
              <td>{company.companyName}</td>  
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CarCategory;
