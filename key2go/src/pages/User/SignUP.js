import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { url } from "../../../Commons/constants";
import "./SignUp.css"; // Importing the CSS file

const SignUp = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setdob] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("user");
  const [showRole, setShowRole] = useState(false);

  const history = useHistory();

  const addUserToDB = () => {
    if (username.trim().length < 3) {
      alert("Please Enter a correct Name.");
    } else if (email.trim().length === 0) {
      alert("Please Enter an Email address.");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim().toLowerCase())) {
      alert("Invalid Email format.");
    } else if (password.trim().length < 8 || password.trim().length > 20) {
      alert("Password must be between 8 to 20 characters.");
    } else if (gender.length === 0) {
      alert("Please Select a Gender.");
    } else if (phone.trim().length !== 10) {
      alert("Please Enter a 10-digit Phone number.");
    } else if (dob.trim().length === 0) {
      alert("Please Enter your Date of Birth.");
    } else if (new Date().getFullYear() - new Date(dob).getFullYear() < 5) {
      alert("Your age should be at least 5 years.");
    } else if (address.trim().length === 0) {
      alert("Please Enter an address.");
    } else {
      const data = new FormData();
      data.append("username", username.trim());
      data.append("email", email.trim());
      data.append("password", password);
      data.append("gender", gender.trim());
      data.append("phone", phone);
      data.append("dob", dob);
      data.append("address", address.trim());
      data.append("role", role.trim());

      axios
        .post(url + "/user/addUser", data)
        .then((response) => {
          const result = response.data;
          if (result.status === "success") {
            alert("Sign Up successfully");
            history.push("/signin");
          } else {
            alert("Error while Sign Up!");
          }
        })
        .catch((error) => {
          console.log(error);
          alert("Error while Sign Up!");
        });
    }
  };

  return (
    <div className="signup-container">
      <div className="form-container">
        <h1 className="title-header">Sign Up</h1>
        <div className="form-group">
          <label>User Name*</label>
          <input
            onChange={(e) => setUserName(e.target.value)}
            type="text"
            required
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Email*</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Password*</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
            className="form-control"
          />
        </div>

        <label>Gender*</label>
        <div className="form-radio-group" onChange={(e) => setGender(e.target.value)}>
          <input type="radio" value="Male" name="gender" /> Male
          <input type="radio" value="Female" name="gender" /> Female
          <input type="radio" value="Other" name="gender" /> Other
        </div>

        <div className="form-group">
          <label>Phone*</label>
          <input
            onChange={(e) => setPhone(e.target.value)}
            type="number"
            required
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>DOB*</label>
          <input
            onChange={(e) => setdob(e.target.value)}
            type="date"
            required
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Address*</label>
          <input
            onChange={(e) => setAddress(e.target.value)}
            type="text"
            required
            className="form-control"
          />
        </div>

        {showRole && (
          <div className="form-group">
            <label>Role*</label>
            <select className="form-control">
              <option selected>user</option>
            </select>
          </div>
        )}

        <div className="btn-group">
          <button type="submit" onClick={addUserToDB} className="btn btn-success">
            Register
          </button>
          <button type="button" onClick={history.goBack} className="btn btn-danger">
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
