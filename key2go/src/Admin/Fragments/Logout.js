import { useNavigate } from "react-router-dom";
import "./Logout.css"; // Import the CSS file

const Logout = () => {
  const navigate = useNavigate(); // ✅ Use useNavigate instead of useHistory

  const handleLogout = () => {
    window.sessionStorage.removeItem("user");
    window.sessionStorage.removeItem("isActive");
    navigate("/"); // ✅ Use navigate instead of history.push
  };

  return (
    <div className="container">
      <h4 className="center-text">Want to Logout</h4>
      <div className="card">
        <div className="card-body">
          <h5 className="center-text">Click Here to Logout</h5>
          <button className="btn" onClick={handleLogout}>Logout</button> {/* ✅ Change <a> to <button> */}
        </div>
      </div>
      <h5 className="center-text">Thank You....</h5>
    </div>
  );
};

export default Logout;
