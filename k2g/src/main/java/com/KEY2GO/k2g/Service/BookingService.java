package com.KEY2GO.k2g.Service;

import com.KEY2GO.k2g.Entity.Booking;
import com.KEY2GO.k2g.Entity.User;

import java.time.LocalDate;
import java.util.List;

public interface BookingService {
    Booking bookCar(int userId, int carId, LocalDate fromDate, LocalDate toDate , boolean status);
    List<Booking> getAllBookings();
    List<Booking> getBookingsByUser(User userId);
    Booking getBookingById(int bookingId);
    Booking updateBooking(int bookingId,Booking updatedBooking);
    void deleteBookingById(int bookingId);
}
