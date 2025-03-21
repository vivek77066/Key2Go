import React, { useState, useEffect } from "react";
import axios from "axios";
import { url } from "../../Commons/constants";
import { useNavigate } from "react-router-dom"; 
import Modal from "react-bootstrap/Modal";
import "./Employees.css"; // Import custom CSS

const Employees = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [showRegister, setShowRegister] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    gender: "",
    phone: "",
    dob: "",
    address: "",
    role: "employee",
  });

  useEffect(() => {
    GetAllEmployees();
  }, []);

  const GetAllEmployees = () => {
    axios.get(url + "/api/users/role/employee").then((response) => {
      console.log(response);
      if (response != null) {
        setEmployees(response.data);
      } else {
        alert("Error while loading employees");
      }
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Object.values(formData).some((val) => val === "")) {
      alert("Please fill all fields");
      return;
    }

    axios.post(url + "/api/users/addEmployee", formData).then((response) => {
      if (response != null) {
        alert("Employee added successfully");
        setShowRegister(false);
        GetAllEmployees();
      } else {
        alert("Error while adding employee");
      }
    });
  };

  const deleteUser = (id) => {
    console.log(id);
    if (!window.confirm("Are you sure you want to delete this employee?"))
      return;

    axios.delete(url + "/api/users/" + id).then((response) => {
      if (response != null) {
        alert("Employee deleted successfully");
        GetAllEmployees(); // Refresh list
      } else {
        alert("Error while deleting employee");
      }
    });
  };

  return (
    <div className="AEtitle">
      <h1 className="title">Employees Overview</h1>
      <hr />

      {/* Add Employee Button */}
      <button onClick={() => setShowRegister(true)} className="add-employee">
        Add New Employee
      </button>

      <div className={`AEcontainer ${showRegister ? "modal-open" : ""}`}>
        <Modal show={showRegister} onHide={() => setShowRegister(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Enter Employee Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit}>
              <input
                name="username"
                type="text"
                placeholder="Username"
                className="form-control"
                onChange={handleChange}
              />
              <input
                name="email"
                type="email"
                placeholder="Email"
                className="form-control"
                onChange={handleChange}
              />
              <input
                name="password"
                type="password"
                placeholder="Password"
                className="form-control"
                onChange={handleChange}
              />
              <input
                name="phone"
                type="text"
                placeholder="Phone"
                className="form-control"
                onChange={handleChange}
              />
              <input
                name="dob"
                type="date"
                className="form-control"
                onChange={handleChange}
              />
              <input
                name="address"
                type="text"
                placeholder="Address"
                className="form-control"
                onChange={handleChange}
              />

              <label>Gender:</label>
              <div className="form-check">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  className="form-check-input"
                  onChange={handleChange}
                />
                <label className="form-check-label">Male</label>
              </div>
              <div className="form-check">
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  className="form-check-input"
                  onChange={handleChange}
                />
                <label className="form-check-label">Female</label>
              </div>
              <div className="form-check">
                <input
                  type="radio"
                  name="gender"
                  value="Other"
                  className="form-check-input"
                  onChange={handleChange}
                />
                <label className="form-check-label">Other</label>
              </div>

              <button type="submit" className="btn btn-success w-100 mt-3">
                Add Employee
              </button>
            </form>
          </Modal.Body>
        </Modal>

        <hr />
        <h4>Employee List</h4>
        <div className="Admin_table-container">
          <table className="Admin_custom-table">
            <thead className="Admin_label_table">
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Address</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp.userId}>
                  <td>{emp.username}</td>
                  <td>{emp.phone}</td>
                  <td>{emp.email}</td>
                  <td>{emp.address}</td>
                  <td>
                    <button
                      onClick={() => deleteUser(emp.userId)}
                      className="Button_Delete"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Employees;
