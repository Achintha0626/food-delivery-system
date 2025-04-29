// src/pages/driver/TripsPage.jsx
import React, { useState } from "react";
import NavBar from "../../components/DriverNavBar";
import Footer from "../../components/Footer";
import {
  InboxArrowDownIcon,
  TruckIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

export default function TripsPage() {
  // Dummy trips
  const [incoming, setIncoming] = useState([
    { id: 1, from: "Colombo Fort", to: "Dehiwala", time: "10:30 AM" },
    { id: 2, from: "Borella", to: "Mount Lavinia", time: "11:00 AM" },
  ]);
  const [inProgress, setInProgress] = useState([
    { id: 3, from: "Nugegoda", to: "Kottawa", time: "09:15 AM" },
  ]);
  const [done, setDone] = useState([
    { id: 4, from: "Matara", to: "Galle", time: "08:00 AM" },
  ]);

  const [openTab, setOpenTab] = useState(null); // which card is expanded

  // Move helpers
  const acceptTrip = (t) => {
    setIncoming((a) => a.filter((x) => x.id !== t.id));
    setInProgress((a) => [...a, t]);
  };
  const completeTrip = (t) => {
    setInProgress((a) => a.filter((x) => x.id !== t.id));
    setDone((a) => [...a, t]);
  };
  const cancelTrip = (t, from) => {
    if (from === "incoming") setIncoming((a) => a.filter((x) => x.id !== t.id));
    else if (from === "inProgress")
      setInProgress((a) => a.filter((x) => x.id !== t.id));
  };

  // Card renderer
  const renderCard = (
    title,
    list,
    keyName,
    Icon,
    borderColor,
    actionFn,
    actionLabel,
    actionBg
  ) => {
    const isOpen = openTab === keyName;
    return (
      <div
        className={`bg-white rounded-xl shadow-lg transform transition hover:-translate-y-1 ${
          isOpen ? "" : "cursor-pointer"
        }`}
      >
        <button
          className={`w-full flex items-center justify-between p-4 rounded-t-xl border-l-4 ${borderColor}`}
          onClick={() => setOpenTab(isOpen ? null : keyName)}
        >
          <div className="flex items-center gap-3">
            <Icon className="h-6 w-6 text-gray-700" />
            <span className="text-lg font-semibold text-gray-800">{title}</span>
          </div>
          <span className="text-2xl font-bold text-gray-900">
            {list.length}
          </span>
        </button>
        {isOpen && (
          <div className="p-4 border-t space-y-3">
            {list.length === 0 ? (
              <p className="text-gray-500">No trips here.</p>
            ) : (
              list.map((trip) => (
                <div
                  key={trip.id}
                  className="flex justify-between items-center bg-gray-50 p-3 rounded-md"
                >
                  <div>
                    <p className="font-medium">
                      {trip.from} → {trip.to}
                    </p>
                    <p className="text-sm text-gray-500">{trip.time}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {actionLabel && (
                      <button
                        onClick={() => actionFn(trip)}
                        className={`px-3 py-1 text-sm font-medium rounded ${actionBg} text-white hover:brightness-90 transition`}
                      >
                        {actionLabel}
                      </button>
                    )}
                    {keyName !== "done" && (
                      <button
                        onClick={() => cancelTrip(trip, keyName)}
                        className="p-1 rounded-full text-red-500 hover:text-red-700 transition"
                        title="Cancel"
                      >
                        <XCircleIcon className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className="flex min-h-screen font-sans"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      {/* Left Nav */}
      <NavBar className="w-64" />

      {/* Main Column */}
      <div className="flex-1 flex flex-col bg-gray-50">
        <main className="flex-1 p-6 space-y-6 overflow-y-auto">
          <h2 className="text-2xl font-semibold">My Trips</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {renderCard(
              "Incoming Trips",
              incoming,
              "incoming",
              InboxArrowDownIcon,
              "border-blue-500",
              acceptTrip,
              "Accept",
              "bg-blue-500"
            )}
            {renderCard(
              "In-Progress",
              inProgress,
              "inProgress",
              TruckIcon,
              "border-yellow-500",
              completeTrip,
              "Done",
              "bg-yellow-500"
            )}
            {renderCard(
              "Completed",
              done,
              "done",
              CheckCircleIcon,
              "border-green-500",
              null,
              "",
              ""
            )}
          </div>
        </main>

        {/* Footer */}
        
      </div>
    </div>
  );
}
