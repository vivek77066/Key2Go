// import "./CarCard.css";
//  import { url } from "../../Commons/constants";
 
//  const CarTypeCard = ({ carsType, onItemSelect }) => {
//    return (
//      <div className="car-type-wrapper">
//        {carsType.map((carType) => {
//          return (
//            <div className="car-type-container" key={carType.id}>
//              <div
//                className="car-type-card"
//                onClick={() => {
//                  onItemSelect(carType);
//                }}
//              >
//                <img
//                  src={url + "/" + carType.carImage}
//                  className="car-image"
//                  alt={carType.typeName}
//                />
//                <div className="type-title">{carType.typeName}</div>
//              </div>
//            </div>
//          );
//        })}
//      </div>
//    );
//  };
// export default CarTypeCard;

import React from "react";
import "./CarCompanyCard.css"; // Import the normal CSS file

const CarCompanyCard = ({ companies, onCompanyClick }) => {
  console.log(companies)
  return (
    <div className="car-company-cards">
      {companies.map((company) => (
        <div
          key={company.carCompanyId}
          className="car-company-card"
          onClick={() => { onCompanyClick(company.carCompanyId); console.log(company.carCompanyId)}}
        >
          <img src={company.imageUrl} alt={company.companyName} className="company-image" />
          <h3>{company.companyName}</h3>
        </div>
      ))}
    </div>
  );
};

export default CarCompanyCard;
