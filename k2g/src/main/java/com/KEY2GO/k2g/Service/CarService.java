package com.KEY2GO.k2g.Service;

import com.KEY2GO.k2g.Entity.Car;
import com.KEY2GO.k2g.Entity.CarCompany;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

public interface CarService {
    public List<Car> findAllCar();

    public List<Car> findCarByCompanyId(int carCompanyId);

    public Optional<Car> getCarById(int id);

    public void addCar(String carName, String carNumber, String carColor, String fuelType, int seatingCapacity, double rentPerDay,int carCompanyId,  MultipartFile carImage) throws Exception;

    public Car updateCar(int id, Car carDetails , MultipartFile carImg);

    public void deleteCar(int id);

    public void deleteCompany(int id);

    public List<CarCompany> findAllCompany();

    public void saveCarCompany(MultipartFile carComImg, String companyName);
}
