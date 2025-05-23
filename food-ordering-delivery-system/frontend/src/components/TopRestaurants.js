import React from "react";

const restaurants = [
  { name: "The Curry Pot", img: "/images/mongolian-resturent.jpeg" },
  { name: "Power Hiuse", img: "/images/gym-kitchen-resturent.jpeg" },
  { name: "Pizza World", img: "/images/dominospizza-resturent.jpeg" },
  { name: "Chinese Palace", img: "/images/deagon-resturent.jpeg" },
];

export default function TopRestaurants() {
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-semibold mb-4">Top Restaurants Near You</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {restaurants.map((r) => (
          <div
            key={r.name}
            className="bg-white rounded-lg shadow-sm overflow-hidden"
          >
            <img
              src={r.img}
              alt={r.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="font-medium">{r.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
