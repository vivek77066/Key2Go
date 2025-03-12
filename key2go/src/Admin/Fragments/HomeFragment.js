import { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../../Commons/constants";
import "./HomeFragment.css"; // Import the CSS file

const HomeFragment = () => {
  const [count, setCount] = useState(0);
  const [booking, setBookings] = useState(0);
  const [employee, setEmployee] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, bookingsRes, employeesRes] = await Promise.all([
          axios.get(`${url}/user/role/user`),
          axios.get(`${url}/booking/`),
          axios.get(`${url}/user/role/employee`),
        ]);

        setCount(usersRes.data.data.length || 0);
        setBookings(bookingsRes.data.data.length || 0);
        setEmployee(employeesRes.data.data.length || 0);

        sessionStorage.setItem("bookings", JSON.stringify(bookingsRes.data));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <br />
      <h3>Admin Dashboard</h3>
      <hr />
      <br />
      <br />
      <div className="row">
        <div className="col card">
          <div className="card-header">Users Section</div>
          <div className="card-body">
            <h5 className="card-title">Total Users</h5>
            <p className="card-text">{count}</p>
          </div>
        </div>
        <div className="col card">
          <div className="card-header">Bookings Section</div>
          <div className="card-body">
            <h5 className="card-title">Total Bookings</h5>
            <p className="card-text">{booking}</p>
          </div>
        </div>
        <div className="col card">
          <div className="card-header">Employees</div>
          <div className="card-body">
            <h5 className="card-title">Total Employees</h5>
            <p className="card-text">{employee}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeFragment;
