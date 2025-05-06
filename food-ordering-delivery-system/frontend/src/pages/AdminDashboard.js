// src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar";
import Header from "../components/Header";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  LineController,
  PieController,
  ArcElement,
} from "chart.js";
import { Bar, Line, Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  LineController,
  PieController,
  ArcElement
);

export default function AdminDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    if (!user || user.role !== "admin") navigate("/");
  }, [user, navigate]);

  const toggleSidebar = () => setSidebarOpen((o) => !o);

  // ——— Chart Data & Options ———

  const overviewData = {
    labels: ["Total Order", "Customer Growth", "Total Revenue"],
    datasets: [
      {
        data: [81, 22, 12],
        backgroundColor: ["#F44336", "#4CAF50", "#2196F3"],
        hoverOffset: 4,
      },
    ],
  };
  const overviewOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "bottom" },
      title: { display: true, text: "Overview" },
    },
  };

  const orderChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Orders",
        data: [50, 65, 80, 70, 95, 85, 100],
        borderColor: "#9C27B0",
        tension: 0.3,
        fill: false,
      },
    ],
  };
  const orderChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: { display: true, text: "Order Chart" },
      legend: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: "Number of Orders" },
      },
    },
  };

  const revenueChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Revenue ($)",
        data: [1200, 1500, 1800, 1600, 2000, 1900, 2200],
        borderColor: "#2E7D32",
        tension: 0.3,
        fill: false,
      },
    ],
  };
  const revenueChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: { display: true, text: "Total Revenue Trend" },
      legend: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: "Revenue ($)" },
      },
    },
  };

  const customerMapData = {
    labels: ["Area A", "Area B", "Area C", "Area D", "Area E", "Area F"],
    datasets: [
      {
        label: "Number of Customers",
        data: [150, 210, 80, 320, 110, 180],
        backgroundColor: [
          "#FF6B6B",
          "#4BC0C0",
          "#FFDA6B",
          "#B370CF",
          "#76D7EA",
          "#F7DC6F",
        ],
      },
    ],
  };
  const customerMapOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: { display: true, text: "Customer Map" },
      legend: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: "Number of Customers" },
      },
    },
  };

  return (
    <div
      className="flex h-screen overflow-hidden font-sans"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      {/* Sidebar */}
      <Navbar
        className={`${
          sidebarOpen ? "w-64" : "w-0"
        } transition-all duration-300`}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-gray-50 transition-all">
        <Header onToggleSidebar={toggleSidebar} />

        <main className="p-6 overflow-y-auto">
          {/* Top widgets */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            {[
              { label: "Total Orders", value: "75" },
              { label: "Transactions", value: "357" },
              { label: "New Customers", value: "65" },
              { label: "Total Revenue", value: "$128" },
            ].map((w) => (
              <div
                key={w.label}
                className="bg-white bg-opacity-70 backdrop-blur-md rounded-xl shadow-lg p-4 flex flex-col"
              >
                <span className="text-gray-700 font-medium">{w.label}</span>
                <span className="mt-2 text-2xl font-bold text-green-600">
                  {w.value}
                </span>
              </div>
            ))}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Overview */}
            <div className="bg-white bg-opacity-70 backdrop-blur-md rounded-xl shadow-lg p-5">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">
                Overview
              </h3>
              <div className="w-full h-64 md:h-80">
                <Pie data={overviewData} options={overviewOptions} />
              </div>
            </div>

            {/* Order Chart */}
            <div className="bg-white bg-opacity-70 backdrop-blur-md rounded-xl shadow-lg p-5">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">
                Order Chart
              </h3>
              <div className="w-full h-64 md:h-80">
                <Line data={orderChartData} options={orderChartOptions} />
              </div>
            </div>

            {/* Revenue Trend */}
            <div className="bg-white bg-opacity-70 backdrop-blur-md rounded-xl shadow-lg p-5">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">
                Total Revenue Trend
              </h3>
              <div className="w-full h-64 md:h-80">
                <Line data={revenueChartData} options={revenueChartOptions} />
              </div>
            </div>

            {/* Customer Map */}
            <div className="bg-white bg-opacity-70 backdrop-blur-md rounded-xl shadow-lg p-5">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">
                Customer Map
              </h3>
              <div className="w-full h-64 md:h-80">
                <Bar data={customerMapData} options={customerMapOptions} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
