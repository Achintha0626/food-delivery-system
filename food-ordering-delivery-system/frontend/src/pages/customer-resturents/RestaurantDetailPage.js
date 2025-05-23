// src/pages/customer-resturents/RestaurantDetailPage.js
import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import CustomerHeader from "../../components/CustomerHeader";
import Footer from "../../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faMinus,
  faShoppingCart,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

// Map restaurant ID → banner image & display name
const RESTAURANTS = {
  1: {
    name: "The Curry Pot",
    banner: "/images/mongolian-resturent.jpeg",
  },
  2: {
    name: "Noodle House",
    banner: "/images/deagon-resturent.jpeg",
  },
  // add more restaurants here...
};

// Dummy menus keyed by restaurant ID:
const MENUS = {
  1: [
    {
      id: "1-1",
      name: "Chicken Curry",
      price: 500,
      img: "/images/chickencurry.jpeg",
    },
    { id: "1-2", name: "Fish Fry", price: 450, img: "/images/fishfry.jpeg" },
  ],
  2: [
    {
      id: "2-1",
      name: "Veg Noodles",
      price: 350,
      img: "/images/noodles1.jpeg",
    },
    {
      id: "2-2",
      name: "Spring Rolls",
      price: 300,
      img: "/images/springrolls.jpeg",
    },
  ],
};

export default function RestaurantDetailPage() {
  const { id } = useParams();
  const items = MENUS[id] || [];
  const [selected, setSelected] = useState({}); // { itemId: qty }
  const navigate = useNavigate();

  // select / deselect item
  const toggle = (itemId) =>
    setSelected((s) => {
      const copy = { ...s };
      if (copy[itemId]) delete copy[itemId];
      else copy[itemId] = 1;
      return copy;
    });

  const inc = (itemId) =>
    setSelected((s) => ({ ...s, [itemId]: s[itemId] + 1 }));

  const dec = (itemId) =>
    setSelected((s) => {
      const next = s[itemId] - 1;
      if (next <= 0) {
        const c = { ...s };
        delete c[itemId];
        return c;
      }
      return { ...s, [itemId]: next };
    });

  const clearAll = () => setSelected({});

  // Build orderItems and navigate to payment
  const handlePlaceOrder = () => {
    const orderItems = items
      .filter((item) => selected[item.id])
      .map((item) => ({ ...item, quantity: selected[item.id] }));
    navigate("/payment", {
      state: {
        orderItems,
        restName: RESTAURANTS[id]?.name || "Restaurant",
      },
    });
  };

  // Pull restaurant info
  const restInfo = RESTAURANTS[id] || {};
  const heroImg = restInfo.banner || "/images/restaurant-hero.jpg";
  const restName = restInfo.name || "Restaurant";

  const totalItems = Object.values(selected).reduce((a, b) => a + b, 0);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <CustomerHeader />

      <main className="flex-grow">
        {/* Hero Banner */}
        <div
          className="relative h-64 bg-center bg-cover"
          style={{ backgroundImage: `url(${heroImg})` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <h1 className="text-white text-4xl md:text-5xl font-extrabold">
              {restName}
            </h1>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <Link
            to="/restaurants"
            className="inline-block text-orange-500 hover:underline mb-6"
          >
            ← Back to Restaurants
          </Link>

          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="relative bg-white rounded-xl shadow group overflow-hidden transform hover:-translate-y-1 hover:shadow-2xl transition"
              >
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-40 object-cover group-hover:scale-105 transition"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-1">{item.name}</h3>
                  <p className="text-orange-500 font-bold mb-4">
                    Rs. {item.price.toFixed(2)}
                  </p>

                  {!selected[item.id] ? (
                    <button
                      onClick={() => toggle(item.id)}
                      className="w-full py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
                    >
                      Add to Cart
                    </button>
                  ) : (
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => dec(item.id)}
                        className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition"
                      >
                        <FontAwesomeIcon icon={faMinus} />
                      </button>
                      <span className="font-medium">{selected[item.id]}</span>
                      <button
                        onClick={() => inc(item.id)}
                        className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition"
                      >
                        <FontAwesomeIcon icon={faPlus} />
                      </button>
                      <button
                        onClick={() => toggle(item.id)}
                        className="p-2 text-red-500 hover:text-red-600 transition"
                      >
                        <FontAwesomeIcon icon={faTimes} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Sticky footer bar */}
      {totalItems > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg px-4 py-3 flex items-center justify-between">
          <button
            onClick={clearAll}
            className="text-red-500 hover:underline flex items-center space-x-1"
          >
            <FontAwesomeIcon icon={faTimes} />
            <span>Clear All</span>
          </button>
          <button
            onClick={handlePlaceOrder}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
          >
            <FontAwesomeIcon icon={faShoppingCart} />
            <span>Place Order ({totalItems})</span>
          </button>
        </div>
      )}

      <Footer />
    </div>
  );
}
