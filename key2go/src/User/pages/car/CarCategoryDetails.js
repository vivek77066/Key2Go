import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import  Header  from "../../Components/Header";
import { url } from "../../../Commons/constants";
import './CarCategoryDetails.css'

function CarCategoryDetails() {
  const location = useLocation();
  const navigate = useNavigate(); // Replaces useHistory()
  const cars = location.state?.carCategory || [];

  const handleBookNow = (car) => {
    let isActive = sessionStorage.getItem("isActive");

    // Store selected carCategory only once
    sessionStorage.setItem("carCategory", JSON.stringify(car));

    if (isActive) {
      navigate("/book_car");
    } else {
      navigate("/signin");
    }
  };

  return (
    <div>
      <Header />
      <h1 className="title-header">Car Category Details</h1>

      <div className="car-details-container">
        {cars.map((car, index) => (
          <div key={index} className="car-card">
            <h2 className="car-title">{car.categoryName}</h2>
            
            <img 
              className="car-image" 
              src={`${url}/${car.carCatImg}`} 
              alt={`${car.categoryName}`} 
            />

            <table className="car-table">
              <tbody>
                <tr>
                  <td><b>Seat/Capacity:</b></td>
                  <td>{car.seatCapacity} Seats</td>
                </tr>
                <tr>
                  <td><b>Fuel Type:</b></td>
                  <td>{car.fuelType}</td>
                </tr>
                <tr>
                  <td><b>Price Per Day:</b></td>
                  <td>₹{car.pricePerDay}/day</td>
                </tr>
              </tbody>
            </table>

            <button className="btn btn-warning book-now-btn" onClick={() => handleBookNow(car)}>
              <b>Book Now</b>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CarCategoryDetails;
