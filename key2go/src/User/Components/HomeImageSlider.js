import React from "react";
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";
import { Header } from "./Header";
import "./HomeImageSlider.css"; // Import CSS file

const HomeImageSlider = () => {
  return (
    <div>
      <Header />
      <div className="title-container">
        <div className="title-box">
          <h1>Welcome To RentPeCar - Online Car Rental Services</h1>
        </div>
      </div>

      <Carousel>
        <Carousel.Item interval={5000}>
          <img className="slider-image" src="images/slider1.jpg" alt="sliderimage" />
          <Link className="carousel-button" to="car_type">
            Let's GO!
          </Link>
        </Carousel.Item>

        <Carousel.Item interval={5000}>
          <img className="slider-image" src="images/slider2.jpg" alt="sliderimage" />
          <Link className="carousel-button" to="car_type">
            Let's GO!
          </Link>
        </Carousel.Item>

        <Carousel.Item interval={2000}>
          <img className="slider-image" src="images/slider3.jpg" alt="sliderimage" />
          <Link className="carousel-button" to="car_type">
            Let's GO!
          </Link>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default HomeImageSlider;
