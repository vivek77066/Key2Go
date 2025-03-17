import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { DropdownButton, Dropdown } from "react-bootstrap";
import "./Header.css"; 

const Header = () => {
  const [username, setUserName] = useState(null);
  console.log(sessionStorage.getItem('user'))
  

  useEffect(() => {
    let isActive = sessionStorage.getItem("isActive");
    let user = sessionStorage.getItem("user");
    
    if (isActive && user) {
      console.log(user.username)
      try {
        let parsedUser = JSON.parse(user);
        if (parsedUser?.data?.username) {
          setUserName(parsedUser.data.username);
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
        setUserName(""); // Ensure username is reset if parsing fails
      }
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
            <span className="brand-title">KEY2GO</span>
          </Link>

          <ul className="nav-links">
            <li><Link className="nav-btn" to="/home">Home</Link></li>
            <li><Link className="nav-btn" to="/all_carCompany">All Cars </Link></li>
            <li><Link className="nav-btn" to="/about_us">About Us</Link></li>
            <li><Link className="nav-btn" to="/contact_us">Contact Us </Link></li>

            {!username ? (
              <>
                <li><Link id="registerbtn" className="nav-btn register-btn" to="/register">Register</Link></li>
                <li><Link id="loginbtn" className="nav-btn login-btn" to="/signin">Login </Link></li>
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

export default Header;

// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom"; // Import Link from react-router-dom
// import { User } from "lucide-react";
// import styles from './Header.css'; // Import the CSS module

// export const Header = () => {
//   const navigate = useNavigate(); // Use useNavigate from react-router-dom
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [username, setUsername] = useState("");
//   const [dropdownOpen, setDropdownOpen] = useState(false);

//   useEffect(() => {
//     const checkAuth = () => {
//       const isActive = sessionStorage.getItem("isActive");
//       const userStr = sessionStorage.getItem("user");

//       if (isActive && userStr) {
//         try {
//           const user = JSON.parse(userStr);
//           if (user && user.data) {
//             setUsername(user.data.username);
//             setIsAuthenticated(true);
//             return;
//           }
//         } catch (error) {
//           console.error("Error parsing user data:", error);
//         }
//       }

//       setIsAuthenticated(false);
//       setUsername("");
//     };

//     checkAuth();

//     window.addEventListener("storage", checkAuth);

//     return () => {
//       window.removeEventListener("storage", checkAuth);
//     };
//   }, []);

//   const toggleDropdown = () => {
//     setDropdownOpen((prev) => !prev);
//   };

//   const handleLogout = () => {
//     sessionStorage.removeItem("isActive");
//     sessionStorage.removeItem("user");
//     setIsAuthenticated(false);
//     setUsername("");
//     navigate("/signin"); // Use navigate from react-router-dom
//   };

//   return (
//     <div className={styles.navHeader}>
//       <header className={styles.header}>
//         <div className={styles.container}>
//           <div className={styles.flexContainer}>
//             <Link to="/home" className={styles.logo}>
//               <img
//                 src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSp2KXbtD8paphq4ikfB5It9gvkWh9poQNdzw&usqp=CAU"
//                 alt="logo"
//                 className={styles.logoImage}
//               />
//               <span className={styles.logoText}>RentPeCar</span>
//             </Link>

//             <nav className={styles.nav}>
//               <Link className={styles.navLink} to="/home">
//                 Home <i className="fas fa-home ml-1"></i>
//               </Link>

//               <Link className={styles.navLink} to="/all_carCompany">
//                 All Cars <i className="fas fa-car ml-1"></i>
//               </Link>

//               <Link className={styles.navLink} to="/about_us">
//                 About Us <i className="fas fa-info-circle ml-1"></i>
//               </Link>

//               <Link className={styles.navLink} to="/contact_us">
//                 Contact Us <i className="fas fa-mobile ml-1"></i>
//               </Link>

//               {!isAuthenticated ? (
//                 <>
//                   <Link className={styles.registerLink} to="/register">
//                     Register <i className="fas fa-user-plus ml-1"></i>
//                   </Link>

//                   <Link className={styles.loginLink} to="/signin">
//                     Login <i className="fas fa-sign-in-alt ml-1"></i>
//                   </Link>
//                 </>
//               ) : (
//                 <div className={styles.dropdown}>
//                   <button
//                     onClick={toggleDropdown}
//                     className={styles.dropdownButton}
//                   >
//                     {username} <User  className={styles.userIcon} />
//                   </button>
//                   {dropdownOpen && (
//                     <div className={styles.dropdownContent}>
//                       <button
//                         className={styles.dropdownItem}
//                         onClick={() => navigate("/car_type")}
//                       >
//                         Book New Ride <i className="fas fa-car ml-2"></i>
//                       </button>
//                       <button
//                         className={styles.dropdownItem}
//                         onClick={() => navigate("/my_bookings")}
//                       >
//                         My Booking <i className="fas fa-people-carry ml-2"></i>
//                       </button>
//                       <button
//                         className={styles.dropdownItem}
//                         onClick={() => navigate("/update_profile")}
//                       >
//                         Update Profile <i className="fas fa-user-edit ml-2"></i>
//                       </button>
//                       <button
//                         className={styles.dropdownItem}
//                         onClick={handleLogout}
//                       >
//                         Logout <i className="fas fa-sign-out-alt ml-2"></i>
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               )}
//             </nav>
//           </div>
//         </div>
//       </header>
//     </div>
//   );
// };

// export default Header;