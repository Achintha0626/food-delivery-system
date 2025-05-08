
import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar";
import Header from "../../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import api from "../../services/api";

function ManageRestaurants() {
  const navigate = useNavigate();
  const user = useMemo(() => JSON.parse(localStorage.getItem("user")), []);

  const [restaurants, setRestaurants] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    if (!user || user.role !== "admin") {
      return navigate("/");
    }
    fetchRestaurants();
  }, [navigate, user]);

  const fetchRestaurants = async () => {
    try {
      const { data } = await api.get("/restaurant");
      setRestaurants(data);
    } catch (err) {
      console.error("Failed to fetch restaurants", err);
      alert("Could not load restaurants");
    }
  };

  const toggleSidebar = () => setIsSidebarOpen((o) => !o);

  const handleAddNewRestaurantClick = () => {
    navigate("/admin/restaurants/add");
  };

  const handleEdit = (id) => {
    // ◀︎ CHANGED: navigate to your new edit page
    navigate(`/admin/restaurants/edit/${id}`);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this restaurant?")) return;
    try {
      await api.delete(`/restaurant/${id}`);
      setRestaurants((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      console.error("Delete failed", err);
      alert("Failed to delete restaurant");
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <NavBar
        className={`${
          isSidebarOpen ? "w-64" : "w-0"
        } transition-all duration-300`}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onToggleSidebar={toggleSidebar} />
        <main className="flex-1 bg-gray-100 p-4 overflow-y-auto">
          <div className="container mx-auto">
            <h2 className="text-2xl font-semibold mb-4">My Restaurants</h2>

            <button
              onClick={handleAddNewRestaurantClick}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4"
            >
              Add New Restaurant
            </button>

            {restaurants.length ? (
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      {[
                        "Name",
                        "Location",
                        "Status",
                        "Open/Close Time",
                        "",
                      ].map((h, idx) => (
                        <th
                          key={idx}
                          className={`${
                            idx < 4
                              ? "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                              : "relative px-6 py-3"
                          }`}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {restaurants.map((r) => (
                      <tr key={r._id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          {r.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {r.address}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {r.isOpen ? "Open" : "Closed"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {r.openTime}–{r.closeTime}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handleEdit(r._id)} // ◀︎ CHANGED
                            className="text-indigo-600 hover:text-indigo-900 mr-2"
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </button>
                          <button
                            onClick={() => handleDelete(r._id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p>No restaurants yet.</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default ManageRestaurants;
