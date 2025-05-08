// src/pages/admin/EditRestaurantPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../../components/NavBar";
import Header from "../../components/Header";
import api from "../../services/api";

export default function EditRestaurantPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const [openTime, setOpenTime] = useState("");
  const [closeTime, setCloseTime] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get(`/restaurant/${id}`);
        setName(data.name);
        setAddress(data.address);
        setDescription(data.description || "");
        setImagePreviewUrl(data.image || "");
        setIsOpen(data.isOpen);
        setOpenTime(data.openTime || "");
        setCloseTime(data.closeTime || "");
      } catch (err) {
        console.error("Failed to load restaurant", err);
        alert("Could not load restaurant");
      }
    })();
  }, [id]);

  const toggleSidebar = () => setIsSidebarOpen((o) => !o);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setImagePreviewUrl(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/restaurant/${id}`, {
        name,
        address,
        description,
        image: imagePreviewUrl,
        isOpen,
        openTime,
        closeTime,
      });
      alert("Restaurant updated!");
      navigate("/admin/restaurants");
    } catch (err) {
      console.error("Update failed", err);
      alert("Failed to update restaurant");
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

        <main className="flex-1 bg-gray-100 p-6 overflow-y-auto">
          <h2 className="text-2xl font-semibold mb-6">Edit Restaurant</h2>
          <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
            {/* Name */}
            <div>
              <label className="block font-medium mb-1">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full border rounded px-3 py-2"
              />
            </div>

            {/* Address */}
            <div>
              <label className="block font-medium mb-1">Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                className="w-full border rounded px-3 py-2"
              />
            </div>

            {/* Status */}
            <div>
              <label className="block font-medium mb-1">Status</label>
              <select
                value={isOpen}
                onChange={(e) => setIsOpen(e.target.value === "true")}
                className="w-full border rounded px-3 py-2"
              >
                <option value={true}>Open</option>
                <option value={false}>Closed</option>
              </select>
            </div>

            {/* Open/Close Time */}
            <div className="flex space-x-4">
              <div className="flex-1">
                <label className="block font-medium mb-1">Open Time</label>
                <input
                  type="time"
                  value={openTime}
                  onChange={(e) => setOpenTime(e.target.value)}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div className="flex-1">
                <label className="block font-medium mb-1">Close Time</label>
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
              <label className="block font-medium mb-1">Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="border rounded px-3 py-2 w-full"
              />
              {imagePreviewUrl && (
                <img
                  src={imagePreviewUrl}
                  alt="Preview"
                  className="mt-2 max-h-40 rounded"
                />
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block font-medium mb-1">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            {/* Buttons */}
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={() => navigate("/admin/restaurants")}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Update
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}
