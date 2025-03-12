package com.KEY2GO.k2g.Repository;

import com.KEY2GO.k2g.Entity.Car;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CarRepository extends JpaRepository<Car, Integer> {
    List<Car> findByCarCompany_carCompanyId(int carCompanyId);
}

