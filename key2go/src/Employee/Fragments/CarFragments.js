import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import "./CarFragments.css"; // Import the CSS file

const Car = () => {
  const [cars, setCars] = useState([]);
  const [showRegister, setShowRegister] = useState(false);
  const [carCategory, setCarCategory] = useState(-1);
  const [carModel, setCarModel] = useState("");
  const [carNumber, setCarNumber] = useState("");
  const [carColor, setCarColor] = useState("");

  useEffect(() => {
    fetchCarCategories();
  }, []);

  const fetchCarCategories = () => {
    axios.get("YOUR_API_URL/carCategory/").then((res) => {
      setCars(res.data.data);
    });
  };

  const fetchCars = () => {
    axios.get("YOUR_API_URL/car/").then((response) => {
      if (response.data.status === "success") {
        setCars(response.data.data);
      } else {
        alert("Error while loading data");
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!carModel || !carNumber || !carColor) {
      alert("All fields are required");
      return;
    }
    const data = { carCategory, carModel, carNumber, carColor };
    axios.post("YOUR_API_URL/car/", data).then((response) => {
      if (response.data.status === "success") {
        alert("Car added successfully");
        setShowRegister(false);
        fetchCars();
      } else {
        alert("Error while adding car");
      }
    });
  };

  const deleteCar = (id) => {
    axios.delete(`YOUR_API_URL/car/${id}`).then((res) => {
      if (res.data.status === "success") {
        alert("Car deleted successfully");
        fetchCars();
      } else {
        alert("Error while deleting car");
      }
    });
  };

  return (
    <div className="container">
      <h4 className="page-header">Cars</h4>
      <div className="card">
        <div className="card-header">Add New Car</div>
        <div className="card-body">
          <button onClick={() => setShowRegister(true)} className="btn btn-primary">
            Add Car
          </button>
          <Modal show={showRegister} onHide={() => setShowRegister(false)}>
            <div className="modal-container">
              <form onSubmit={handleSubmit}>
                <h3 className="text-center">Add Car</h3>
                <div className="form-group">
                  <label>Car Category</label>
                  <select onChange={(e) => setCarCategory(e.target.value)} className="form-control">
                    <option value="">Select Category</option>
                    {cars.map((car) => (
                      <option key={car.id} value={car.id}>
                        {car.categoryName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Car Model</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Car Model"
                    onChange={(e) => setCarModel(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Car Number</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Car Number"
                    onChange={(e) => setCarNumber(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Car Color</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Car Color"
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
            <th>Car Model</th>
            <th>Car Number</th>
            <th>Car Color</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car, index) => (
            <tr key={car.carId}>
              <td>{index + 1}</td>
              <td>{car.carName}</td>
              <td>{car.carModel}</td>
              <td>{car.carNumber}</td>
              <td>{car.carColor}</td>
              <td>
                <button className="btn btn-danger" onClick={() => deleteCar(car.carId)}>
                  Delete
                </button>
              </td>
            </tr>
          )).reverse()}
        </tbody>
      </table>
    </div>
  );
};

export default Car;
