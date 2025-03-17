import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import { Header } from "./Header";
import "./HomeImageSlider.css";

const images = [
  "images/slider1.jpg",
  "images/slider2.jpg",
  "images/slider3.jpg"
];

const HomeImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div>
      
      <div className="title-container">
        <div className="title-box">
          <h1>Welcome To Key2Go - Online Car Rental Services</h1>
        </div>
      </div>

      <div className="carousel-container">
        <div className="carousel-wrapper">
          {images.map((img, index) => (
            <div
              key={index}
              className={`carousel-slide ${index === currentIndex ? "active" : ""}`}
            >
              <img src={img} alt={`Slide ${index + 1}`} className="slider-image" />
              <Link className="carousel-button" to="/car_type">
                Let's GO!
              </Link>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <button className="prev-button" onClick={prevSlide}>❮</button>
        <button className="next-button" onClick={nextSlide}>❯</button>
      </div>
    </div>
  );
};

export default HomeImageSlider;