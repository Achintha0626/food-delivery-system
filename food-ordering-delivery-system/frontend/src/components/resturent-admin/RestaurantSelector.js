
import React from "react";

export default function RestaurantSelector({ restaurants, value, onChange }) {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-bold mb-2">
        Select Restaurant:
      </label>
      <select
        className="w-full border rounded px-3 py-2"
        value={value}
        onChange={onChange}
      >
        <option value="">-- Select a Restaurant --</option>
        {restaurants.map((r) => (
          <option key={r._id} value={r._id}>
            {r.name}
          </option>
        ))}
      </select>
    </div>
  );
}
