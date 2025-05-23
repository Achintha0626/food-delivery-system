// src/pages/customer-resturents/RestaurantsPage.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import CustomerHeader from "../../components/CustomerHeader";
import Footer from "../../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const DUMMY = [
  {
    id: 1,
    name: "The Curry Pot",
    location: "Colombo",
    img: "/images/mongolian-resturent.jpeg",
  },
  {
    id: 2,
    name: "Noodle House",
    location: "Kandy",
    img: "/images/deagon-resturent.jpeg",
  },
  { id: 3, name: "Sushi World", location: "Galle", img: "/images/sushi.jpeg" },
  {
    id: 4,
    name: "Pizza Palace",
    location: "Negombo",
    img: "/images/dominospizza-resturent.jpeg",
  },
];

export default function RestaurantsPage() {
  const [query, setQuery] = useState("");

  const filtered = DUMMY.filter(
    (r) =>
      r.name.toLowerCase().includes(query.toLowerCase()) ||
      r.location.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <CustomerHeader />

      <main className="flex-grow container mx-auto px-4 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-2">
            Discover <span className="text-orange-500">Restaurants</span> Near
            You
          </h1>
          <p className="text-gray-600">
            Find your next favorite meal in just a few taps.
          </p>
        </div>

        {/* Search Pill */}
        <div className="flex justify-center mb-16">
          <div className="relative w-full max-w-xl">
            <input
              type="text"
              placeholder="Search by name or location..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-14 pr-6 py-3 rounded-full shadow-lg border-0 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <FontAwesomeIcon
              icon={faSearch}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-400 text-xl"
            />
          </div>
        </div>

        {/* Grid of Cards */}
        {filtered.length ? (
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filtered.map((r) => (
              <Link
                key={r.id}
                to={`/restaurants/${r.id}`}
                className="group block bg-white rounded-xl shadow-md overflow-hidden transform hover:shadow-2xl hover:-translate-y-1 transition"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={r.img}
                    alt={r.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent opacity-30" />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 group-hover:text-orange-500 transition">
                    {r.name}
                  </h3>
                  <p className="text-sm text-gray-500">{r.location}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">
              No restaurants match “<span className="font-medium">{query}</span>
              ”.
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
