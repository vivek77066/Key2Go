import React from "react";
import "./CarCard.css";
import { url } from "../../Commons/constants";

const CarCard = ({ cars, onItemSelect }) => {
  return (
    <div className="car-card-container">
      {cars.map((car, index) => (
        <div
          key={index}
          className="car-card"
          onClick={() => onItemSelect(car)}
        >
          <table className="car-table">
            <tbody>
              <tr className="car-info">
                <td>
                  <div className="car-fuel-type">{car.fuelType}</div>
                </td>
                <td>
                  <div className="car-seat-capacity">{car.seatCapacity} Seats</div>
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  <img
                    src={`${url}/${car.carCatImg}`}
                    className="car-image"
                    alt="Car Category"
                  />
                </td>
              </tr>
              <tr className="car-info">
                <td>
                  <div className="car-details">
                    <div className="car-type">{car.typeName}</div>
                    <div className="car-category">{car.categoryName}</div>
                  </div>
                </td>
                <td>
                  <div className="car-price">{car.pricePerDay}/Day</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default CarCard;
