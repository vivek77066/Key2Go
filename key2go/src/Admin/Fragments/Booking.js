import React, { useState, useEffect } from "react";
import axios from "axios";
import { url } from "../../Commons/constants";
import "./Booking.css"; // Import the CSS file

function Bookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get(url + "/api/bookings/all").then((response) => {
      const result = response.data;
      // console.log(result)
      if (result && Array.isArray(result)) {
        setBookings(result);
      } else {
        setBookings([]); // Prevents map() from breaking
        console.error("Unexpected API response format:", result);
      }
    });
  }, []);

  return (
    <div className="Admin_Booking_container">
      <h2 className="title-header">Bookings</h2>
      <hr />
      <div className="Admin_Booking_table-container">
        <table className="Admin_Booking_custom-table">
          <thead className="Admin_Booking_table">
            <tr>
              <th>Booking ID</th>
              <th>Car Name</th>
              <th>User Name</th>
              <th>From Date</th>
              <th>To Date</th>
              <th>Total Amount</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length > 0 ? (
              bookings.map((db) => (
                <tr key={db.bookingId}>
                  <td>{db.bookingId}</td>
                  <td>{db.car.carName}</td>
                  <td>{db.user.username}</td>
                  <td>{db.fromDate}</td>
                  <td>{db.toDate}</td>
                  <td>{db.totalAmount}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" style={{ textAlign: "center" }}>
                  No bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Bookings;
