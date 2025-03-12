package com.KEY2GO.k2g.Repository;

import com.KEY2GO.k2g.Entity.CarCompany;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CompanyRepository extends JpaRepository<CarCompany, Integer> {
}
