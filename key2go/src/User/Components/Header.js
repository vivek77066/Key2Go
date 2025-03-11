import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { DropdownButton, Dropdown } from "react-bootstrap";
import "./Header.css"; // Import CSS file

export const Header = () => {
  const [username, setUserName] = useState("");

  useEffect(() => {
    let isActive = sessionStorage.getItem("isActive");
    let user = JSON.parse(sessionStorage.getItem("user"));

    if (isActive !== null && user?.data !== null) {
      setUserName(user.data.username);
    } else {
      setUserName("");
    }
  }, []);

  return (
    <div className="nav-header">
      <header className="header-container">
        <div className="header-content">
          <Link to="/home" className="brand">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSp2KXbtD8paphq4ikfB5It9gvkWh9poQNdzw&usqp=CAU"
              alt="logo"
              className="brand-logo"
            />
            <span className="brand-title">RentPeCar</span>
          </Link>

          <ul className="nav-links">
            <li><Link className="nav-btn" to="/home">Home <i className="fas fa-home"></i></Link></li>
            <li><Link className="nav-btn" to="/car_type">All Cars <i className="fas fa-car"></i></Link></li>
            <li><Link className="nav-btn" to="/about_us">About Us <i className="fas fa-info-circle"></i></Link></li>
            <li><Link className="nav-btn" to="/contact_us">Contact Us <i className="fas fa-mobile"></i></Link></li>

            {!username ? (
              <>
                <li><Link id="registerbtn" className="nav-btn register-btn" to="/register">Register <i className="fas fa-user-plus"></i></Link></li>
                <li><Link id="loginbtn" className="nav-btn login-btn" to="/signin">Login <i className="fas fa-sign-in-alt"></i></Link></li>
              </>
            ) : (
              <li>
                <DropdownButton title={<span>{username} <i className="fas fa-user"></i></span>} id="dropdown-basic-button">
                  <Dropdown.Item><Link className="dropdown-link" to="/car_type">Book New Ride <i className="fas fa-car"></i></Link></Dropdown.Item>
                  <Dropdown.Item><Link className="dropdown-link" to="/my_bookings">My Booking <i className="fas fa-clipboard-list"></i></Link></Dropdown.Item>
                  <Dropdown.Item><Link className="dropdown-link" to="/update_profile">Update Profile <i className="fas fa-user-edit"></i></Link></Dropdown.Item>
                  <Dropdown.Item><Link className="dropdown-link" to="/signoff">Logout <i className="fas fa-sign-out-alt"></i></Link></Dropdown.Item>
                </DropdownButton>
              </li>
            )}
          </ul>
        </div>
      </header>
    </div>
  );
};
