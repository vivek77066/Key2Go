package com.KEY2GO.k2g.Controller;

import com.KEY2GO.k2g.Entity.Booking;
import com.KEY2GO.k2g.Entity.User;
import com.KEY2GO.k2g.Service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @PostMapping("/book")
    public ResponseEntity<?> bookCar(@RequestBody Booking booking) {
        LocalDate start = booking.getFromDate();
        LocalDate end = booking.getToDate();

        if (start.isAfter(end)) {
            return ResponseEntity.badRequest().body("Invalid date range");
        }

        Booking savedBooking = bookingService.bookCar(
                booking.getUser().getUserId(), // Extract userId from User object
                booking.getCar().getCarId(),   // Extract carId from Car object
                start,
                end,
                booking.isStatus()
        );

        return ResponseEntity.ok(savedBooking);
    }


    @GetMapping("/all")
    public ResponseEntity<List<Booking>> getAllBookings() {
        return ResponseEntity.ok(bookingService.getAllBookings());
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<List<Booking>> getUserBookings(@PathVariable("id") User id) {
        return ResponseEntity.ok(bookingService.getBookingsByUser(id));
    }

}

