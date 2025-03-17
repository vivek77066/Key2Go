import React from "react";
import "./CarCard.css"; // Import the normal CSS file

const CarCard = ({ car, onCarClick }) => {
  return (
    <div className="car-card" onClick={() =>{ onCarClick(car.carId); console.log(car.carId) }}>
      <img src={car.imageUrl} alt={car.name} className="car-image" />
      <h3>{car.carName}</h3>
      <p>Fuel Type: {car.fuelType}</p>
      <p>Rent per Day: {car.rentPerDay} Rs.</p>
      <p>Seating Capacity: {car.seatingCapacity}</p>
    </div>
  );
};

export default CarCard;
