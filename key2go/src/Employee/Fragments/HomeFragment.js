import { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../../Commons/constants";
import "./HomeFragment.css"; // Import CSS file

const HomeFragment = () => {
  const [user, setUser] = useState(0);
  const [carTypes, setCarTypes] = useState(0);
  const [carCategories, setCarCategories] = useState(0);
  const [bookings, setBookings] = useState(0);
  const [cars, setCars] = useState(0);

  useEffect(() => {
    axios
      .get(url + "/api/cars")
      .then((res) => setCarTypes(res.data.data.length))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(url + "/api/cars")
      .then((res) => setCarCategories(res.data.data.length))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(url + "/api/users/role/user")
      .then((res) => setUser(res.data.data.length))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(url + "/api/booking/all")
      .then((res) => setBookings(res.data.data.length))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(url + "/api/cars")
      .then((res) => setCars(res.data.data.length))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container">
      <h3 className="title">Employee Dashboard</h3>
      <div className="row">
        <div className="card dark">
          <h5>Total Car Types</h5>
          <p>{carTypes}</p>
        </div>
        <div className="card info">
          <h5>Total Car Categories</h5>
          <p>{carCategories}</p>
        </div>
        <div className="card primary">
          <h5>Registered Users</h5>
          <p>{user}</p>
        </div>
      </div>

      <div className="row">
        <div className="card danger">
          <h5>Total Bookings</h5>
          <p>{bookings}</p>
        </div>
        <div className="card warning">
          <h5>Total Cars</h5>
          <p>{cars}</p>
        </div>
      </div>
    </div>
  );
};

export default HomeFragment;
