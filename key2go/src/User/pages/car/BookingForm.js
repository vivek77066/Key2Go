"use client"

import axios from "axios"
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Header from "../../Components/Header"
import { url } from "../../../Commons/constants"
import "./BookingForm.css"

const today = new Date().toISOString().split("T")[0]

const BookingForm = () => {
  const navigate = useNavigate()
  const { carId } = useParams()

  const [fromDate, setFromDate] = useState("")
  const [toDate, setToDate] = useState("")
  const [car, setCar] = useState([])
  const [loading, setLoading] = useState(true) // Start with loading true

  // Retrieve session values
  const isActive = sessionStorage.getItem("isActive")
  const user = JSON.parse(sessionStorage.getItem("user"))

  useEffect(() => {
    // Authentication check - do this first before any other operations
    if (!user || !isActive) {
      // If user is not in session or not active, redirect to signin
      navigate("/signin")
      return // Important: exit early to prevent further execution
    }

    // Only fetch car details if user is authenticated
    const fetchCarDetails = async () => {
      try {
        const response = await axios.get(`${url}/api/cars/${carId}`)
        setCar(response.data)
      } catch (error) {
        console.error("Error fetching car details:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCarDetails()
  }, [carId, isActive, user, navigate])

  // If still checking authentication or loading data, show loading state
  if (loading) {
    return <h1>Loading....</h1>
  }

  // If we get here, user must be authenticated, so render the form
  const handleFromDateChange = (e) => {
    const selectedDate = new Date(e.target.value)
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)

    if (selectedDate < tomorrow) {
      alert("From Date must be at least one day after today.")
      setFromDate("")
    } else {
      setFromDate(e.target.value)
    }
  }

  const handleToDateChange = (e) => {
    const selectedToDate = new Date(e.target.value)
    const selectedFromDate = new Date(fromDate)

    if (!fromDate) {
      alert("Please select From Date first.")
      setToDate("")
      return
    }

    if (selectedToDate <= selectedFromDate) {
      alert("To Date must be after the From Date.")
      setToDate("")
    } else {
      const maxToDate = new Date(fromDate)
      maxToDate.setMonth(maxToDate.getMonth() + 1)

      if (selectedToDate > maxToDate) {
        alert("To Date cannot be more than 1 month after From Date.")
        setToDate("")
      } else {
        setToDate(e.target.value)
      }
    }
  }

  const AddDetailsToDB = async () => {
    if (!fromDate) {
      alert("Please select a From Date.")
      return
    }
    if (!toDate) {
      alert("Please select a To Date.")
      return
    }

    // Double-check authentication before submitting
    if (!user) {
      alert("Your session has expired. Please login again.")
      navigate("/signin")
      return
    }

    const bookingData = {
      user: { userId: user.data.userid },
      car: { carId: Number.parseInt(carId) },
      fromDate: fromDate,
      toDate: toDate,
      status: false,
    }

    try {
      const response = await axios.post(`${url}/api/bookings/book`, bookingData)
      if (response.data.status === "success") {
        alert("Booking Confirmed!")
        navigate("/")
      } else {
        alert("Error while booking.")
      }
    } catch (error) {
      console.error("Booking Error:", error)
      alert("An error occurred while processing your booking.")
    }
  }

  return (
    <div>
      <Header />
      <div className="container">
        <h1 className="title-header">Booking Form</h1>
        <hr />

        <h2>
          <u>
            <b>Booking Details:</b>
          </u>
        </h2>

        <div className="form-container">
          <div className="form-group">
            <label>
              <b>Name:</b>
            </label>
            <input type="text" className="form-control" value={user.data.username} readOnly />
          </div>

          <div className="form-group">
            <label>
              <b>Email:</b>
            </label>
            <input type="text" className="form-control" value={user.data.email} readOnly />
          </div>

          <div className="form-group">
            <label>
              <b>Car Name:</b>
            </label>
            <input type="text" className="form-control" value={car.carName} readOnly />
          </div>

          <div className="form-group">
            <label>
              <b>From Date:</b>
            </label>
            <input type="date" min={today} className="form-control" value={fromDate} onChange={handleFromDateChange} />
          </div>

          <div className="form-group">
            <label>
              <b>To Date:</b>
            </label>
            <input type="date" className="form-control" value={toDate} onChange={handleToDateChange} />
          </div>

          <div className="btn-group">
            <button onClick={AddDetailsToDB} className="btn btn-primary">
              Confirm Booking
            </button>
            <button onClick={() => navigate(-1)} className="btn btn-warning">
              Cancel Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookingForm

