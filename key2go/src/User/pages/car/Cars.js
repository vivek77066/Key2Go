import { url } from "../../../Commons/constants";
import { useNavigate } from "react-router-dom"; // Updated for React Router v6
import { useState, useEffect } from "react";
import axios from "axios";
import CarCard from "../../Components/CarCard";
import { Header } from "../../Components/Header";
import "./Cars.css"; // Import the normal CSS file

const Cars = () => {
  const [cars, setCars] = useState([]);
  const navigate = useNavigate(); // useNavigate() replaces useHistory()

  useEffect(() => {
    console.log("🚗 Cars component mounted.");
    fetchAllCars();
  }, []);

  const fetchAllCars = async () => {
    try {
      const response = await axios.get(`${url}/api/cars`);
      const result = response.data;
      if (result!=null) {
        setCars(result);
      } else {
        alert("⚠️ Error while loading car categories.");
      }
    } catch (error) {
      console.error("🚨 API Error (fetchAllCars):", error);
    }
  };

  const handleCarCategoryClick = async (car) => {
    try {
      const response = await axios.get(`${url}/api/cars${car.id}`);
      const result = response.data;

      if (result!=null) {
        console.log("✅ Fetched car category:", result);
        navigate("/cars-category-details", { state: { carCategory: result } });
      } else {
        alert("⚠️ Error occurred while fetching car category details.");
      }
    } catch (error) {
      console.error("🚨 API Error (handleCarCategoryClick):", error);
    }
  };

  return (
    <div className="cars-container">
      <Header />
      <h1 className="title-header">Car Categories</h1>

      <CarCard onItemSelect={handleCarCategoryClick} cars={cars} />
    </div>
  );
};

export default Cars;
