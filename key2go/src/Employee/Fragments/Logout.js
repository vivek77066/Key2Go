import { useNavigate } from "react-router-dom";
import "./Logout.css"; // Import the CSS file

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    window.sessionStorage.removeItem("user");
    window.sessionStorage.removeItem("isActive");
    navigate("/");
  };

  return (
    <div className="container">
      <h4 className="center-text">Want to Logout</h4>
      <div className="card">
        <div className="card-header">Logout...</div>
        <div className="card-body">
          <h5 className="center-text">Click Here to Logout</h5>
          <button className="btn-primary" onClick={handleLogout}>Logout</button>
        </div>
      </div>
      <h5 className="center-text">Thank You.....!!!</h5>
    </div>
  );
};

export default Logout;
