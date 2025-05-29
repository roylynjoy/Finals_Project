import React from "react";
import { FaArrowLeft } from "react-icons/fa";

function InternsModal({ isVisible, onClose, companyName, interns }) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-40 backdrop-blur-sm">
      <div className="bg-white w-[647px] p-6 rounded-xl relative">
        <button
          onClick={onClose}
          className="text-black text-xl"
        >
          <FaArrowLeft />
        </button>
        <div className="bg-[#2D0F7F] text-white text-[40px] font-bold text-center py-3 rounded mb-4">
          {companyName}
        </div>
        <ul className="space-y-3 text-[25px]">
          {interns.map((name, index) => (
            <li key={index} className="flex items-center gap-4 border-t border-b pb-2">
              <div className="w-15 h-15 bg-[#2D0F7F] text-white font-bold flex items-center justify-center rounded">
                {name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </div>
              <span className="font-semibold">{name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default InternsModal;
