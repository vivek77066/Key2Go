import React, { useState, useEffect } from "react";
import axios from "axios";
import { url } from "../../Commons/constants";
import { useNavigate } from "react-router-dom";
import "./CarCategoriesFragment.css";

const CarCategory = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [carType, setCarType] = useState([]);
  const [type, setType] = useState("");
  const [carCatImg, setCarCatImg] = useState(undefined);
  const [categoryName, setCategoryName] = useState("");
  const [seatCapacity, setSeatCapacity] = useState("");
  const [pricePerDay, setPricePerDay] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [airbag, setAirbag] = useState(false);

  useEffect(() => {
    axios.get(url + "/api/cars").then((res) => {
      console.log(res)
      setCarType(res.data);
    });
    GetAllCars();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!carCatImg || !categoryName || !seatCapacity || !pricePerDay || !fuelType || !type) {
      alert("Please fill in all fields.");
      return;
    }

    const data = new FormData();
    data.append("carType", type);
    data.append("carCatImg", carCatImg);
    data.append("categoryName", categoryName);
    data.append("seatCapacity", seatCapacity);
    data.append("pricePerDay", pricePerDay);
    data.append("fuelType", fuelType);

    axios.post(url + "/api/cars", data).then((response) => {
      if (response!=null) {
        alert("Car Category added successfully");
        GetAllCars();
      } else {
        alert("Error while adding");
      }
    });
  };

  const deleteCategory = (id) => {
    axios.delete(url + "/api/cars/" + id).then((res) => {
      if (res!=null) {
        alert("Car Category deleted successfully");
        GetAllCars();
      } else {
        alert("Error while deleting");
      }
    });
  };

  const GetAllCars = () => {
    axios.get(url + "/api/cars").then((response) => {
      if (response!=null) {
        setCategories(response.data.data);
      } else {
        alert("Error while loading data");
      }
    });
  };

  return (
    <div className="container">
      <h2>Car Variants</h2>
      <hr />
      <div className="form-container">
        <h3>Add New Category</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Category Name</label>
            <input type="text" onChange={(e) => setCategoryName(e.target.value)} required />
          </div>

          <div className="form-group">
            <label>Car Category Image</label>
            <input type="file" onChange={(e) => setCarCatImg(e.target.files[0])} accept="image/*" required />
          </div>

          <div className="form-group">
            <label>Car Type</label>
            <select onChange={(e) => setType(e.target.value)} required>
              <option value="">Select Car Type</option>
              {carType.map((car) => (
                <option key={car.id} value={car.id}>
                  {car.typeName}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Fuel Type</label>
            <select onChange={(e) => setFuelType(e.target.value)} required>
              <option value="">Select Fuel Type</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="CNG">CNG</option>
            </select>
          </div>

          <div className="form-group">
            <label>Seat Capacity</label>
            <input type="number" onChange={(e) => setSeatCapacity(e.target.value)} required />
          </div>

          <div className="form-group">
            <label>Price Per Day (Rs.)</label>
            <input type="number" onChange={(e) => setPricePerDay(e.target.value)} required />
          </div>

          <div className="form-group checkbox">
            <input type="checkbox" onChange={(e) => setAirbag(e.target.checked)} />
            <label>Airbag</label>
          </div>

          <button type="submit" className="btn">Add</button>
        </form>
      </div>

      <h2>Available Cars</h2>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Car Name</th>
            <th>Car Type</th>
            <th>Fuel Type</th>
            <th>Rental (Rs.)</th>
            <th>Seat Capacity</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((db) => (
            <tr key={db.id}>
              <td>
                <img className="car-image" src={`${url}/${db.carCatImg}`} alt={db.categoryName} />
              </td>
              <td>{db.categoryName}</td>
              <td>{db.typeName}</td>
              <td>{db.fuelType}</td>
              <td>{db.pricePerDay}</td>
              <td>{db.seatCapacity}</td>
              <td>
                <button className="btn-delete" onClick={() => deleteCategory(db.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CarCategory;
