// src/pages/customer-resturents/PaymentPage.js
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CustomerHeader from "../../components/CustomerHeader";
import Footer from "../../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

export default function PaymentPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { orderItems = [], restName = "" } = state || {};

  const [houseNo, setHouseNo] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [postal, setPostal] = useState("");

  const total = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const isAddressComplete = houseNo && street && city && postal;

  const handleConfirm = async () => {
    const fullAddress = `${houseNo}, ${street}, ${city}, ${postal}`;

    // grab user email from localStorage
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const email = user.email;

    // prepare payload
    const payload = {
      email,
      restName,
      orderItems,
      total,
      address: fullAddress,
    };

    try {
      // const res = await fetch("http://localhost:3001/api/orders", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(payload),
      // });
      // if (!res.ok) throw new Error("Network response was not ok");

      // success
      alert("Your order is confirmed! Check your email for details.");
      navigate("/customer-dashboard"); // or navigate to an orders page
    } catch (err) {
      console.error(err);
      alert("Failed to place order. Please try again.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <CustomerHeader />

      <main className="flex-grow container mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="text-orange-500 hover:underline mb-4 flex items-center"
        >
          <FontAwesomeIcon icon={faChevronLeft} className="mr-2" />
          Back
        </button>

        <h1 className="text-2xl font-semibold mb-6">Payment for {restName}</h1>

        {/* Order Summary */}
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <h2 className="font-semibold mb-4">Order Summary</h2>
          <ul className="divide-y divide-gray-200">
            {orderItems.map((item) => (
              <li
                key={item.id}
                className="py-3 flex justify-between items-center"
              >
                <p className="font-medium">
                  {item.name} × {item.quantity}
                </p>
                <p>Rs. {(item.price * item.quantity).toFixed(2)}</p>
              </li>
            ))}
          </ul>
          <div className="pt-4 flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>Rs. {total.toFixed(2)}</span>
          </div>
        </div>

        {/* Structured Address Form */}
        <div className="bg-white rounded-xl shadow p-6 mb-6 space-y-4">
          <h2 className="font-semibold mb-2">Delivery Address</h2>

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="houseNo">
              House No.
            </label>
            <input
              id="houseNo"
              type="text"
              value={houseNo}
              onChange={(e) => setHouseNo(e.target.value)}
              placeholder="e.g. 123A"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="street">
              Street Name
            </label>
            <input
              id="street"
              type="text"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              placeholder="e.g. Baker Street"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="city">
              City
            </label>
            <input
              id="city"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="e.g. Colombo"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="postal">
              Postal Code
            </label>
            <input
              id="postal"
              type="text"
              value={postal}
              onChange={(e) => setPostal(e.target.value)}
              placeholder="e.g. 00100"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
        </div>

        {/* Confirm Button */}
        <button
          onClick={handleConfirm}
          disabled={!isAddressComplete}
          className={`w-full py-3 rounded-lg text-white font-semibold transition ${
            isAddressComplete
              ? "bg-orange-500 hover:bg-orange-600"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Confirm Payment
        </button>
      </main>

      <Footer />
    </div>
  );
}
