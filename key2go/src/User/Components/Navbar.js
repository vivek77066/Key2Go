import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminDashboard from "../../Admin/Components/AdminDashbord";
import Logout from "../../Admin/Fragments/Logout";
import EmployeeDashboard from "../../Employee/Components/EmployeeDashboard";
import ConfirmBooking from "../../Employee/Pages/ConfirmBooking";
import AboutUS from "../../User/pages/AboutUs";
import ContactUs from "../pages/ContactUs";
import BookingForm from "../../User/pages/car/BookingForm";
import CarComponent from "../../User/pages/car/CarComponent";
import AllCarCompanies from "../pages/car/AllCarCompanies";
import Home from "../pages/Home";
import BookingDetails from "../pages/User/BookingDetails";
import Login from "../pages/User/Login";
import MyBookings from "../pages/User/MyBookings";
import SignUp from "../../User/pages/User/SignUP";
import UpdateProfile from "../pages/User/UpdateProfile";


const Navbar = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/cars/:carCompanyId" element={<CarComponent />} />
        <Route path="/booking/:carId" element={<BookingForm />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/employee_dashboard" element={<EmployeeDashboard />} />
        <Route path="/all_carCompany" element={<AllCarCompanies />} />
        <Route path="/update_profile" element={<UpdateProfile />} />
        <Route path="/my_bookings" element={<MyBookings />} />
        <Route path="/admin_dashboard" element={<AdminDashboard />} />
        <Route path="/about_us" element={<AboutUS />} />
        <Route path="/contact_us" element={<ContactUs />} />
        <Route path="/booking_details" element={<BookingDetails />} />
        <Route path="/signoff" element={<Logout />} />
        <Route path="/confirm_booking" element={<ConfirmBooking />} />
        <Route path="/book_car" element={<BookingForm />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Navbar;