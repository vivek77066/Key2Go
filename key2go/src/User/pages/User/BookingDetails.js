import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import Header from "../../Components/Header";
import { url } from "../../../Commons/constants";
import axios from "axios";
import "./BookingDetails.css"; 

function BookingDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const [booking, setBooking] = useState({});
  const conBooking = location.state?.bookingDetails;

  const bookingData = Array.isArray(conBooking) && conBooking.length > 0 ? conBooking[0] : null;


  useEffect(() => {
    if (!bookingData || !bookingData.bookingId) {
      console.error("Invalid booking data:", bookingData);
      return;
    }

    axios
      .get(`${url}/api/bookings/${bookingData.bookingId}`)
      .then((response) => {
        console.log("API Response:", response.data);
        if (response.data) {
          setBooking(response.data.data || response.data);
          sessionStorage.setItem("conBooking", JSON.stringify(response.data.data || response.data));
        } else {
          console.error("Error: No booking data received");
          alert("Error occurred while getting bookings");
        }
      })
      .catch((error) => {
        console.error("Error fetching booking details:", error);
      });
  }, [bookingData]);

  return (
    <div>
      <Header />
      <div className="user_card_container">
        <h1 className="title-header">Booking Details</h1>

        {booking && booking.bookingId ? (
          <table className="booking-table">
            <thead>
              <tr>
                <th colSpan="4" className="table-header">Car Image</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="4" className="card_image_container">
                <img
                    style={{ height: "300px", width: "400px" }}
                    src={url + "/" + booking.carCatImg}
                    alt="Car"
                  />
                </td>
              </tr>
              <tr>
                <th>Booking ID</th>
                <td>{booking.bookingId}</td>
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
                <th>Car Name</th>
                <td>{booking.carName}</td>
                <th>Price/Day</th>
                <td>{booking.car?.rentPerDay}</td>
              </tr>
              <tr>
                <th>Bill Amount</th>
                <td>{booking.totalAmount} Rs.</td>
              </tr>
            </tbody>
          </table>
        ) : (
          <p className="loading-text">Loading booking details...</p>
        )}

        <button
          id="btn_back"
          type="button"
          onClick={() => navigate(-1)}
          className="card_back_button"
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default BookingDetails;
