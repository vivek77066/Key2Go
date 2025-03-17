import { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import { url } from "../../Commons/constants";

const Car = () => {
  const [cars, setCars] = useState([]);
  const [showRegister, setShowRegister] = useState(false);
  const [carCompany, setCarCompany] = useState([]);
  const [carName, setCarName] = useState("");
  const [carNumber, setCarNumber] = useState("");
  const [carColor, setCarColor] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [seatingCapacity, setSeatingCapacity] = useState(0);
  const [rentPerDay, setRentPerDay] = useState(0);
  const [carImg, setCarImg] = useState(null);
  const [selectedCarCompany, setSelectedCarCompany] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchCarCompanies();
    fetchCars();
  }, []);

  const fetchCarCompanies = async () => {
    try {
      const res = await axios.get(url + "/api/cars/company");
      if (Array.isArray(res.data)) {
        setCarCompany(res.data);
      } else {
        setCarCompany([]); // Ensure it's an array
        console.error("Unexpected response format:", res.data);
      }
    } catch (error) {
      console.error("Error fetching car categories:", error);
    }
  };

  const fetchCars = async () => {
    try {
      const response = await axios.get(url + "/api/cars");
      if (Array.isArray(response.data)) {
        setCars(response.data);
      } else {
        setCars([]);
        console.error("Unexpected response format:", response.data);
      }
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !carName ||
      !carNumber ||
      !carColor ||
      !fuelType ||
      !rentPerDay ||
      !carImg ||
      !selectedCarCompany
    ) {
      alert("All fields are required");
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append("carName", carName);
    formData.append("carNumber", carNumber);
    formData.append("carColor", carColor);
    formData.append("fuelType", fuelType);
    formData.append("rentPerDay", rentPerDay);
    formData.append("seatingCapacity", seatingCapacity);
    formData.append("carCompanyId", selectedCarCompany);
    formData.append("carImg", carImg);
    console.log(selectedCarCompany)
    console.log(carImg)

    console.log(formData);
    await axios.post(url + "/api/cars/add", formData)
    .then((response) => {
      if (response.data) {
        alert("Car added successfully");
        fetchCars();
        handleClose()
      } else {
        alert("Error while adding");
      }
    })
  };

  const deleteCar = async (id) => {
    try {
      await axios.delete(url + `/api/cars/${id}`);
      alert("Car deleted successfully");
      fetchCars();
    } catch (error) {
      alert("Error while deleting car");
      console.error(error);
    }
  };

  const handleClose = () => {
    setShowRegister(false);
    setSelectedCarCompany(0);
    setCarName("");
    setFuelType("");
    setRentPerDay(0);
    setCarNumber("");
    setCarColor("");
    setSeatingCapacity(0);
    setCarImg(null);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setCarImg(e.target.files[0]);
    }
  };

  return (
    <div className="container">
      <h4 className="page-header">Cars</h4>
      <div className="fcard">
        <div className="card-header">Add New Car</div>
        <button
          onClick={() => setShowRegister(true)}
          className="btn btn-primary"
        >
          Add Car
        </button>
        <Modal show={showRegister} onHide={handleClose} size="lg" scrollable>
          <Modal.Header closeButton>
            <Modal.Title>Add Car</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ maxHeight: "70vh", overflowY: "auto" }}>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="form-group">
                <label>Car Company</label>
                <select
                  onChange={(e) => setSelectedCarCompany(e.target.value)}
                  className="form-control"
                  required
                >
                  <option value="">Select Company</option>
                  {Array.isArray(carCompany) &&
                    carCompany.map((company) => (
                      <option
                        key={company.carCompanyId}
                        value={company.carCompanyId}
                      >
                        {company.companyName}
                      </option>
                    ))}
                </select>
              </div>
              <div className="form-group">
                <label>Car Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Car Name"
                  value={carName}
                  onChange={(e) => setCarName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Car Number</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Car Number"
                  value={carNumber}
                  onChange={(e) => setCarNumber(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Car Color</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Car Color"
                  value={carColor}
                  onChange={(e) => setCarColor(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Seating Capacity</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Car Seating Capacity"
                  value={seatingCapacity}
                  onChange={(e) => setSeatingCapacity(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Car Rent Per Day</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Rent Per Day"
                  value={rentPerDay}
                  onChange={(e) => setRentPerDay(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Car Fuel Type</label>
                <select
                  value={fuelType}
                  onChange={(e) => setFuelType(e.target.value)}
                  className="form-control"
                  required
                >
                  <option value="">Select Fuel Type</option>
                  <option value="PETROL">PETROL</option>
                  <option value="DIESEL">DIESEL</option>
                  <option value="CNG">CNG</option>
                  <option value="EV">EV</option>
                </select>
              </div>
              <div className="form-group">
                <label>Car Image</label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*"
                  className="form-control"
                  required
                />
                {carImg && (
                  <div className="mt-2">
                    <p>Selected file: {carImg.name}</p>
                    <img
                      src={URL.createObjectURL(carImg) || "/placeholder.svg"}
                      alt="Car preview"
                      style={{ maxWidth: "100%", maxHeight: "200px" }}
                    />
                  </div>
                )}
              </div>
              <button
                type="submit"
                className="btn btn-success w-100"
                disabled={isLoading}
              >
                {isLoading ? "Adding..." : "Add"}
              </button>
            </form>
          </Modal.Body>
        </Modal>
      </div>

      <h4>Available Cars</h4>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Car Name</th>
            <th>Car Company</th>
            <th>Car Number</th>
            <th>Seating Capacity</th>
            <th>Car Color</th>
            <th>Car Fuel Type</th>
            <th>Car RentPerDay</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(cars) &&
            cars
              .map((car, index) => (
                <tr key={car.carId}>
                  <td>{index + 1}</td>
                  <td>
                    {car.carImg && (
                      <img
                        src={
                          typeof car.carImg === "string"
                            ? car.carImg
                            : URL.createObjectURL(new Blob([car.carImg]))
                        }
                        alt={car.carName}
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                        }}
                      />
                    )}
                  </td>
                  <td>{car.carName}</td>
                  <td>{car.carCompanyId?.companyName}</td>
                  <td>{car.carNumber}</td>
                  <td>{car.seatingCapacity}</td>
                  <td>{car.carColor}</td>
                  <td>{car.fuelType}</td>
                  <td>{car.rentPerDay}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteCar(car.carId)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
              .reverse()}
        </tbody>
      </table>
    </div>
  );
};

export default Car;
