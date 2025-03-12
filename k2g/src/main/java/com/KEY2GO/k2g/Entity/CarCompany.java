package com.KEY2GO.k2g.Entity;

import jakarta.persistence.*;

@Entity
@Table(name="car_company")
public class CarCompany {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int carCompanyId;
    private String companyName;
    private String carComImg;

    public CarCompany(){}

    public CarCompany(String companyName , String carComImg){
        this.companyName=companyName;
        this.carComImg=carComImg;
    }

    public int getCarCompanyId() {
        return carCompanyId;
    }

    public void setCarCompanyId(int carCompanyId) {
        this.carCompanyId = carCompanyId;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getCarComImg() {
        return carComImg;
    }

    public void setCarComImg(String carComImg) {
        this.carComImg = carComImg;
    }
}
