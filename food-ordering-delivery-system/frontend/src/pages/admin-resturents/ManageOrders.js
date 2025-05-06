
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/NavBar";
import Header from "../../components/Header";
import { XCircleIcon } from "@heroicons/react/24/outline";

export default function ManageOrders() {
  const navigate = useNavigate();

  // Auth guard
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== "admin") {
      navigate("/");
    }
  }, [navigate]);

  // Dummy drivers
  const drivers = ["John Doe", "Jane Smith", "Bob Lee"];

  // Orders state
  const [pendingOrders, setPendingOrders] = useState([
    { id: 101, details: "2x Margherita Pizza", accepted: false },
    { id: 102, details: "1x Caesar Salad", accepted: false },
  ]);
  const [assignedOrders, setAssignedOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);

  // Driver selections
  const [assignments, setAssignments] = useState({});

  // Accept a pending order
  const acceptOrder = (orderId) => {
    setPendingOrders((list) =>
      list.map((o) => (o.id === orderId ? { ...o, accepted: true } : o))
    );
  };

  // Assign an accepted order to a driver
  const assignOrder = (orderId) => {
    const order = pendingOrders.find((o) => o.id === orderId && o.accepted);
    const driver = assignments[orderId] || drivers[0];
    setPendingOrders((list) => list.filter((o) => o.id !== orderId));
    setAssignedOrders((list) => [...list, { ...order, driver }]);
  };

  // Mark an assigned order complete
  const completeOrder = (orderId) => {
    const order = assignedOrders.find((o) => o.id === orderId);
    setAssignedOrders((list) => list.filter((o) => o.id !== orderId));
    setCompletedOrders((list) => [...list, order]);
  };

  // Remove an order from pending or assigned, after confirmation
  const handleCancel = (orderId, status) => {
    if (
      window.confirm(
        "Are you sure you want to cancel this order? This action cannot be undone."
      )
    ) {
      if (status === "pending") {
        setPendingOrders((list) => list.filter((o) => o.id !== orderId));
      } else if (status === "assigned") {
        setAssignedOrders((list) => list.filter((o) => o.id !== orderId));
      }
    }
  };

  const handleSelectDriver = (orderId, driver) => {
    setAssignments((a) => ({ ...a, [orderId]: driver }));
  };

  return (
    <div
      className="flex h-screen overflow-hidden font-sans"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      {/* Sidebar */}
      <Navbar className="w-64" />

      {/* Main */}
      <div className="flex-1 flex flex-col bg-gray-50">
        <Header />

        <main className="p-6 overflow-y-auto">
          <h2 className="text-2xl font-semibold mb-6">Manage Orders</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Pending Orders */}
            <div className="bg-white bg-opacity-70 backdrop-blur-md rounded-xl shadow-lg p-5">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Pending Orders ({pendingOrders.length})
              </h3>
              <div className="space-y-4">
                {pendingOrders.length ? (
                  pendingOrders.map((order) => (
                    <div
                      key={order.id}
                      className="bg-gray-50 p-4 rounded-md flex flex-col"
                    >
                      <p className="font-medium">Order #{order.id}</p>
                      <p className="text-sm text-gray-600 mb-2">
                        {order.details}
                      </p>

                      {!order.accepted ? (
                        <div className="flex gap-2">
                          <button
                            onClick={() => acceptOrder(order.id)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded transition"
                          >
                            Accept Order
                          </button>
                          <button
                            onClick={() => handleCancel(order.id, "pending")}
                            className="p-2 rounded-full text-red-500 hover:text-red-700 transition ml-auto"
                            title="Cancel Order"
                          >
                            <XCircleIcon className="h-5 w-5" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <select
                            value={assignments[order.id] || drivers[0]}
                            onChange={(e) =>
                              handleSelectDriver(order.id, e.target.value)
                            }
                            className="flex-1 px-3 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                          >
                            {drivers.map((d) => (
                              <option key={d} value={d}>
                                {d}
                              </option>
                            ))}
                          </select>
                          <button
                            onClick={() => assignOrder(order.id)}
                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded transition"
                          >
                            Assign to Driver
                          </button>
                          <button
                            onClick={() => handleCancel(order.id, "pending")}
                            className="p-2 rounded-full text-red-500 hover:text-red-700 transition"
                            title="Cancel Order"
                          >
                            <XCircleIcon className="h-5 w-5" />
                          </button>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No pending orders</p>
                )}
              </div>
            </div>

            {/* Assigned Orders */}
            <div className="bg-white bg-opacity-70 backdrop-blur-md rounded-xl shadow-lg p-5">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Assigned Orders ({assignedOrders.length})
              </h3>
              <div className="space-y-4">
                {assignedOrders.length ? (
                  assignedOrders.map((order) => (
                    <div
                      key={order.id}
                      className="bg-gray-50 p-4 rounded-md flex flex-col"
                    >
                      <p className="font-medium">Order #{order.id}</p>
                      <p className="text-sm text-gray-600">{order.details}</p>
                      <p className="text-sm text-gray-600">
                        Driver: {order.driver}
                      </p>
                      <div className="flex gap-2 mt-2">
                        <button
                          onClick={() => completeOrder(order.id)}
                          className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded transition"
                        >
                          Mark Completed
                        </button>
                        <button
                          onClick={() => handleCancel(order.id, "assigned")}
                          className="p-2 rounded-full text-red-500 hover:text-red-700 transition"
                          title="Cancel Order"
                        >
                          <XCircleIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No assigned orders</p>
                )}
              </div>
            </div>

            {/* Completed Orders */}
            <div className="bg-white bg-opacity-70 backdrop-blur-md rounded-xl shadow-lg p-5">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Completed Orders ({completedOrders.length})
              </h3>
              <div className="space-y-4">
                {completedOrders.length ? (
                  completedOrders.map((order) => (
                    <div
                      key={order.id}
                      className="bg-gray-50 p-4 rounded-md flex flex-col"
                    >
                      <p className="font-medium">Order #{order.id}</p>
                      <p className="text-sm text-gray-600">{order.details}</p>
                      <p className="text-sm text-gray-600">
                        Driver: {order.driver}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No completed orders</p>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
