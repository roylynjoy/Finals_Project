// components/LogoutConfirmationModal.jsx
import React from "react";

const LogoutConfirmationModal = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-[400px] text-center">
        <h2 className="text-[24px] font-semibold text-gray-800 mb-4">Confirm Logout</h2>
        <p className="text-gray-600 text-[18px] mb-6">
          Are you sure you want to log out?
        </p>
        <div className="flex justify-center gap-4">
          <button
            className="px-5 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="px-5 py-2 bg-[#E70000] hover:bg-red-700 text-white rounded"
            onClick={onConfirm}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutConfirmationModal;
