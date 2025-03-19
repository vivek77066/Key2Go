import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { url } from "../../../Commons/constants";
import BookingRow from "../../Components/BookingRow";
import Header from "../../Components/Header";
import "./MyBookings.css"; // Importing the CSS file

function MyBookings() {
  const navigate = useNavigate();

  // 🔹 Use useState for user to handle delay in session storage retrieval
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);

  // 🔹 Fetch user from session storage when the component mounts
  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser); // Set user after retrieval
    } else {
      alert("User not found. Please log in again.");
      navigate("/login"); // Redirect to login if no user found
    }
  }, [navigate]);

  // 🔹 Call getBookings only when user is available
  useEffect(() => {
    if (user) {
      getBookings();
    }
  }, [user]);

  const getBookings = () => {
    axios
      .get(url + "/api/bookings/user/" + user.userId)
      .then((response) => {
        const result = response.data;
        if (result) {
          setBookings(result.data);
          console.log(result.data);
        } else {
          alert("Error occurred while getting all bookings.");
        }
      })
      .catch((error) => {
        console.error("Error fetching bookings:", error);
      });
  };

  const bookingDetail = (booking) => {
    if (!booking.status) {
      alert("Booking is not confirmed yet...!");
    } else {
      axios
        .get(url + "/api/bookings/user/" + booking.user.userId)
        .then((response) => {
          const result = response.data;
          if (result) {
            console.log(result);
            navigate("/booking_details", {
              state: { bookingDetails: result.data },
            });
          } else {
            alert("Error occurred while getting bookings");
          }
        });
    }
  };

  const cancelBooking = (booking) => {
    if (booking.status) {
      alert("Booking is confirmed");
    } else {
      axios
        .delete(url + "/api/bookings/user/" + booking.user.userId)
        .then((response) => {
          const result = response.data;
          if (result) {
            alert("Booking cancelled");
            setBookings(bookings.filter((b) => b.bookingid !== booking.bookingid)); // Update state instead of reload
          } else {
            alert("Error occurred while canceling bookings");
          }
        })
        .catch((error) => {
          console.error("Error canceling booking:", error);
        });
    }
  };

  if (!user) {
    return <h1 className="loading-text">Loading user data...</h1>; // Handle loading state
  }
  

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
