import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Header } from "../../Components/Header";
import { url } from "../../../Commons/constants";
import axios from "axios";
import "./BookingDetails.css"; // Import the CSS file

function BookingDetails() {
  const location = useLocation();
  const history = useNavigate();
  const [booking, setBooking] = useState({});
  const conBooking = location.state?.bookingDetails;

  useEffect(() => {
    if (!conBooking) return;

    axios.get(url + "/booking/cb/" + conBooking.bookingid).then((response) => {
      const result = response.data;
      if (result.status === "success") {
        setBooking(result.data);
        sessionStorage.setItem("conBooking", JSON.stringify(result));
      } else {
        alert("Error occurred while getting bookings");
      }
    });
  }, [conBooking]);

  return (
    <div>
      <Header />
      <div className="card container">
        <h1 className="title-header">Booking Details</h1>

        {booking && booking.bookingid ? (
          <table className="booking-table">
            <thead>
              <tr>
                <th colSpan="4" className="table-header">Car Image</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="4" className="image-container">
                  <img
                    className="car-image"
                    src={url + "/" + booking.carCatImg}
                    alt="Car"
                  />
                </td>
              </tr>
              <tr>
                <th>Booking ID</th>
                <td>{booking.bookingid}</td>
                <th>Car Number</th>
                <td>{booking.carNumber}</td>
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
                <td>{booking.pricePerDay}</td>
              </tr>
              <tr>
                <th>Pick-Up Location</th>
                <td>{booking.location}</td>
                <th>No. of Days</th>
                <td>{booking.totalDays}</td>
              </tr>
              <tr>
                <th>Bill Amount</th>
                <td>{booking.amount} Rs.</td>
                <th>Advance Pay</th>
                <td>{booking.securityDeposit} Rs.</td>
              </tr>
            </tbody>
          </table>
        ) : (
          <p className="loading-text">Loading booking details...</p>
        )}

        <button
          id="btn_back"
          type="button"
          onClick={history.goBack}
          className="back-button"
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default BookingDetails;
