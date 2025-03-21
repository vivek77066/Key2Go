import React from "react";
import "./BookingRow.css"; // Import the normal CSS file

function BookingRow({ booking, deleteBooking, bookingDetail }) {
  return (
    <tr className="booking-row">
      <td>{booking.bookingId}</td>
      <td>{booking.user.username}</td>
      <td>{booking.car.carName}</td>
      <td>{booking.fromDate}</td>
      <td>{booking.toDate}</td>
      <td>
      <button
          className="btn btn-sm btn-success details-btn"
          onClick={() => bookingDetail(booking)}
        >
          Show Details
        </button>
        &nbsp;&nbsp;
        <button
          className="btn btn-sm btn-danger cancel-btn"
          onClick={() => deleteBooking(booking)}
        >
          Cancel
        </button>
        
        
      </td>
    </tr>
  );
}

export default BookingRow;
