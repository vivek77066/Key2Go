package com.KEY2GO.k2g.Entity;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;


@Entity
@Table(name = "booking")
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int bookingId;

    @ManyToOne
    @JoinColumn(name = "userid", nullable = false , referencedColumnName = "userid")
    private User user;  // Reference to User

    @ManyToOne
    @JoinColumn(name = "carId", nullable = false , referencedColumnName = "carId")
    private Car car;  // Reference to Car

    private String userName;
    private String email;
    private String phone;
    private String address;
    private String carName;
    private String carNumber;
    private LocalDate fromDate;
    private LocalDate toDate;
    private double totalAmount;
    private boolean status;

    // Constructor
    public Booking() {}

    public Booking(User user, Car car, LocalDate fromDate, LocalDate toDate , boolean status) {
        this.user = user;
        this.car = car;
        this.userName = user.getUsername();
        this.email = user.getEmail();
        this.phone=user.getPhone();
        this.address = user.getAddress();
        this.carName = car.getCarName();
        this.carNumber = car.getCarNumber();
        this.fromDate = fromDate;
        this.toDate = toDate;
        this.status=status;
        calculateTotalAmount();
    }

    // Method to calculate total amount
    public void calculateTotalAmount() {
        long days = ChronoUnit.DAYS.between(fromDate, toDate);
        this.totalAmount = days * car.getRentPerDay();
    }

    // Getters and Setters
    public int getBookingId() { return bookingId; }
    public void setBookingId(int bookingId) { this.bookingId = bookingId; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public Car getCar() { return car; }
    public void setCar(Car car) { this.car = car; }

    public String getUserName() { return userName; }
    public void setUserName(String userName) { this.userName = userName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getCarName() { return carName; }
    public void setCarName(String carName) { this.carName = carName; }

    public String getCarNumber() { return carNumber; }
    public void setCarNumber(String carNumber) { this.carNumber = carNumber; }

    public LocalDate getFromDate() { return fromDate; }
    public void setFromDate(LocalDate fromDate) { this.fromDate = fromDate; }

    public LocalDate getToDate() { return toDate; }
    public void setToDate(LocalDate toDate) { this.toDate = toDate; }

    public double getTotalAmount() { return totalAmount; }
    public void setTotalAmount(double totalAmount) { this.totalAmount = totalAmount; }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }
}
