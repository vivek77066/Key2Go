import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { url } from "../../../Commons/constants";
import "./UpdateProfile.css"; // Importing the CSS file

const UpdateProfile = () => {
  const history = useNavigate();
  let user = JSON.parse(sessionStorage.getItem("user"));

  const [username, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const updateUserInDB = () => {
    setLoading(true);

    const updatedUsername = username.trim() || user.data.username;
    const updatedPhone = phone.trim() || user.data.phone;
    const updatedAddress = address.trim() || user.data.address;

    const data = new FormData();
    data.append("username", updatedUsername);
    data.append("phone", updatedPhone);
    data.append("address", updatedAddress);

    axios
      .put(`${url}/user/updateProfile/${user.data.userid}`, data)
      .then((response) => {
        setLoading(false);
        const result = response.data;

        if (result.status === "success") {
          alert("Profile updated successfully");

          const updatedUser = {
            ...user,
            data: {
              ...user.data,
              username: updatedUsername,
              phone: updatedPhone,
              address: updatedAddress,
            },
          };

          sessionStorage.setItem("user", JSON.stringify(updatedUser));
          history.push("/");
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
            placeholder={user.data.username}
          />
        </div>

        <div className="form-group">
          <label>Phone</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setPhone(e.target.value)}
            placeholder={user.data.phone}
          />
        </div>

        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setAddress(e.target.value)}
            placeholder={user.data.address}
          />
        </div>

        <div className="btn-group">
          <button onClick={updateUserInDB} className="btn btn-success">Update</button>
          <button onClick={history.goBack} className="btn btn-warning">Back</button>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
