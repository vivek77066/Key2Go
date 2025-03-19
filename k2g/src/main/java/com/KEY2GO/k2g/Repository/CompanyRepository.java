package com.KEY2GO.k2g.Repository;

import com.KEY2GO.k2g.Entity.Booking;
import com.KEY2GO.k2g.Entity.CarCompany;
import com.KEY2GO.k2g.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CompanyRepository extends JpaRepository<CarCompany, Integer> {
    CarCompany findById(int carCompanyId);
}
