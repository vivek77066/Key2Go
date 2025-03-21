import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { url } from "../../../Commons/constants";
import BookingRow from "../../Components/BookingRow";
import Header from "../../Components/Header";
import "./MyBookings.css"; 

function MyBookings() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser); 
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
    setLoading(true);
    axios
      .get(url + "/api/bookings/user/" + user.userId)
      .then((response) => {
        const result = response.data;
        if (result) {
          // Check if result.data exists, if not use result directly
          const bookingsData = result.data || result;
          setBookings(Array.isArray(bookingsData) ? bookingsData : []);
          console.log("Bookings loaded:", bookingsData);
        } else {
          console.log("No bookings found or empty response");
          setBookings([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching bookings:", error);
        setBookings([]);
        alert("Error occurred while getting bookings. Please try again.");
      })
      .finally(() => {
        setLoading(false);
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
            // Check if result.data exists, if not use result directly
            const bookingDetails = result.data || result;
            navigate("/booking_details", {
              state: { bookingDetails: bookingDetails },
            });
          } else {
            alert("Error occurred while getting bookings");
          }
        })
        .catch((error) => {
          console.error("Error fetching booking details:", error);
          alert("Error occurred while getting booking details");
        });
    }
  };

  const cancelBooking = (booking) => {
    if (booking.status) {
      alert("Booking is confirmed , You Can not cancel it");
    } else {
      axios
        .delete(url + "/api/bookings/" + booking.bookingId)
        .then((response) => {
          const result = response.data;
          alert("Booking deleted successfully ...")
          navigate(-1)
        })
    }
  };

  if (!user) {
    return <h1 className="loading-text">Loading user data...</h1>; // Handle loading state
  }
  
  if (loading) {
    return <h1 className="loading-text">Loading bookings...</h1>;
  }

  return (
    <div className="my-bookings-container">
      <Header />
      <h1 className="title-header">My Bookings</h1>
      <hr />
      <div className="nav-container">
        {bookings.length === 0 ? (
          <div className="no-bookings-message">
            <p>You don't have any bookings yet.</p>
          </div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Customer Name</th>
                <th>Car Name</th>
                <th>From Date</th>
                <th>To Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <BookingRow
                  key={booking.bookingId}
                  booking={booking}
                  deleteBooking={cancelBooking}
                  bookingDetail={bookingDetail}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default MyBookings;