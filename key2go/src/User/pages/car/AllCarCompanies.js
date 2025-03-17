// import { url } from "../../../Commons/constants";
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom"; // Updated for React Router v6
// import axios from "axios";
// import React from "react";
// import CarCompanyCard from "../../Components/CarCompanyCard";
// import Header from "../../Components/Header";
// import "./All_cars.css"; // Import the normal CSS file

// export default function CarType() {
//   const [carsType, setCarType] = useState([]);
//   const navigate = useNavigate(); // Replaces useHistory() for React Router v6

//   useEffect(() => {
//     fetchAllCarTypes();
//   }, []);

//   const fetchCarCategoryByType = async (carType) => {
//     try {
//       const response = await axios.get(`${url}/api/cars/company`);
//       const result = response.data;

//       if (result !=null) {
//         navigate("/cars-category-list", {
//           state: { carCategory: result.data },
//         });
//       } else {
//         alert("⚠️ Error occurred while fetching car categories.");
//       }
//     } catch (error) {
//       console.error("🚨 API Error (fetchCarCategoryByType):", error);
//     }
//   };

//   const fetchAllCarTypes = async () => {
//     try {
//       const response = await axios.get(`${url}/carType`);
//       const result = response.data;

//       if (result.status === "success") {
//         setCarType(result.data);
//       } else {
//         alert("⚠️ Error while loading car types.");
//       }
//     } catch (error) {
//       console.error("🚨 API Error (fetchAllCarTypes):", error);
//     }
//   };

//   return (
//     <>
//       <Header />
//       <div className="car-type-container">
//         <h1 className="title-header">Car Companies</h1>
//         <CarCompanyCard onItemSelect={fetchCarCategoryByType} carsType={carsType} />
//       </div>
//     </>
//   );
// }

import { url } from "../../../Commons/constants";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import React from "react";
import CarCompanyCard from "../../Components/CarCompanyCard";
import Header from "../../Components/Header";
import "./AllCarCompany.css"; // Import the normal CSS file

export default function AllCarCompany() {
  const [carCompanies, setCarCompanies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllCarCompanies();
  }, []);

  const fetchAllCarCompanies = async () => {
    try {
      const response = await axios.get(`${url}/api/cars/company`);
      setCarCompanies(response.data);
    } catch (error) {
      console.error("Error fetching car companies:", error);
    }
  };

  const handleCompanyClick = (carCompanyId) => {
    navigate(`/cars/${carCompanyId}`);
  };

  return (
    <>
      <Header />
      <div className="car-company-container">
        <h1 className="title-header">Car Companies</h1>
        <CarCompanyCard companies={carCompanies} onCompanyClick={handleCompanyClick} />
      </div>
    </>
  );
}
