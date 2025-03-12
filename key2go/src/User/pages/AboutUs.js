import React from "react";
import "./AboutUs.css"; // Importing CSS for styling


function AboutUs() {
  return (
    <div className="main-container">
      <div className="container">
        {/* Header Section */}
        <div className="text-center">
         
            <h2>About Our Car Rental Service</h2>
            <p className="semi-title">Reliable, Affordable, and Convenient Car Rental Solutions</p>
          
        </div>
        
        {/* About Description */}
        <div className="row align-items-center bg-light p-4 rounded shadow-sm">
          <div className="col-md-6">
            <h3>Who We Are</h3>
            <p>
              Our car rental service is dedicated to providing customers with the best travel experience.
              Whether you're looking for a short-term rental or a long road trip companion, we have a 
              diverse fleet of vehicles to meet your needs. With seamless booking, affordable pricing, and 
              excellent customer support, we make car rentals hassle-free.
            </p>
          </div>
          <div className="col-md-6">
            <img src="images/Car-Rentals-in-India.jpg" alt="Car Rental" className="img-fluid rounded " />
          </div>
        </div>
        
        {/* Technologies Used */}
        <div className="row my-5">
          <div className="col-md-6">
            <h3>Technologies Used</h3>
            <ul className="list-unstyled">
              <li><strong>Backend:</strong> Java Spring Boot</li>
              <li><strong>Frontend:</strong> React.js</li>
              <li><strong>Database:</strong> MySQL</li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Footer Section */}
      <footer className="footer bg-dark text-white text-center">
        <div>
          <p>Follow us:</p>
          <a href="https://www.facebook.com/" className="text-white mx-2">
            <i className="fab fa-facebook" />
          </a>
          <a href="https://www.instagram.com/" className="text-white mx-2">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://twitter.com/" className="text-white mx-2">
            <i className="fab fa-twitter"></i>
          </a>
        </div>
        <div>
          <p>&copy; {new Date().getFullYear()} Car Rental Service. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default AboutUs;
