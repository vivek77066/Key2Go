import React from "react";
import "./AboutUs.css"; 
import Header from '../Components/Header';


function AboutUs() {
  return (
    <>
    <Header />
    <div className="main-container">
       <div className="text-center">
         
         <h2>About Our Car Rental Service</h2>
         <p className="semi-title">Reliable, Affordable, and Convenient Car Rental Solutions</p>
       
     </div>
      <div className="Acontainer">
        <div className="about-div">
          <div className="content">
            <h3>Who We Are</h3>
            <p>
              Our car rental service is dedicated to providing customers with the best travel experience.
              Whether you're looking for a short-term rental or a long road trip companion, we have a 
              diverse fleet of vehicles to meet your needs. With seamless booking, affordable pricing, and 
              excellent customer support, we make car rentals hassle-free.
            </p>
          </div>
          <div className="about-img">
            <img src="images/Car-Rentals-in-India.jpg" alt="Car Rental" className="img " />
          </div>
        </div>
        
        {/* Technologies Used */}
        <div className="tech-div">
            <h3>Technologies Used</h3>
            <ul className="tech-list">
              <li><strong>Backend:</strong> Java Spring Boot</li>
              <li><strong>Frontend:</strong> React.js</li>
              <li><strong>Database:</strong> MySQL</li>
            </ul>
        </div>
      </div>
    </div>
    </>
  );
}

export default AboutUs;
