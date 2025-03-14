import axios from "axios";
import React, { useState } from "react";
import {  useNavigate } from "react-router-dom";
import { Header } from "../../Components/Header";
import { url } from "../../../Commons/constants";
import "./BookingForm.css"; 

const today = new Date().toISOString().split("T")[0];

const BookingForm = () => {
  const navigate = useNavigate();

  // Hooks must be at the top
  const [location] = useState("Ahmedabad"); // Removed setLocation
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [securityDeposit] = useState(1000); // Removed setSecurityDeposit

  // Retrieve session values
  const isActive = sessionStorage.getItem("isActive");
  const user = JSON.parse(sessionStorage.getItem("user"));
  const carCategory = isActive ? JSON.parse(sessionStorage.getItem("carCategory")) : null;

  // Prevent rendering if the user is inactive
  // if (!isActive) {
  //   return <Navigate to="/signin" />;
  // }

  const handleFromDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (selectedDate < tomorrow) {
      alert("From Date must be at least one day after today.");
      setFromDate("");
    } else {
      setFromDate(e.target.value);
    }
  };

  const handleToDateChange = (e) => {
    const selectedToDate = new Date(e.target.value);
    const selectedFromDate = new Date(fromDate);

    if (!fromDate) {
      alert("Please select From Date first.");
      setToDate("");
      return;
    }

    if (selectedToDate <= selectedFromDate) {
      alert("To Date must be after the From Date.");
      setToDate("");
    } else {
      const maxToDate = new Date(fromDate);
      maxToDate.setMonth(maxToDate.getMonth() + 1);

      if (selectedToDate > maxToDate) {
        alert("To Date cannot be more than 1 month after From Date.");
        setToDate("");
      } else {
        setToDate(e.target.value);
      }
    }
  };

  const AddDetailsToDB = async () => {
    if (!fromDate) {
      alert("Please select a From Date.");
      return;
    }
    if (!toDate) {
      alert("Please select a To Date.");
      return;
    }

    try {
      const data = new FormData();
      data.append("user", user.data.userid);
      data.append("carComId", carCategory.id);
      data.append("fromDate", fromDate);
      data.append("toDate", toDate);

      const response = await axios.post(`${url}/api/bookings`, data);
      if (response!=null) {
        alert("Booking Confirmed!");
        navigate("/");
      } else {
        alert("Error while booking.");
      }
    } catch (error) {
      console.error("Booking Error:", error);
      alert("An error occurred while processing your booking.");
    }
  };

  return (
    <div>
      <Header />
      <div className="container">
        <h1 className="title-header">Booking Form</h1>
        <hr />

        <h2>
          <u><b>Booking Details:</b></u>
        </h2>

        <div className="form-container">
          <div className="form-group">
            <label><b>Name:</b></label>
            <input type="text" className="form-control" value={user.data.username} readOnly />
          </div>

          <div className="form-group">
            <label><b>Email:</b></label>
            <input type="text" className="form-control" value={user.data.email} readOnly />
          </div>

          <div className="form-group">
            <label><b>Address:</b></label>
            <input type="text" className="form-control" value={user.data.address} readOnly />
          </div>

          <div className="form-group">
            <label><b>Car Category:</b></label>
            <input type="text" className="form-control" value={carCategory.categoryName} readOnly />
          </div>

          <div className="form-group">
            <label><b>From Date:</b></label>
            <input type="date" min={today} className="form-control" value={fromDate} onChange={handleFromDateChange} />
          </div>

          <div className="form-group">
            <label><b>To Date:</b></label>
            <input type="date" className="form-control" value={toDate} onChange={handleToDateChange} />
          </div>

          <div className="btn-group">
            <button onClick={AddDetailsToDB} className="btn btn-primary">Confirm Booking</button>
            <button onClick={() => navigate(-1)} className="btn btn-warning">Cancel Booking</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
