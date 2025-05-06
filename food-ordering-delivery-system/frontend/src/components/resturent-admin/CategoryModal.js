
import React from "react";
import Modal from "react-modal";

export default function CategoryModal({
  isOpen,
  onClose,
  onSave,
  name,
  setName,
  imagePreview,
  onImageChange,
  saveLabel,
}) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        overlay: { backgroundColor: "rgba(0,0,0,0.6)", zIndex: 1000 },
        content: {
          maxWidth: 400,
          margin: "auto",
          borderRadius: 8,
          padding: 24,
        },
      }}
    >
      <h2 className="text-xl font-semibold mb-4">{saveLabel} Menu</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Menu Name"
          className="w-full border rounded px-3 py-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          className="w-full"
          onChange={onImageChange}
        />
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            className="w-24 h-24 object-cover rounded mt-2"
          />
        )}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 mr-2 bg-gray-300 rounded"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            {saveLabel}
          </button>
        </div>
      </div>
    </Modal>
  );
}
