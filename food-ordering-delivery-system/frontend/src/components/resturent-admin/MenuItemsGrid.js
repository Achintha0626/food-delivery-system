
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";

export default function MenuItemsGrid({
  category,
  items,
  onBack,
  onAdd,
  onEdit,
  onDelete,
}) {
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={onBack}
          className="flex items-center space-x-1 text-gray-600 hover:text-gray-800"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          <span>Back to Menus</span>
        </button>
        <h2 className="text-xl font-semibold">Items in {category.name}</h2>
        <button
          onClick={onAdd}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          + Add New Item
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="group relative bg-white shadow rounded overflow-hidden"
          >
            <img
              src={
                item.image.startsWith("data:")
                  ? item.image
                  : `/images/${item.image}`
              }
              alt={item.name}
              className="w-full h-32 object-cover"
            />
            <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity bg-white bg-opacity-75 rounded p-1">
              <button
                onClick={() => onEdit(item)}
                title="Edit Item"
                className="p-1"
              >
                <FontAwesomeIcon icon={faEdit} />
              </button>
              <button
                onClick={() => onDelete(item)}
                title="Delete Item"
                className="p-1"
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
            <div className="p-4">
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-gray-600 text-sm mb-2">{item.description}</p>
              <p className="font-bold text-indigo-600">
                ${item.price.toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
