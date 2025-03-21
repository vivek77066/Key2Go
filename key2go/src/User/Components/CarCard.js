import React from "react";
import "./CarCard.css"; // Import the normal CSS file

const CarCard = ({ car, onCarClick }) => {
  return (
    <div className="CarCard_card" onClick={() => { onCarClick(car.carId); }}>
      <img src={car.imageUrl} alt={car.carName} className="CarCard_image" />
      <div className="CarCard_info">
        <h3>{car.carName}</h3>
        <p>Fuel Type: {car.fuelType}</p>
        <p>Rent per Day: {car.rentPerDay} Rs.</p>
        <p>Seating Capacity: {car.seatingCapacity}</p>
      </div>
    </div>
  
  );
};

export default CarCard;
