import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Please enter both username and password.");
      return;
    }

    try {
      const { data } = await api.post("/auth/login", { username, password });
      localStorage.setItem("x-auth-token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      switch (data.user.role) {
        case "admin":
          navigate("/admin/dashboard");
          break;
        case "customer":
          navigate("/customer-dashboard");
          break;
        default:
          navigate("/driver-dashboard");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid credentials.");
    }
  };

  return (
    <div
      className="relative min-h-screen overflow-hidden font-sans"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      {/* Blurred, zoomed background */}
      <div
        className="absolute inset-0 bg-cover bg-center filter scale-110"
        style={{ backgroundImage: "url('/images/logins.jpg')" }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black opacity-40" />

      {/* Form container */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-sm bg-white bg-opacity-70 backdrop-blur-lg rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-semibold text-gray-900 mb-6 text-center">
            Welcome Back
          </h2>

          {error && (
            <p className="text-red-600 text-sm mb-4 text-center">{error}</p>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
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
                placeholder="Enter your username"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              />
            </div>

            {/* Password with toggle */}
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
                  placeholder="Enter your password"
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

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition"
            >
              Login
            </button>
          </form>

          {/* Register Link */}
          <p className="mt-6 text-center text-sm text-gray-700">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 hover:underline font-medium"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
