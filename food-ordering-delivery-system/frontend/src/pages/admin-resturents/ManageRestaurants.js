// src/pages/admin/ManageRestaurants.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar";
import Header from "../../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

function ManageRestaurants() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [restaurants, setRestaurants] = useState([
    {
      _id: "1",
      name: "Delicious Diner",
      address: "Colombo",
      isOpen: true,
      openTime: "08:00",
      closeTime: "23:00",
    },
    {
      _id: "2",
      name: "Spicy Kitchen",
      address: "Kandy",
      isOpen: false,
      openTime: "11:00",
      closeTime: "21:00",
    },
    {
      _id: "3",
      name: "Fresh Fusion",
      address: "Galle",
      isOpen: true,
      openTime: "10:00",
      closeTime: "22:00",
    },
    {
      _id: "4",
      name: "Burger Bliss",
      address: "Negombo",
      isOpen: true,
      openTime: "09:00",
      closeTime: "20:00",
    },
  ]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isAddingRestaurant, setIsAddingRestaurant] = useState(false);

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
    }
  }, [navigate, user]);

  const toggleSidebar = () => setIsSidebarOpen((open) => !open);
  const handleAddNewRestaurantClick = () => setIsAddingRestaurant(true);
  const handleCancelAdd = () => setIsAddingRestaurant(false);
  const handleRestaurantAdded = (newRest) => {
    setRestaurants((r) => [...r, { ...newRest, _id: Date.now().toString() }]);
    setIsAddingRestaurant(false);
  };
  const handleUpdate = (id) => console.log("Update", id);
  const handleDelete = (id) => {
    if (window.confirm("Delete this restaurant?")) {
      setRestaurants((r) => r.filter((x) => x._id !== id));
      alert("Deleted.");
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

            {!isAddingRestaurant ? (
              <>
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
                            <td className="px-6 py-4 whitespace-nowrap text-sm">{`${r.openTime}–${r.closeTime}`}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button
                                onClick={() => handleUpdate(r._id)}
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
              </>
            ) : (
              <AddRestaurant
                onRestaurantAdded={handleRestaurantAdded}
                onCancel={handleCancelAdd}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default ManageRestaurants;

// below the default export you can keep the form
function AddRestaurant({ onRestaurantAdded, onCancel }) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const [openTime, setOpenTime] = useState("");
  const [closeTime, setCloseTime] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return setImagePreviewUrl("");
    const reader = new FileReader();
    reader.onloadend = () => setImagePreviewUrl(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onRestaurantAdded({
      name,
      address,
      description,
      image: imagePreviewUrl,
      isOpen,
      openTime,
      closeTime,
    });
  };

  return (
    <div className="bg-gray-100 p-4 rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">Add New Restaurant</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-bold mb-1">Name</label>
          <input
            type="text"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        {/* Address */}
        <div>
          <label className="block text-sm font-bold mb-1">Location</label>
          <input
            type="text"
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        {/* Status */}
        <div>
          <label className="block text-sm font-bold mb-1">Status</label>
          <select
            value={isOpen}
            onChange={(e) => setIsOpen(e.target.value === "true")}
            className="w-full border rounded px-3 py-2"
          >
            <option value={true}>Open</option>
            <option value={false}>Closed</option>
          </select>
        </div>
        {/* Times */}
        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="block text-sm font-bold mb-1">Open Time</label>
            <input
              type="time"
              value={openTime}
              onChange={(e) => setOpenTime(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-bold mb-1">Close Time</label>
            <input
              type="time"
              value={closeTime}
              onChange={(e) => setCloseTime(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>
        {/* Image */}
        <div>
          <label className="block text-sm font-bold mb-1">Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {imagePreviewUrl && (
            <img
              src={imagePreviewUrl}
              alt="preview"
              className="mt-2 max-h-40"
            />
          )}
        </div>
        {/* Description */}
        <div>
          <label className="block text-sm font-bold mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        {/* Buttons */}
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
