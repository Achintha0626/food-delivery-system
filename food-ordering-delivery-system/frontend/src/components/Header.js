import React from "react";
import {
  Bars3BottomLeftIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

export default function Header({ onToggleSidebar }) {
  return (
    <header className="bg-white shadow-sm py-4 px-6 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="text-gray-600 hover:text-gray-800"
        >
          <Bars3BottomLeftIcon className="h-7 w-7" />
        </button>
        <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="pl-3 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
          />
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2" />
        </div>

        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition">
          <FunnelIcon className="h-5 w-5" />
          <span className="text-sm">Filter</span>
        </button>

        <button className="p-1 rounded-full hover:bg-gray-100 transition">
          <UserCircleIcon className="h-8 w-8 text-gray-600" />
        </button>
      </div>
    </header>
  );
}
