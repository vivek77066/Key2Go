package com.KEY2GO.k2g.Service;

import com.KEY2GO.k2g.Entity.Car;
import com.KEY2GO.k2g.Entity.CarCompany;
import com.KEY2GO.k2g.Repository.CarRepository;
import com.KEY2GO.k2g.Repository.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Optional;

@Service
public class CarServiceImpl implements CarService{

     private CarRepository carRepository;
     private CompanyRepository companyRepository;

    @Autowired
    public CarServiceImpl(CarRepository carRepository ,CompanyRepository companyRepository){
        this.carRepository=carRepository;
        this.companyRepository=companyRepository;
    }

    @Override
    public List<Car> findAllCar() {
        return carRepository.findAll();
    }
    // Get car by ID
    @Override
    public Optional<Car> getCarById(int id) {
        return carRepository.findById(id);
    }

    @Override
    public List<Car> findCarByCompanyId(int carCompanyId) {
        return carRepository.findByCarCompany_carCompanyId(carCompanyId);
    }

    // Add a new car
    @Override
    public Car addCar(@RequestBody Car car) {
            return carRepository.save(car);
    }

    // Update existing car
    @Override
    public Car updateCar(int id, Car carDetails) {
        return carRepository.findById(id).map(car -> {
            if (carDetails.getCarName() != null) {
                car.setCarName(carDetails.getCarName());
            }
            if (carDetails.getCarNumber() != null) {
                car.setCarNumber(carDetails.getCarNumber());
            }
            if (carDetails.getCarColor() != null) {
                car.setCarColor(carDetails.getCarColor());
            }
            if (carDetails.getCarCompanyId() != null) {
                car.setCarCompanyId(carDetails.getCarCompanyId());
            }
            return carRepository.save(car);
        }).orElseThrow(() -> new RuntimeException("Car not found with id " + id));
    }


    // Delete a car
    public void deleteCar(int id) {
        carRepository.deleteById(id);
    }

    @Override
    public List<CarCompany> findAllCompany() {
        return companyRepository.findAll();
    }

    @Override
    public CarCompany addCarCompany(@RequestBody CarCompany carCompany){
        return companyRepository.save(carCompany);
    }
}
