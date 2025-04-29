// src/components/DriverNavBar.jsx
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  HomeIcon,
  TruckIcon,
  StarIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

export default function DriverNavBar({ className }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const items = [
    {
      to: "/driver/dashboard",
      label: "Dashboard",
      icon: <HomeIcon className="h-5 w-5" />,
    },
    {
      to: "/driver/trips",
      label: "Trips",
      icon: <TruckIcon className="h-5 w-5" />,
    },
    {
      to: "/driver/ratings",
      label: "Ratings",
      icon: <StarIcon className="h-5 w-5" />,
    },
    {
      to: "/driver/profile",
      label: "Profile",
      icon: <UserCircleIcon className="h-5 w-5" />,
    },
  ];

  const handleSignOut = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <aside
      className={`bg-gray-800 text-white flex flex-col py-8 px-4 ${className}`}
    >
      <div className="text-2xl font-bold mb-10">Eato</div>
      <nav className="flex-1">
        <ul className="space-y-4">
          {items.map((i) => (
            <li key={i.to}>
              <Link
                to={i.to}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                  pathname === i.to ? "bg-gray-700" : "hover:bg-gray-700"
                }`}
              >
                {i.icon}
                <span className="font-medium">{i.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Sign Out */}
      <button
        onClick={handleSignOut}
        className="mt-auto flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-700 transition text-red-400"
      >
        <ArrowRightOnRectangleIcon className="h-5 w-5" />
        <span className="font-medium">Sign Out</span>
      </button>
    </aside>
  );
}
