import React from "react";
import { FaUserCheck } from "react-icons/fa";
import { TiHome } from "react-icons/ti";
import { HiMiniPencilSquare } from "react-icons/hi2";
import { AiOutlineLogout } from "react-icons/ai";
import { useLocation, Link } from "react-router-dom";

const Sidebar = ({ isExpanded, setIsExpanded }) => {
  const location = useLocation();

  const navItems = [
    { label: " Company Dashboard", icon: <TiHome size={35} />, path: "/CompanyDashboard" },
    { label: "Attendance Tracking", icon: <FaUserCheck size={35} />, path: "/CompanyAttendance" },
    { label: "Journal Submission", icon: <HiMiniPencilSquare size={35} />, path: "/CompanyJournal" },
  ];

  return (
    <div
      className={`h-screen bg-[#1F3463] text-white fixed flex flex-col justify-between transition-all duration-500 ease-in-out z-50 ${
        isExpanded ? "w-[400px]" : "w-[100px]"
      }`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="flex flex-col pt-4 ">
        <div className="flex items-center gap-3 px-4">
          <img src="pictures/logo.png" alt="La Verdad Logo" className="h-[60px]" />
          {isExpanded && (
            <div className="transition-opacity duration-500">
              <p className="text-[30px] font-custom">LA VERDAD</p>
              <span className="text-[22px] font-custom">CHRISTIAN COLLEGE, INC.</span>
            </div>
          )}
        </div>

        <nav className="mt-6 w-full pt-4 ">
          <p className="border-t-3 p-2"></p>
          <ul className="space-y-2">
            {navItems.map((item, index) => {
              const isActive = location.pathname === item.path;

              return (
                <li key={index}>
                  <Link
                    to={item.path}
                    className={`flex items-center transition-all duration-300 ease-in-out rounded-l-[50px] p-4 py-3 ${
                      isExpanded ? "justify-start gap-4" : "justify-center"
                    } ${
                      isActive
                        ? "bg-white text-[#2D0F7F]" 
                        : "hover:bg-[#F9FAFD] hover:text-[#1F3463]"
                    }`}
                  >
                    {item.icon}
                    <span
                      className={`text-[24px] transition-opacity duration-300 ${
                        isExpanded ? "opacity-100" : "opacity-0 hidden"
                      }`}
                    >
                      {item.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* FieldMate section */}
      <div className="pb-3 w-full px-4 py-3 ">
        <p className="border-t-3 mb-3"></p>
        <a
          href="#"
          className={`flex items-center justify-between bg-[#1F3463] transition-all duration-300 ease-in-out rounded-full ${
            isExpanded ? "w-full" : "w-[60px] mx-auto justify-center"
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="bg-white rounded w-[50px] h-[50px] ">
              <img src="/pictures/lg.png" alt="FieldMate Logo" className="p-1" />
            </div>
            {isExpanded && (
              <span className="text-[27px] font-medium">FieldMate</span>
            )}
          </div>
          {isExpanded && <AiOutlineLogout size={30} className="text-white" />}
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
