import React, { useState, useEffect } from "react";
import axios from "axios";
import { url } from "../../Commons/constants";
import { useNavigate } from "react-router-dom"; // ✅ Replace useHistory with useNavigate
import Modal from "react-bootstrap/Modal";
import "./Employees.css"; // Import custom CSS

const Employees = () => {
  const navigate = useNavigate(); // ✅ Use useNavigate instead of useHistory
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
    axios.get(url + "/user/role/employee").then((response) => {
      if (response.data.status === "success") {
        setEmployees(response.data.data);
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

    axios.post(url + "/user/addEmployee", formData).then((response) => {
      if (response.data.status === "success") {
        alert("Employee added successfully");
        setShowRegister(false);
        GetAllEmployees(); // Refresh list
      } else {
        alert("Error while adding employee");
      }
    });
  };

  const deleteUser = (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;

    axios.delete(url + "/user/" + id).then((response) => {
      if (response.data.status === "success") {
        alert("Employee deleted successfully");
        GetAllEmployees(); // Refresh list
      } else {
        alert("Error while deleting employee");
      }
    });
  };

  return (
    <div className="container">
      <h1 className="title">Employees Overview</h1>
      <hr />

      {/* Add Employee Button */}
      <button onClick={() => setShowRegister(true)} className="btn btn-primary">
        Add New Employee
      </button>

      {/* Employee Registration Modal */}
      <Modal show={showRegister} onHide={() => setShowRegister(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Enter Employee Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <input name="username" type="text" placeholder="Username" className="form-control" onChange={handleChange} />
            <input name="email" type="email" placeholder="Email" className="form-control" onChange={handleChange} />
            <input name="password" type="password" placeholder="Password" className="form-control" onChange={handleChange} />
            <input name="phone" type="text" placeholder="Phone" className="form-control" onChange={handleChange} />
            <input name="dob" type="date" className="form-control" onChange={handleChange} />
            <input name="address" type="text" placeholder="Address" className="form-control" onChange={handleChange} />

            <label>Gender:</label>
            <div className="form-check">
              <input type="radio" name="gender" value="Male" className="form-check-input" onChange={handleChange} />
              <label className="form-check-label">Male</label>
            </div>
            <div className="form-check">
              <input type="radio" name="gender" value="Female" className="form-check-input" onChange={handleChange} />
              <label className="form-check-label">Female</label>
            </div>
            <div className="form-check">
              <input type="radio" name="gender" value="Other" className="form-check-input" onChange={handleChange} />
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
      <div className="table-container">
        <table className="custom-table">
          <thead>
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
              <tr key={emp.id}>
                <td>{emp.username}</td>
                <td>{emp.phone}</td>
                <td>{emp.email}</td>
                <td>{emp.address}</td>
                <td>
                  <button onClick={() => deleteUser(emp.id)} className="btn btn-danger btn-sm">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Employees;
