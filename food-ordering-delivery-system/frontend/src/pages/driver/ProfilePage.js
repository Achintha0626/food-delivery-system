// src/pages/driver/ProfilePage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DriverNavBar from "../../components/DriverNavBar";
import Header from "../../components/Header";

export default function ProfilePage() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  // Load user from localStorage (or use defaults)
  const stored = JSON.parse(localStorage.getItem("user")) || {};
  const defaults = {
    firstName: "Jane",
    lastName: "Doe",
    email: "jane.doe@example.com",
    username: "jane_doe",
    phone: "071-123-4567",
    vehicle: "Toyota Prius",
    license: "WP-AB-1234",
    location: "Colombo Fort",
  };

  // Local profile state
  const [profile, setProfile] = useState({ ...defaults, ...stored });
  // Keep a copy of original to allow cancel
  const [originalProfile, setOriginalProfile] = useState(profile);

  // Auth guard
  useEffect(() => {
    if (!stored || stored.role !== "delivery") navigate("/");
  }, [navigate, stored]);

  const toggleSidebar = () => setSidebarOpen((o) => !o);

  // Handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((p) => ({ ...p, [name]: value }));
  };

  const startEditing = () => {
    setOriginalProfile(profile);
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setProfile(originalProfile);
    setIsEditing(false);
  };

  const saveProfile = () => {
    // Persist back to localStorage.user
    const updatedUser = { ...stored, ...profile };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setIsEditing(false);
    alert("Profile saved!");
  };

  // Render a single field card
  const FieldCard = ({ label, name, value }) => (
    <div className="bg-white bg-opacity-70 backdrop-blur-md rounded-xl shadow-lg p-5">
      <span className="text-gray-600 text-sm">{label}</span>
      {isEditing ? (
        <input
          name={name}
          value={value}
          onChange={handleChange}
          className="mt-2 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      ) : (
        <p className="mt-2 text-lg font-medium text-gray-800">{value}</p>
      )}
    </div>
  );

  return (
    <div
      className="flex h-screen overflow-hidden font-sans"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      {/* Sidebar */}
      <DriverNavBar
        className={`${
          sidebarOpen ? "w-64" : "w-0"
        } transition-all duration-300`}
      />

      {/* Main */}
      <div className="flex-1 flex flex-col bg-gray-50 transition-all">
        <Header onToggleSidebar={toggleSidebar} />

        <main className="p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">My Profile</h2>
            {isEditing ? (
              <div className="space-x-2">
                <button
                  onClick={saveProfile}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
                >
                  Save
                </button>
                <button
                  onClick={cancelEditing}
                  className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={startEditing}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
              >
                Edit Profile
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FieldCard
              label="First Name"
              name="firstName"
              value={profile.firstName}
            />
            <FieldCard
              label="Last Name"
              name="lastName"
              value={profile.lastName}
            />
            <FieldCard label="Email" name="email" value={profile.email} />
            <FieldCard
              label="Username"
              name="username"
              value={profile.username}
            />
            <FieldCard label="Phone" name="phone" value={profile.phone} />
            <FieldCard label="Vehicle" name="vehicle" value={profile.vehicle} />
            <FieldCard
              label="License Plate"
              name="license"
              value={profile.license}
            />
            <FieldCard
              label="Home Base"
              name="location"
              value={profile.location}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
