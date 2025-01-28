import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faPhoneAlt, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faTwitter, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";

export const ContactUs = () => {
  return (

  <div>
    <div className='contactus'>
    <ul className='no_bullets'>
    <li>Address: ####</li>
    <li>Contact No. :  +91 9327823254<br/>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;+91 9327823254</li>
    <li>jethavavivek77@gmail.com <br/>&emsp;&emsp;drumankaneriya2001@gmail.com</li>
  </ul>
    </div>
   <div className='quick_links'> 
  <ul className='no_bullets'>
  <h3>Quick Links</h3>
    <li>Home</li>
    <li>About Us</li>
    <li>History</li>
  </ul>
  </div>  
</div>


  )
}
export default ContactUs;

