import React from 'react'

export const Footer = () => {
  return (
    <div>
   <footer class="footer">
    <div class="container">
      <div class="footer-section">
        <h3>KEY2GO</h3>
        <p><i class="fas fa-map-marker-alt"></i> Address: Gujarat, India</p>
        <p><i class="fas fa-phone-alt"></i> +91 9327823254</p>
        <p><i class="fas fa-envelope"></i> mylogo@gmail.com</p>
      </div>
      <div class="footer-section">
        <h3>Our Product</h3>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">Dashboard</a></li>
          <li><a href="#">Vehicles</a></li>
          <li><a href="#">Features</a></li>
        </ul>
      </div>
      <div class="footer-section">
        <h3>About Services</h3>
        <ul>
          <li><a href="#">Why Choose Us</a></li>
          <li><a href="#">Our History</a></li>
          <li><a href="#">Investor Relations</a></li>
          <li><a href="#">Contact Us</a></li>
        </ul>
      </div>
      <div class="footer-section">
        <h3>Follow Us</h3>
        <p>
          <a href="#"><i class="fab fa-facebook-f"></i></a>
          <a href="#"><i class="fab fa-twitter"></i></a>
          <a href="#"><i class="fab fa-linkedin-in"></i></a>
        </p>
      </div>
    </div>
    <div class="footer-bottom">
      <p>Copyright © 2025 - . All Rights Reserved</p>
    </div>
  </footer>
    </div>
  )
}
export default Footer;