import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { url } from "../../../Commons/constants";
import BookingRow from "../../Components/BookingRow";
import { Header } from "../../Components/Header";
import "./MyBookings.css"; // Importing the CSS file

function MyBookings() {
  let user = JSON.parse(sessionStorage.getItem("user"));

  console.log(user.data);
  const [bookings, setBookings] = useState([]);
  const history = useNavigate();

  useEffect(() => {
    getBookings();
  }, []);

  const getBookings = () => {
    axios.get(url + "/booking/findByUser/" + user.data.userid).then((response) => {
      const result = response.data;
      if (result.status === "success") {
        setBookings(result.data);
        console.log("After API call ->", result);
      } else {
        alert("Error occurred while getting all car categories");
        console.error(result.error);
      }
    });
  };

  const bookingDetail = (booking) => {
    if (!booking.status) {
      alert("Booking is not confirmed yet...!");
    } else {
      axios.get(url + "/booking/" + booking.bookingid).then((response) => {
        const result = response.data;
        if (result.status === "success") {
          console.log(result);
          history.push("/booking_details", {
            bookingDetails: result.data,
          });
        } else {
          alert("Error occurred while getting bookings");
        }
      });
    }
  };

  const cancelBooking = (booking) => {
    console.log(booking);
    if (booking.status) {
      alert("Booking is confirmed");
    } else {
      axios.delete(url + "/booking/" + booking.bookingid).then((response) => {
        const result = response.data;
        if (result.status === "success") {
          console.log(result.status);
          alert("Booking cancelled");
          window.location.reload();
        } else {
          alert("Error occurred while canceling bookings");
          console.error(result.error);
        }
      });
    }
  };

  return (
    <div className="my-bookings-container">
      <Header />
      <h1 className="title-header">My Bookings</h1>
      <hr />
      <div className="nav-container">
        <table className="table">
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Customer Name</th>
              <th>Car Name</th>
              <th>From Date</th>
              <th>To Date</th>
              <th>Booking Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <BookingRow
                key={booking.bookingid}
                booking={booking}
                deleteBooking={cancelBooking}
                bookingDetail={bookingDetail}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MyBookings;
