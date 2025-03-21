package com.KEY2GO.k2g.Entity;

import jakarta.persistence.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.engine.internal.Cascade;


@Entity
@Table(name = "car")
public class Car {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int carId;
    @Column
    private String carName;
    @ManyToOne
    @JoinColumn(name = "CarCompanyId")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private CarCompany carCompany;
    @Column
    private String carNumber;
    @Column
    private String carColor;
    @Column
    private String fuelType;
    @Column
    private int seatingCapacity;
    @Column
    private double rentPerDay;
    @Column
    private String carImg;


    public Car(String carName, String carNumber, String carColor, CarCompany carCompany, String fuelType , int seatingCapacity , double rentPerDay , String carImg) {
        this.carName = carName;
        this.carNumber = carNumber;
        this.carColor = carColor;
        this.carCompany= carCompany;
        this.fuelType =fuelType;
        this.seatingCapacity=seatingCapacity;
        this.rentPerDay=rentPerDay;
        this.carImg=carImg;

    }
    public Car(){}

    public int getCarId() {
        return carId;
    }

    public void setCarId(int carId) {
        this.carId = carId;
    }

    public String getCarName() {
        return carName;
    }

    public void setCarName(String carName) {
        this.carName = carName;
    }

    public String getCarNumber() {
        return carNumber;
    }

    public void setCarNumber(String carNumber) {
        this.carNumber = carNumber;
    }

    public String getCarColor() {
        return carColor;
    }

    public void setCarColor(String carColor) {
        this.carColor = carColor;
    }


    public CarCompany getCarCompany() {
        return carCompany;
    }

    public void setCarCompany(CarCompany carCompany) {
        this.carCompany = carCompany;
    }

    public String getFuelType() {
        return fuelType;
    }

    public void setFuelType(String fuelType) {
        this.fuelType = fuelType;
    }

    public int getSeatingCapacity() {
        return seatingCapacity;
    }

    public void setSeatingCapacity(int seatingCapacity) {
        this.seatingCapacity = seatingCapacity;
    }

    public double getRentPerDay() {
        return rentPerDay;
    }

    public void setRentPerDay(double rentPerDay) {
        this.rentPerDay = rentPerDay;
    }
    public String getCarImg() {
        return carImg;
    }

    public void setCarImg(String carImg) {
        this.carImg = carImg;
    }
}