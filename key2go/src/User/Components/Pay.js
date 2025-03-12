import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Replacing useHistory with useNavigate
import { url } from "../../Commons/constants";
import "./Pay.css"; // Import the CSS file

function Pay() {
  const [booking, setBooking] = useState({});
  const navigate = useNavigate(); // Using useNavigate instead of useHistory

  useEffect(() => {
    let book = JSON.parse(sessionStorage.getItem("conBooking"));
    setBooking(book);
  }, []);

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  }

  async function displayRazorpay() {
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    let obj = { 
      "amount": JSON.parse(sessionStorage.getItem("amount")),
      "bookingid": JSON.parse(sessionStorage.getItem("bookingid")),
    };

    const result = await axios.post("http://localhost:4000/api/pay/create_order", obj);
    if (!result) {
      alert("Server error. Are you online?");
      return;
    }
    sessionStorage.removeItem("amount");

    var { amount, id: order_id, currency } = result.data;
    amount = amount * 100;

    const options = {
      key: "rzp_test_htD0V8iqnPJHNN", 
      amount: amount.toString(),
      currency,
      name: "RentPeCar",
      image: "http://localhost:1337/logo.png",
      description: "Test Transaction",
      order_id,
      handler: async function (response) {
        const data = {
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };

        axios.put("http://localhost:4000/api/pay/update_pay_order", data)
          .then(() => navigate("/car_type")) // Using navigate instead of history.push
          .catch(() => {
            alert("Some error occurred!");
            navigate(-1); // Replacing history.goBack()
          });
      },
      prefill: {
        name: "Ravi Dubey",
        email: "ravi123@gmail.com",
        contact: "7007123456",
      },
      notes: { address: "" },
      theme: { color: "#61dafb" },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  return (
    <div className="pay-container">
      <h1>Checkout to Pay</h1>
      <label>Amount to Pay: </label>
      <h2 className="amount-box">₹ {JSON.parse(sessionStorage.getItem("amount"))}</h2>
      <button className="btn btn-success" onClick={displayRazorpay}>Pay</button>
      <button className="btn btn-danger" onClick={() => navigate(-1)}>Back</button> 
      {/* Using navigate(-1) to go back */}
    </div>
  );
}

export default Pay;
