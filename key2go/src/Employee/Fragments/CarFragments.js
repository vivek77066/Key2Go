import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import "./CarFragments.css";
import { url } from "../../Commons/constants";

const Car = () => {
  const [cars, setCars] = useState([]);
  const [showRegister, setShowRegister] = useState(false);
  const [carCategory, setCarCategory] = useState(-1);
  const [carModel, setCarModel] = useState("");
  const [carNumber, setCarNumber] = useState("");
  const [carColor, setCarColor] = useState("");

  useEffect(() => {
    fetchCarCategories();
    fetchCars();
  }, []);

  const fetchCarCategories = async () => {
    try {
      const res = await axios.get(url + "/api/cars/company");
      if (Array.isArray(res.data)) {
        setCars(res.data);
      } else {
        setCars([]); // Ensure it's an array
        console.error("Unexpected response format:", res.data);
      }
    } catch (error) {
      console.error("Error fetching car categories:", error);
    }
  };

  const fetchCars = async () => {
    try {
      const response = await axios.get(url + "/api/cars");
      if (Array.isArray(response.data)) {
        setCars(response.data);
      } else {
        setCars([]);
        console.error("Unexpected response format:", response.data);
      }
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!carModel || !carNumber || !carColor) {
      alert("All fields are required");
      return;
    }
    const data = { carCategory, carModel, carNumber, carColor };

    try {
      const response = await axios.post(url + "/api/cars", data);
      if (response.data) {
        alert("Car added successfully");
        fetchCars(); // Refresh the car list
        handleClose(); // Close the modal after adding
      } else {
        alert("Error while adding car");
      }
    } catch (error) {
      alert("Error while adding car");
      console.error(error);
    }
  };

  const deleteCar = async (id) => {
    try {
      await axios.delete(url + `/api/cars/${id}`);
      alert("Car deleted successfully");
      fetchCars();
    } catch (error) {
      alert("Error while deleting car");
      console.error(error);
    }
  };

  const handleClose = () => {
    setShowRegister(false);
    setCarCategory(-1);
    setCarModel("");
    setCarNumber("");
    setCarColor("");
  };

  return (
    <div className="container">
      <h4 className="page-header">Cars</h4>
      <div className="fcard">
        <div className="card-header">Add New Car</div>
        <div className="card-body">
          <button onClick={() => setShowRegister(true)} className="btn btn-primary">
            Add Car
          </button>
          <Modal show={showRegister} onHide={handleClose}>
            <div className="modal-container">
              <form onSubmit={handleSubmit}>
                <h3 className="text-center">Add Car</h3>
                <button type="button" className="close-btn" onClick={handleClose}>
                  ✖
                </button>
                <div className="form-group">
                  <label>Car Category</label>
                  <select onChange={(e) => setCarCategory(e.target.value)} className="form-control">
                    <option value="">Select Category</option>
                    {Array.isArray(cars) &&
                      cars.map((car) => (
                        <option key={car.id} value={car.id}>
                          {car.categoryName}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Car Company</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Car Model"
                    value={carModel}
                    onChange={(e) => setCarModel(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Car Number</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Car Number"
                    value={carNumber}
                    onChange={(e) => setCarNumber(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Car Color</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Car Color"
                    value={carColor}
                    onChange={(e) => setCarColor(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-success w-100">
                  Add
                </button>
              </form>
            </div>
          </Modal>
        </div>
      </div>

      <h4>Available Cars</h4>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Car Name</th>
            <th>Car Company</th>
            <th>Car Number</th>
            <th>Car Color</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(cars) &&
            cars
              .map((car, index) => (
                <tr key={car.carId}>
                  <td>{index + 1}</td>
                  <td>{car.carName}</td>
                  <td>{car.carCompanyId.companyName}</td>
                  <td>{car.carNumber}</td>
                  <td>{car.carColor}</td>
                  <td>
                    <button className="btn btn-danger" onClick={() => deleteCar(car.carId)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
              .reverse()}
        </tbody>
      </table>
    </div>
  );
};

export default Car;
