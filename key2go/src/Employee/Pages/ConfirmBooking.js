import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Updated to use useNavigate
import { url } from "../../Commons/constants";
import axios from "axios";
import "./ConfirmBooking.css"; // Import normal CSS file
import { Cancel } from "@mui/icons-material";

function ConfirmBooking() {
  const location = useLocation();
  const navigate = useNavigate(); // Replaces useHistory

  const booking = location.state?.booking; // Retrieve the booking data safely

  if (!booking) {
      return <p>No booking data available.</p>; 
  }
  
    const confirmBooking = async () => {
      if(booking.status){
        alert("Confirmation is already done.")
      }else{
      try {
        const response = await axios.put(`${url}/api/bookings/${booking.bookingId}`, {
          status: true, 
        }, {
          headers: { "Content-Type": "application/json" }
        });
        navigate("/employee_dashboard")
      } catch (error) {
        console.error("Error updating booking:", error);
      }
      }
    };
    const Cancelbooking = async () =>{
      const userCancel = window.confirm("Are you sure you want to confirm this booking?");
      if(userCancel){
        try {
          const response = await axios.delete(`${url}/api/bookings/${booking.bookingId}`)
        
            navigate("/employee_dashboard")
          
          
        } catch (error) {
          console.error("Error updating booking:", error);
        }
      }else{
        alert("error while cancel booking...")
        navigate("/employee_dashboard")
      }
    
    }
    

  return (
    <div className="BDcontainer">
      <div className="BDrow">
        {/* Booking Details Section */}
        <div className="col-6 booking-details">
          <h1 className="BDtitle">Booking Details</h1>
          <div className="BDcard">
            <img src={`${url}/${booking.carCatImg}`} alt="Car" className="car-image" />
            <table className="BDtable">
              <tbody>
                <tr>
                  <th>Booking ID</th>
                  <td>{booking.bookingId}</td>
                  <th>User Name</th>
                  <td>{booking.userName}</td>
                </tr>
                <tr>
                  <th>From Date</th>
                  <td>{booking.fromDate}</td>
                  <th>To Date</th>
                  <td>{booking.toDate}</td>
                </tr>
                <tr>
                  <th>Car Variant</th>
                  <td>{booking.car.carName}</td>
                  <th>Price/Day</th>
                  <td>{booking.totalAmount} Rs.</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-6 booking-confirmation">
          <h1 className="BDtitle">Booking Confirmation</h1>
            <button type="submit" className="btn btn-primary" onClick={confirmBooking}>
              Confirm Booking
            </button>
            <button type="submit" className="btn btn-red" onClick={Cancelbooking}>
              Cancel Booking
            </button>
        </div>
        </div>

        
      </div>
    </div>
  );
}

export default ConfirmBooking;
