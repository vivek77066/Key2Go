import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { DropdownButton, Dropdown } from "react-bootstrap";
import "./Header.css"; 

const Header = () => {
  const [username, setUserName] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const checkAuthStatus = () => {
      const isActive = sessionStorage.getItem("isActive");
      const user = JSON.parse(sessionStorage.getItem("user"));
      
      if (isActive !== null && user && user.data !== null) {
        setUserName(user.username || user.data?.username);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    };
    
    checkAuthStatus();
  }, []);

  const handleToggle = (event) => {
    event.stopPropagation(); 
    setShowDropdown((prev) => !prev); 
  };


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
            <span className="brand-title">KEY2GO</span>
          </Link>

          <ul className="nav-links">
            <li><Link className="nav-btn" to="/home">Home</Link></li>
            <li><Link className="nav-btn" to="/all_carCompany">All Cars</Link></li>
            <li><Link className="nav-btn" to="/about_us">About Us</Link></li>
            <li><Link className="nav-btn" to="/contact_us">Contact Us</Link></li>

            {!isLoggedIn ? (
              <>
                <li><Link className="nav-btn register-btn" to="/register">Register</Link></li>
                <li><Link className="nav-btn login-btn" to="/signin">Login</Link></li>
              </>
            ) : (
              <li ref={dropdownRef}>
                <DropdownButton 
                  title={<span>{username}</span>} 
                  id="dropdown-basic-button"
                  show={showDropdown}
                  onClick={handleToggle}
                >
                  <Dropdown.Item>
                    <Link className="dropdown-link" to="/all_carCompany">Book New Ride</Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link className="dropdown-link" to="/my_bookings">My Booking</Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link className="dropdown-link" to="/update_profile">Update Profile</Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link className="dropdown-link" to="/signoff">Logout</Link>
                  </Dropdown.Item>
                </DropdownButton>
              </li>
            )}
          </ul>
        </div>
      </header>
    </div>
  );
};

export default Header;
