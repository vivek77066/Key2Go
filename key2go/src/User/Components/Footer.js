import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

const Footer=()=> {
  return (
    <div
     className='footer-container'>
      <section className='footer-subscription'>
      </section>
      <section class='social-media'>
        <div class='social-media-wrap'>
          <div class='footer-logo'>
            <Link to='/' className='social-logo'>
            RentPeCar
            </Link>
          </div>
          <small class='website-rights'>RentPeCar © 2023</small>
          <div class='social-icons'>
            <Link
              class='social-icon-link facebook'
              to='//www.facebook.com'
              target='_blank'
              aria-label='Facebook'
            >
              <i class='fab fa-facebook-f' />
            </Link>
            <Link
              class='social-icon-link instagram'
              to='//www.instagram.com/rauflala.rd'
              target='_blank'
              aria-label='Instagram'
            >
              <i class='fab fa-instagram' />
            </Link>
            <Link
              class='social-icon-link youtube'
              to='//www.youtube.com'
              target='_blank'
              aria-label='Youtube'
            >
              <i class='fab fa-youtube' />
            </Link>
            <Link
              class='social-icon-link twitter'
              to='//www.twitter.com'
              target='_blank'
              aria-label='Twitter'
            >
              <i class='fab fa-twitter' />
            </Link>
            <Link
              class='social-icon-link twitter'
              to='//www.linkedin.com/in/ravi-dubey-948130174'
              target='_blank'
              aria-label='LinkedIn'
            >
              <i class='fab fa-linkedin' />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;