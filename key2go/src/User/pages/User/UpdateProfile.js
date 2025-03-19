import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { url } from "../../../Commons/constants";
import "./UpdateProfile.css"; // Importing the CSS file

const UpdateProfile = () => {
  const navigate = useNavigate();
  let user = JSON.parse(sessionStorage.getItem("user"));

  const [username, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const updateUserInDB = () => {
    setLoading(true);

    const updatedUsername = username.trim() || user.username;
    const updatedPhone = phone.trim() || user.phone;
    const updatedAddress = address.trim() || user.address;

    const data = {
      username: updatedUsername,
      phone: updatedPhone,
      address: updatedAddress,
    };

    axios
      .put(`${url}/api/users/updateProfile/${user.userId}`, data)
      .then((response) => {
        setLoading(false);
        const result = response.data;

        if (result != null) {
          alert("Profile updated successfully");

          const updatedUser =response.data; 

          sessionStorage.setItem("user", JSON.stringify(updatedUser));
          navigate("/");
        } else {
          alert("Error while updating");
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error("Update Error:", error);
        alert("Error while updating profile.");
      });
  };

  if (loading) {
    return <h1 className="loading-text">Loading...</h1>;
  }

  return (
    <div className="update-profile-container">
      <div className="form-container">
        <h1 className="title-header">Update Profile</h1>

        <div className="form-group">
          <label>User Name</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setUserName(e.target.value)}
            placeholder={user.username}
          />
        </div>

        <div className="form-group">
          <label>Phone</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setPhone(e.target.value)}
            placeholder={user.phone}
          />
        </div>

        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setAddress(e.target.value)}
            placeholder={user.address}
          />
        </div>

        <div className="btn-group">
          <button onClick={updateUserInDB} className="btn btn-success">
            Update
          </button>
          <button
            onClick={() => {
              navigate(-1);
            }}
            className="btn btn-warning"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
