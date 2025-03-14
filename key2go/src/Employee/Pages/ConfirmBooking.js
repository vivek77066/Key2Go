import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Updated to use useNavigate
import { url } from "../../Commons/constants";
import axios from "axios";
import "./ConfirmBooking.css"; // Import normal CSS file

function ConfirmBooking() {
  const location = useLocation();
  const booking = location.state.booking;
  const [category, setCategory] = useState([]);
  const [car, setCar] = useState(-1);
  const navigate = useNavigate(); // Replaces useHistory

  useEffect(() => {
    axios.get(`${url}/car/${booking.categoryId}`).then((response) => {
      const result = response.data;
      if (result.status === "success" && result.data.length > 0) {
        setCategory(result.data);
        setCar(result.data[0].carId);
      } else {
        alert("Error fetching car data");
      }
    });
  }, [booking.categoryId]);

  const confirmBooking = (e) => {
    e.preventDefault();
    if (car === -1) {
      alert("Select a Car");
    } else {
      const data = new FormData();
      data.append("car", car);
      data.append("status", true);

      axios.put(`${url}/booking/${booking.bookingid}`, data).then((response) => {
        const result = response.data;
        if (result.status === "success") {
          alert("Booking Confirmed");
          navigate(-1); // Replaces history.goBack()
        } else {
          alert("Booking Failed");
        }
      });
    }
  };

  return (
    <div className="container">
      <div className="row">
        {/* Booking Details Section */}
        <div className="col-6 booking-details">
          <h1 className="title">Booking Details</h1>
          <div className="card">
            <img src={`${url}/${booking.carCatImg}`} alt="Car" className="car-image" />
            <table className="table">
              <tbody>
                <tr>
                  <th>Booking ID</th>
                  <td>{booking.bookingid}</td>
                  <th>User Name</th>
                  <td>{booking.username}</td>
                </tr>
                <tr>
                  <th>From Date</th>
                  <td>{booking.fromDate}</td>
                  <th>To Date</th>
                  <td>{booking.toDate}</td>
                </tr>
                <tr>
                  <th>Car Variant</th>
                  <td>{booking.carVarient}</td>
                  <th>Price/Day</th>
                  <td>{booking.pricePerDay} Rs.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Booking Confirmation Section */}
        <div className="col-6 booking-confirmation">
          <h1 className="title">Booking Confirmation</h1>
          <form onSubmit={confirmBooking} className="form-container">
            <div className="form-group">
              <label>Select Car</label>
              <select
                onChange={(e) => setCar(e.target.value)}
                className="form-control"
              >
                <option value="-1">Select Car</option>
                {category.map((car) => (
                  <option key={car.carId} value={car.carId}>
                    {car.carNumber}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="btn btn-primary">
              Confirm Booking
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ConfirmBooking;
