import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { url } from "../../../Commons/constants";
import React from "react";
import "./Login.css";

console.log(url);

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let flag = false;
  const navigate = useNavigate();

  const CheckRole = (role) => {
    if (role === "user") {
      navigate("/car_type");
    } else if (role === "admin") {
      navigate("/admin_dashboard");
    } else {
      navigate("/employee_dashboard");
    }
  };
  
  const validUser = () => {
    if (email.length === 0) {
      alert("Enter your email");
    } else if (password.length === 0) {
      alert("Enter your password");
    } else {
      const data = {
        email: email,
        password: password,
      };
        console.log(data)
      axios.post(url + "/api/users/authenticate", data).then((response) => {
        const result = response.data;
        console.log(result)
        if (result != null) {
          alert("login Successfully");
          flag = true;
          CheckRole(result.role);
          sessionStorage.setItem("isActive", flag);
          sessionStorage.setItem("user", JSON.stringify(result));
        } else {
          alert("Invalid usename or password");
        }
      });
    }
  };
  
  return (
    <div className="login-container">
      <main className="login-form">
        <i className="fas fa-user login-icon"></i>
        <h1 className="login-heading">Please sign in</h1>
        
        <div className="form-group">
          <input
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            type="email"
            className="form-input"
            id="floatingInput"
            placeholder="name@example.com"
          />
          <label htmlFor="floatingInput" className="form-label">Email address</label>
        </div>
        
        <div className="form-group">
          <input
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            type="password"
            className="form-input"
            id="floatingPassword"
            placeholder="Password"
          />
          <label htmlFor="floatingPassword" className="form-label">Password</label>
        </div>

        <button className="login-button" onClick={validUser}>
          Log In
        </button>

        <div className="register-link">
          Not a User, <Link to="/register">Register</Link> here.
        </div>
      </main>
    </div>
  );
};

export default Login;