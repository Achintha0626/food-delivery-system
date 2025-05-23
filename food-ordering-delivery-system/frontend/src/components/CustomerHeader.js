// src/components/CustomerHeader.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faShoppingCart,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

export default function CustomerHeader() {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <header className="bg-gradient-to-r from-orange-500 to-red-500 shadow-lg">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <Link to="/" className="text-2xl font-bold text-white">
          Eato
        </Link>

        <nav className="hidden md:flex space-x-6">
          {["Home", "Restaurants", "Menu", "My Orders"].map((item) => (
            <Link
              key={item}
              to={`/${item.replace(" ", "").toLowerCase()}`}
              className="text-white hover:text-yellow-200 transition"
            >
              {item}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          <button className="text-white hover:text-yellow-200" title="Search">
            <FontAwesomeIcon icon={faSearch} />
          </button>
          <button className="text-white hover:text-yellow-200" title="Cart">
            <FontAwesomeIcon icon={faShoppingCart} />
          </button>
          <button
            onClick={handleSignOut}
            className="text-white hover:text-yellow-200"
            title="Sign Out"
          >
            <FontAwesomeIcon icon={faSignOutAlt} />
          </button>
        </div>
      </div>
    </header>
  );
}
