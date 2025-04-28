import React from 'react';
import { FaBell } from "react-icons/fa";

const NotificationModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute top-24 right-55 w-[300px] bg-white shadow-lg border rounded-lg z-50">
      <div className="flex justify-between items-center px-4 py-3 border-b">
        <h2 className="font-semibold text-lg">Notifications</h2>
        <button onClick={onClose} className="text-sm text-blue-600 hover:underline">Mark all as Read</button>
      </div>
      <div className="px-4 py-3 hover:bg-gray-100 cursor-pointer flex gap-3 items-start">
        <FaBell className="text-xl mt-1" />
        <div className="flex-1">
          <h3 className="font-semibold">System Notification</h3>
          <p className="text-sm text-gray-600">We are remindi...</p>
        </div>
        <span className="h-3 w-3 bg-red-600 rounded-full mt-1"></span>
      </div>
    </div>
  );
};

export default NotificationModal;
