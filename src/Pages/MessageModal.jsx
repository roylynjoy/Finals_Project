// components/MessageModal.jsx
import React from 'react';

const MessageModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute top-24 right-34 w-[350px] bg-white shadow-lg border rounded-lg z-50">
      <div className="flex justify-between items-center px-4 py-3 border-b">
        <h2 className="font-semibold text-lg">Messages</h2>
        <button onClick={onClose} className="text-sm text-blue-600 hover:underline">Mark all as Read</button>
      </div>
      <div className="px-4 py-3 hover:bg-gray-100 cursor-pointer flex gap-3 items-start">
        <div className="bg-[#1E3A8A] text-white font-bold rounded p-2 text-lg">AD</div>
        <div className="flex-1">
          <h3 className="font-semibold">Coor. Alexandra Doe – ABCDE Company</h3>
          <p className="text-sm text-gray-600">Attention to all interns: This memorandum….</p>
        </div>
        <span className="h-3 w-3 bg-red-600 rounded-full mt-1"></span>
      </div>
    </div>
  );
};

export default MessageModal;
