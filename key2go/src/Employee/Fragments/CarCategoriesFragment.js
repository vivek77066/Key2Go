import React, { useState, useEffect } from "react";
import axios from "axios";
import { url } from "../../Commons/constants";
import { useNavigate } from "react-router-dom";
import "./CarCategoriesFragment.css";
import { Button } from "react-bootstrap";

const CarCategory = () => {
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [carCatImg, setCarCatImg] = useState(undefined);
  const [categoryName, setCategoryName] = useState("");
  const [showForm, setShowForm] = useState(false); // Controls form visibility

  useEffect(() => {
    GetAllCars();
  }, []);

  const GetAllCars = () => {
    axios.get(url + "/api/cars")
      .then((response) => {
        console.log("GetAllCars API Response:", response.data);
        setCars(Array.isArray(response.data) ? response.data : []);
      })
      .catch((error) => {
        console.error("Error fetching cars:", error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!carCatImg || !categoryName) {
      alert("Please fill in all fields.");
      return;
    }

    const data = new FormData();
    data.append("carCatImg", carCatImg);
    data.append("categoryName", categoryName);

    axios.post(url + "/api/cars", data)
      .then((response) => {
        if (response.data) {
          alert("Car added successfully");
          GetAllCars();
          setShowForm(false); // Close form after success
          setCategoryName(""); // Clear form inputs
          setCarCatImg(undefined);
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

  const deleteCar = (id) => {
    axios.delete(url + `/api/cars/${id}`)
      .then((res) => {
        if (res.data) {
          alert("Car deleted successfully");
          GetAllCars();
        } else {
          alert("Error while deleting");
        }
      })
      .catch((error) => {
        console.error("Error deleting car:", error);
        alert("Error while deleting");
      });
  };

  return (
    <div className="cccontainer">
      <h2>Car Company</h2>
      <hr />

      {/* Add New Car Button */}
      <button className="add-car-btn" onClick={handleAddCar}>Add New Car</button>

      {/* Form to Add New Car */}
      {showForm && (
        <div className="form-popup">
          <h3>Add New Car</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Car Name</label>
              <input type="text" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} required />
            </div>

            <div className="form-group">
              <label>Car Company Image</label>
              <input type="file" onChange={(e) => setCarCatImg(e.target.files[0])} accept="image/*" required />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn">Add</button>
              <button type="button" className="btn-close" onClick={handleCloseForm}>Close</button>
            </div>
          </form>
        </div>
      )}

      <h2>Available Cars</h2>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Car Company</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car) => (
            <tr key={car.carId}>
              <td>
                <img className="car-image" src={`${url}/${car.carCompanyId.carComImg}`} alt={car.carName} />
              </td>
              <td>{car.carCompanyId.companyName}</td>  
              <td>
                <button className="btn-delete" onClick={() => deleteCar(car.carId)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CarCategory;
