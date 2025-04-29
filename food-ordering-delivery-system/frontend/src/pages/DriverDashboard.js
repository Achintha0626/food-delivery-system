import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DriverNavBar from "../components/DriverNavBar";
import Header from "../components/Header"; // reuse the same Header

export default function DriverDashboard() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Dummy auth guard
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== "delivery") {
      navigate("/");
    }
  }, [navigate]);

  const toggleSidebar = () => setSidebarOpen((o) => !o);

  // Dummy stats
  const stats = [
    { label: "Completed Trips", value: "124" },
    { label: "Pending Trips", value: "  5" },
    { label: "Avg. Rating", value: "4.8 ⭐" },
    { label: "Current Vehicle", value: "Toyota Prius" },
    { label: "Current Location", value: "Colombo Fort" },
  ];

  return (
    <div
      className="flex h-screen overflow-hidden font-sans"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      {/* Driver Sidebar */}
      <DriverNavBar
        className={`${
          sidebarOpen ? "w-64" : "w-0"
        } transition-all duration-300`}
      />

      {/* Main area */}
      <div className="flex-1 flex flex-col bg-gray-50 transition-all">
        <Header onToggleSidebar={toggleSidebar} />

        <main className="p-6 overflow-y-auto">
          <h2 className="text-2xl font-semibold mb-6">Driver Dashboard</h2>

          {/* Stats Tiles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {stats.map((s) => (
              <div
                key={s.label}
                className="bg-white bg-opacity-70 backdrop-blur-md rounded-xl shadow-lg p-6 flex flex-col"
              >
                <span className="text-gray-700 font-medium">{s.label}</span>
                <span className="mt-2 text-3xl font-bold text-blue-600">
                  {s.value}
                </span>
              </div>
            ))}
          </div>

          {/* Placeholder for future content */}
          <div className="bg-white bg-opacity-70 backdrop-blur-md rounded-xl shadow-lg p-6">
            <p className="text-gray-600">
              Here you could display upcoming trips, a map, or detailed stats.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
