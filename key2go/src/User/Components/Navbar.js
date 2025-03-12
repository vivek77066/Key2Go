import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminDashboard from "../../Admin/Components/AdminDashbord";
import Logout from "../../Admin/Fragments/Logout";
import EmployeeDashboard from "../../Employee/Components/EmployeeDashboard";
import ConfirmBooking from "../../Employee/Pages/ConfirmBooking";
import AboutUS from "../../User/pages/AboutUs";
import ContactUs from "../pages/ContactUs";
import BookingForm from "../../User/pages/car/BookingForm";
import CarCategoryDetails from "../../User/pages/car/CarCategoryDetails";
import Cars from "../../User/pages/car/Cars";
import CarType from "../../User/pages/car/CarType";
import Home from "../pages/Home";
import BookingDetails from "../pages/User/BookingDetails";
import Login from "../pages/User/Login";
import MyBookings from "../pages/User/MyBookings";
import SignUp from "../../User/pages/User/SignUP";
import UpdateProfile from "../pages/User/UpdateProfile";
import HomeImageSlider from "./HomeImageSlider";


const Navbar = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/car_list" element={<Cars />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/employee_dashboard" element={<EmployeeDashboard />} />
        <Route path="/car_type" element={<CarType />} />
        <Route path="/update_profile" element={<UpdateProfile />} />
        <Route path="/my_bookings" element={<MyBookings />} />
        <Route path="/admin_dashboard" element={<AdminDashboard />} />
        <Route path="/about_us" element={<AboutUS />} />
        <Route path="/contact_us" element={<ContactUs />} />
        {/* <Route path="/error" element={<Error />} /> */}
        <Route path="/booking_details" element={<BookingDetails />} />
        <Route path="/signoff" element={<Logout />} />
        <Route path="/confirm_booking" element={<ConfirmBooking />} />
        {/* <Route path="/pay" element={<Pay />} /> */}
        <Route path="/cars-category-details" element={<CarCategoryDetails />} />
        <Route path="/book_car" element={<BookingForm />} />
        <Route path="/" element={<HomeImageSlider />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Navbar;
