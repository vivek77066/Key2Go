package com.KEY2GO.k2g.Service;

import com.KEY2GO.k2g.Entity.Car;
import com.KEY2GO.k2g.Entity.CarCompany;

import java.util.List;
import java.util.Optional;

public interface CarService {
    public List<Car> findAllCar();

    public List<Car> findCarByCompanyId(int carCompanyId);

    public Optional<Car> getCarById(int id);

    public Car addCar(Car car);

    public Car updateCar(int id, Car carDetails);

    public void deleteCar(int id);

    public List<CarCompany> findAllCompany();

    public CarCompany addCarCompany(CarCompany carCompany);
}
