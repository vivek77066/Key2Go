package com.KEY2GO.k2g.Service;

import com.KEY2GO.k2g.Entity.Booking;
import com.KEY2GO.k2g.Entity.Car;
import com.KEY2GO.k2g.Entity.User;
import com.KEY2GO.k2g.Repository.BookingRepository;
import com.KEY2GO.k2g.Repository.CarRepository;
import com.KEY2GO.k2g.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;

@Service
public class BookingServiceImpl implements BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CarRepository carRepository;

    @Override
    public Booking bookCar(int userId, int carId, LocalDate fromDate, LocalDate toDate , boolean status) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Car car = carRepository.findById(carId)
                .orElseThrow(() -> new RuntimeException("Car not found"));

        Booking booking = new Booking(user, car, fromDate, toDate , status);
        return bookingRepository.save(booking);
    }

    @Override
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    @Override
    public List<Booking> getBookingsByUser(User userId) {
        return bookingRepository.findByUser(userId);
    }

}
