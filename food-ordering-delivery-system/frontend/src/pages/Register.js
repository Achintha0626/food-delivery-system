import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("delivery");
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    // basic validation
    if (!firstName || !lastName || !email || !username || !password) {
      setError("All fields are required.");
      return;
    }
    if (role === "customer" && !address) {
      setError("Please enter an address for customers.");
      return;
    }
    if (role === "delivery" && !location) {
      setError("Please enter a location for delivery drivers.");
      return;
    }

    try {
      const { data } = await api.post("/auth/register", {
        firstName,
        lastName,
        email,
        username,
        password,
        role,
        address: role === "customer" ? address : undefined,
        location: role === "delivery" ? location : undefined,
      });

      localStorage.setItem("x-auth-token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // success toast/alert
      alert("Registration successful! Redirecting you now…");

      // route by role
      if (data.user.role === "customer") navigate("/customer-dashboard");
      else if (data.user.role === "delivery") navigate("/driver-dashboard");
      else navigate("/admin/dashboard");
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Registration failed. Please try again."
      );
    }
  };

  const bgImage = "url('/images/bg.webp')";

  return (
    <div
      className="relative min-h-screen overflow-hidden font-sans"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      {/* Blurred background */}
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-md scale-110"
        style={{ backgroundImage: bgImage }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black opacity-40" />

      {/* Form */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-md bg-white bg-opacity-70 backdrop-blur-lg rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-semibold text-gray-900 mb-6 text-center">
            Create Account
          </h2>

          {error && (
            <p className="text-red-600 text-sm mb-4 text-center">{error}</p>
          )}

          <form onSubmit={handleRegister} className="space-y-5">
            {/* Name */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-gray-800 text-sm font-medium mb-1"
                >
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Jane"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-gray-800 text-sm font-medium mb-1"
                >
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Doe"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-gray-800 text-sm font-medium mb-1"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              />
            </div>

            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="block text-gray-800 text-sm font-medium mb-1"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="jane_doe"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              />
            </div>

            {/* Password Toggle */}
            <div>
              <label
                htmlFor="password"
                className="block text-gray-800 text-sm font-medium mb-1"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Role selector */}
            <div>
              <label
                htmlFor="role"
                className="block text-gray-800 text-sm font-medium mb-1"
              >
                Role
              </label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              >
                <option value="delivery">Delivery Driver</option>
                <option value="customer">Customer</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {/* Conditional fields */}
            {role === "customer" && (
              <div>
                <label
                  htmlFor="address"
                  className="block text-gray-800 text-sm font-medium mb-1"
                >
                  Address
                </label>
                <input
                  id="address"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="123 Main St"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                />
              </div>
            )}

            {role === "delivery" && (
              <div>
                <label
                  htmlFor="location"
                  className="block text-gray-800 text-sm font-medium mb-1"
                >
                  Location
                </label>
                <input
                  id="location"
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="City, District"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                />
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
