import React, { useState, useEffect } from "react";
import axios from "axios";
import { url } from "../../Commons/constants";
import "./Booking.css"; // Import the CSS file

function Bookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get(url + "/booking/").then((response) => {
      const result = response.data;
      if (result.status === "success") {
        setBookings(result.data);
      } else {
        alert("Error while loading data");
      }
    });
  }, []);

  return (
    <div className="container">
      <h2 className="title-header">Bookings</h2>
      <hr />
      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Car Variant</th>
              <th>Booking Date</th>
              <th>Pickup Location</th>
              <th>User Name</th>
              <th>Advance</th>
              <th>From Date</th>
              <th>To Date</th>
              <th>Total Amount</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((db) => (
              <tr key={db.id}>
                <td>{db.bookingid}</td>
                <td>{db.carVarient}</td>
                <td>{db.bookingDate}</td>
                <td>{db.location}</td>
                <td>{db.username}</td>
                <td>{db.securityDeposit}</td>
                <td>{db.fromDate}</td>
                <td>{db.toDate}</td>
                <td>{db.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Bookings;
