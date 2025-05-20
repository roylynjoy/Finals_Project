import React, { useState, useRef, useEffect } from "react";
import { FaChevronDown, FaCog, FaKey, FaSignOutAlt } from "react-icons/fa";
import AccountSettingsModal from './AccountSettingModal';
import ChangePass from './ChangePass'; 

const UserProfileModal = ({ name, initials }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAccountSettingsOpen, setIsAccountSettingsOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(prev => !prev);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAccountSettingsClick = () => {
    setIsOpen(false);
    setIsAccountSettingsOpen(true);
  };

  const handleChangePasswordClick = () => {
    setIsOpen(false);
    setIsChangePasswordOpen(true);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        onClick={toggleDropdown}
        className="flex items-center gap-3 bg-[#F1F1F1] pl-2 pr-4 py-2 text-[18px] border border-[#1F3463] rounded cursor-pointer"
      >
        <span className="bg-[#1F3463] text-white font-bold p-2 text-[22px] rounded">
          {initials}
        </span>
        <p>{name}</p>
        <FaChevronDown className="h-4 w-4 text-[#494949]" />
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-[430px] bg-white border border-gray-200 shadow-lg rounded z-50">
          <div className="flex px-4 py-6 gap-3">
              <div className="bg-[#1F3463] h-[75px] w-[70px] rounded-[10px]"></div>
              <div className="flex-col content-center">
                <p className="text-[26px] font-semibold">Antonio Andres Watson</p>
                <p className="text-[14px]">antonioandreswatson@laverdad.gmail.com</p>
              </div>
          </div>
          <p className="border-t border-[#959494]"></p>
          <ul className="p-2 text-[23px]">
            <li
              className="flex items-center gap-2 p-2 hover:bg-[#E8EEFF] cursor-pointer"
              onClick={handleAccountSettingsClick}
            >
              <FaCog className="h-7 w-7" />
              Account Settings
            </li>
            <li
              className="flex items-center gap-2 p-2 hover:bg-[#E8EEFF] cursor-pointer"
              onClick={handleChangePasswordClick}
            >
              <FaKey className="h-7 w-7" />
              Change Password
            </li>
            <hr className="my-1 border-gray-200" />
            <li className="flex items-center gap-2 p-2 hover:bg-[#E8EEFF] cursor-pointer">
              <FaSignOutAlt className="h-7 w-7" />
              Logout
            </li>
          </ul>
        </div>
      )}

      <AccountSettingsModal
        isOpen={isAccountSettingsOpen}
        closeModal={() => setIsAccountSettingsOpen(false)}
      />

      <ChangePass
        isOpen={isChangePasswordOpen}
        closeModal={() => setIsChangePasswordOpen(false)}
      />
    </div>
  );
};

export default UserProfileModal;
