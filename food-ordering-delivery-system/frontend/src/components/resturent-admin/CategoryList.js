
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function CategoryList({
  categories,
  selectedId,
  onSelect,
  onAdd,
  onEdit,
  onDelete,
}) {
  return (
    <>
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">Menus</h2>
        <button
          onClick={onAdd}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          + Add New Menu
        </button>
      </div>
      <div className="flex space-x-6 overflow-x-auto py-2 mb-4">
        {categories.map((cat) => {
          const isSelected = selectedId === cat.id;
          return (
            <div
              key={cat.id}
              className="group relative flex-shrink-0 cursor-pointer"
              onClick={() => onSelect(cat)}
            >
              <div
                className={`w-32 h-32 rounded-full overflow-hidden shadow transition-all ${
                  isSelected
                    ? "ring-4 ring-indigo-500"
                    : "ring-2 ring-transparent group-hover:ring-indigo-300"
                }`}
              >
                <img
                  src={
                    cat.image.startsWith("data:")
                      ? cat.image
                      : `/images/${cat.image}`
                  }
                  alt={cat.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center mt-2 font-medium text-gray-700">
                {cat.name}
              </div>
              <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity bg-white bg-opacity-75 rounded p-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(cat);
                  }}
                  title="Edit Menu"
                  className="p-1"
                >
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(cat);
                  }}
                  title="Delete Menu"
                  className="p-1"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
