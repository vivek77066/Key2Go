package com.KEY2GO.k2g.Controller;

import com.KEY2GO.k2g.Entity.Car;
import com.KEY2GO.k2g.Entity.CarCompany;
import com.KEY2GO.k2g.Service.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/cars")
public class CarController {


     CarService carService;

    @Autowired
    public CarController (CarService carService){
        this.carService=carService;
    }

    // Get all cars
    @GetMapping
    public List<Car> getAllCars() {
        return carService.findAllCar();
    }
    @GetMapping("/company/{id}")
    public List<Car> getCarByCompany(@PathVariable int id) {
        return carService.findCarByCompanyId(id);
    }

    // Get car by ID
    @GetMapping("/{id}")
    public ResponseEntity<Car> getCarById(@PathVariable int id) {
        Optional<Car> car = carService.getCarById(id);
        return car.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Add a new car
    @PostMapping
    public Car addCar(@RequestBody Car car) {
        return carService.addCar(car);
    }

    // Update car details
    @PutMapping("/{id}")
    public ResponseEntity<Car> updateCar(@PathVariable int id, @RequestBody Car carDetails) {
        try {
            Car updatedCar = carService.updateCar(id, carDetails);
            return ResponseEntity.ok(updatedCar);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete a car
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCar(@PathVariable int id) {
        carService.deleteCar(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/company")
    public List<CarCompany> getAllCompany() {
        return carService.findAllCompany();
    }
    @PostMapping("/company")
    public CarCompany addCarComapny(@RequestBody CarCompany carCompany) {
        return carService.addCarCompany(carCompany);
    }
}
