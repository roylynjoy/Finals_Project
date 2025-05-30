// components/LogoutConfirmationModal.jsx
import React from "react";

const LogoutConfirmationModal = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white py-10 rounded-lg shadow-md w-[400px] text-center">
        <p className="text-gray-600 text-[20px] mb-6">
          Are you sure you want to <b>Log Out</b>?
        </p>
        <div className="flex justify-center gap-4">
          <button
            className="text-[20px] px-5 py-2 bg-[#F5F5F5] border border-[#C4C4C4] text-gray-800 rounded cursor-pointer hover:bg-[#E8E8E8] transition duration-300"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="text-[20px] px-5 py-2 bg-[#1E3A8A] hover:bg-red-800 text-white rounded cursor-pointer hover:bg-[#1F3463] transition duration-300"
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
