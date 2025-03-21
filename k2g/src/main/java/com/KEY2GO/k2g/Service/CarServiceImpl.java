package com.KEY2GO.k2g.Service;

import com.KEY2GO.k2g.Entity.Car;
import com.KEY2GO.k2g.Entity.CarCompany;
import com.KEY2GO.k2g.Repository.CarRepository;
import com.KEY2GO.k2g.Repository.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import com.KEY2GO.k2g.utils.DiskStorageServiceImpl;
import org.springframework.web.multipart.MultipartFile;

@Service
public class CarServiceImpl implements CarService{

    private final CarRepository carRepository;
    private final CompanyRepository companyRepository;
    private final DiskStorageServiceImpl diskStorageService;

    @Autowired
    public CarServiceImpl(CarRepository carRepository, CompanyRepository companyRepository, DiskStorageServiceImpl diskStorageService) {
        this.carRepository = carRepository;
        this.companyRepository = companyRepository;
        this.diskStorageService = diskStorageService;
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
    public void addCar(String carName, String carNumber, String carColor, String fuelType,  int seatingCapacity,double rentPerDay, int carCompanyId, MultipartFile carImg) throws Exception {
        String imageFileName = diskStorageService.store(carImg);

        // Fetch the CarCompany entity
        CarCompany carCompany = companyRepository.findById(carCompanyId);

        // Create a new Car entity
        Car car = new Car();
        car.setCarName(carName);
        car.setCarNumber(carNumber);
        car.setCarColor(carColor);
        car.setFuelType(fuelType);
        car.setRentPerDay(rentPerDay);
        car.setSeatingCapacity(seatingCapacity);
        car.setCarCompany(carCompany);
        car.setCarImg(imageFileName); // Store the filename instead of byte array

        // Save the entity to the database
        carRepository.save(car);
    }

    // Update existing car
    @Override
    public Car updateCar(int id, Car carDetails, MultipartFile carImage) {
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
            if (carDetails.getCarCompany() != null) {
                car.setCarCompany(carDetails.getCarCompany());
            }
            if (carImage != null && !carImage.isEmpty()) {
                String imageName = diskStorageService.store(carImage);
                car.setCarImg(imageName);
            }
            return carRepository.save(car);
        }).orElseThrow(() -> new RuntimeException("Car not found with id " + id));
    }


    // Delete a car
    public void deleteCar(int id) {
        carRepository.deleteById(id);
    }

    @Override
    public void deleteCompany(int id) {
        companyRepository.deleteById(id);
    }

    @Override
    public List<CarCompany> findAllCompany() {
        return companyRepository.findAll();
    }

    @Override
    public void saveCarCompany(MultipartFile carComImg, String companyName)  {
        // Store the image using DiskStorageServiceImpl
        String imageFileName = diskStorageService.store(carComImg);

        // Create a new CarCompany entity
        CarCompany carCompany = new CarCompany();
        carCompany.setCompanyName(companyName);
        carCompany.setCarComImg(imageFileName); // Store the filename instead of byte array

        // Save the entity to the database
        companyRepository.save(carCompany);
    }
}
