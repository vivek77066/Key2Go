import React from "react";
import "./BookingRow.css"; // Import the normal CSS file

function BookingRow({ booking, deleteBooking, bookingDetail }) {
  return (
    <tr className="booking-row">
      <td>{booking.bookingid}</td>
      <td>{booking.username}</td>
      <td>{booking.carVarient}</td>
      <td>{booking.fromDate}</td>
      <td>{booking.toDate}</td>
      <td>{new Date(booking.bookingDate).toDateString()}</td>
      <td>
        <button
          className="btn btn-sm btn-danger cancel-btn"
          onClick={() => deleteBooking(booking)}
        >
          Cancel
        </button>
        &nbsp;&nbsp;
        <button
          className="btn btn-sm btn-success details-btn"
          onClick={() => bookingDetail(booking)}
        >
          Show Details
        </button>
      </td>
    </tr>
  );
}

export default BookingRow;
