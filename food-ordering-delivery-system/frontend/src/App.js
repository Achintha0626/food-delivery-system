// src/App.js
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import CustomerDashboard from "./pages/CustomerDashboard";
import DriverDashboard from "./pages/DriverDashboard";
import AdminDashboard from "./pages/AdminDashboard";

// ADMIN PAGES
import ManageRestaurants from "./pages/admin-resturents/ManageRestaurants";
import AddRestaurant from "./pages/admin-resturents/AddRestaurant";
import EditRestaurantPage from "./pages/admin-resturents/EditRestaurantPage"; // ← NEW
import ManageMenu from "./pages/admin-resturents/ManageMenu";
import ManageOrders from "./pages/admin-resturents/ManageOrders";

// CUSTOMER PAGES
import RestaurantsPage from "./pages/customer-resturents/RestaurantsPage";
import RestaurantDetailPage from "./pages/customer-resturents/RestaurantDetailPage";
import PaymentPage from "./pages/customer-resturents/PaymentPage";

// DRIVER PAGES
import TripsPage from "./pages/driver/TripsPage";
import RatingsPage from "./pages/driver/RatingsPage";
import ProfilePage from "./pages/driver/ProfilePage";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));

  // Determine home route based on role
  const getHomeRoute = () => {
    if (!user) return "/login";
    switch (user.role) {
      case "admin":
        return "/admin/dashboard";
      case "customer":
        return "/customer-dashboard";
      case "driver":
      case "delivery":
        return "/driver/dashboard";
      default:
        return "/login";
    }
  };

  return (
    <Router>
      <Routes>
        {/* PUBLIC */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* ROOT REDIRECT */}
        <Route path="/" element={<Navigate to={getHomeRoute()} replace />} />

        {/* CUSTOMER */}
        <Route path="/restaurants" element={<RestaurantsPage />} />
        <Route path="/restaurants/:id" element={<RestaurantDetailPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/customer-dashboard" element={<CustomerDashboard />} />

        {/* DRIVER */}
        <Route path="/driver/dashboard" element={<DriverDashboard />} />
        <Route path="/driver/trips" element={<TripsPage />} />
        <Route path="/driver/ratings" element={<RatingsPage />} />
        <Route path="/driver/profile" element={<ProfilePage />} />

        {/* ADMIN */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        {/* Manage Restaurants */}
        <Route path="/admin/restaurants" element={<ManageRestaurants />} />
        <Route path="/admin/restaurants/add" element={<AddRestaurant />} />
     
        <Route
          path="/admin/restaurants/edit/:id"
          element={<EditRestaurantPage />}
        />

        {/* Manage Menu & Orders */}
        <Route path="/admin/menu" element={<ManageMenu />} />
        <Route path="/admin/orders" element={<ManageOrders />} />

        {/* CATCH-ALL */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
