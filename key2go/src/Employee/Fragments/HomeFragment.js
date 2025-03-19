import { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../../Commons/constants";
import "./HomeFragment.css"; // Import CSS file

const HomeFragment = () => {
  const [user, setUser] = useState(0);
  const [carCompany, setCarCompany] = useState(0);
  const [bookings, setBookings] = useState(0);
  const [cars, setCars] = useState(0);

  useEffect(() => {
    axios
      .get(url + "/api/cars")
      .then((res) => setCarCompany(res.data.length)||0) // Fix: Extract res.data
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(url + "/api/users/role/employee") // Fix: Corrected endpoint typo ("empoyee" → "employee")
      .then((res) => setUser(res.data.length||0)) // Fix: Extract res.data
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(url + "/api/bookings/all")
      .then((res) => setBookings(res.data.length||0)) // Fix: Extract res.data
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(url + "/api/cars")
      .then((res) => setCars(res.data.length||0)) // Fix: Extract res.data
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="emcontainer">
      <h3 className="emtitle">Employee Dashboard</h3>
      <div className="emrow">
        <div className="card_info">
          <h5>Total Car Companies</h5>
          <p>{carCompany}</p>
        </div>
        <div className="card_primary">
          <h5>Registered Users</h5>
          <p>{user}</p>
        </div>
      </div>

      <div className="emrow">
        <div className="card_danger">
          <h5>Total Bookings</h5>
          <p>{bookings}</p>
        </div>
        <div className="card_warning">
          <h5>Total Cars</h5>
          <p>{cars}</p>
        </div>
      </div>
    </div>
  );
};

export default HomeFragment;
