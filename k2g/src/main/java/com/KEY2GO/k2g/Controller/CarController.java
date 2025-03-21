package com.KEY2GO.k2g.Controller;

import com.KEY2GO.k2g.Entity.Car;
import com.KEY2GO.k2g.Entity.CarCompany;
import com.KEY2GO.k2g.Service.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@CrossOrigin
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

    @PostMapping("/add")
    public ResponseEntity<String> addCar(
            @RequestParam("carName") String carName,
            @RequestParam("carNumber") String carNumber,
            @RequestParam("carColor") String carColor,
            @RequestParam("fuelType") String fuelType,
            @RequestParam("rentPerDay") double rentPerDay,
            @RequestParam("seatingCapacity") int seatingCapacity,
            @RequestParam("carCompanyId") int carCompanyId,
            @RequestParam("carImg") MultipartFile carImg) {
        try {
            carService.addCar(carName, carNumber, carColor, fuelType,  seatingCapacity,rentPerDay  ,carCompanyId,carImg);
            return ResponseEntity.ok("Car added successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error while adding");
        }
    }

    // Update car details
    @PutMapping("/{id}")
    public ResponseEntity<Car> updateCar(
            @PathVariable int id,
            @RequestPart("car") Car carDetails,
            @RequestPart(value = "carImage", required = false) MultipartFile carImage) {
        try {
            Car updatedCar = carService.updateCar(id, carDetails, carImage);
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
    @DeleteMapping("/company/{id}")
    public ResponseEntity<Void> deleteCompany(@PathVariable int id){
        carService.deleteCompany(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/company")
    public List<CarCompany> getAllCompany() {
        return carService.findAllCompany();
    }
    @PostMapping("/Company")
    public ResponseEntity<String> addCarCompany(
            @RequestParam("carComImg") MultipartFile carComImg,
            @RequestParam("companyName") String companyName) {
        try {
            carService.saveCarCompany(carComImg, companyName);
            return ResponseEntity.ok("Car added successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error while adding BE");
        }
    }
}
