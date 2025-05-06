import React from "react";

const categories = [
  { name: "Salad", img: "/images/chicken-caprese-salad.webp" },
  { name: "Rolls", img: "/images/Chicken-Spring-Rolls.jpg" },
  { name: "Desserts", img: "/images/Panna-Cotta-desert.jpg" },
  { name: "Sandwich", img: "/images/sandwitch.webp" },
  { name: "Cake", img: "/images/cake.jpeg" },
  { name: "Pure Veg", img: "/images/pureveg.avif" },
  { name: "Pasta", img: "/images/pasta.jpg" },
  { name: "Noodles", img: "/images/noodles.jpeg" },
];

export default function FoodCategories() {
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-semibold mb-4">Food categories</h2>
      <div className="flex space-x-6 overflow-x-auto pb-4">
        {categories.map((c) => (
          <div key={c.name} className="flex-shrink-0 text-center">
            <img
              src={c.img}
              alt={c.name}
              className="w-24 h-24 rounded-full object-cover border-2 border-transparent hover:border-orange-500 transition"
            />
            <p className="mt-2 text-sm">{c.name}</p>
          </div>
        ))}
      </div>
      <hr className="mt-6 border-gray-200" />
    </section>
  );
}
