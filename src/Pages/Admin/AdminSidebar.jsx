import React from "react";
import { FaUserCheck } from "react-icons/fa";
import { TiHome } from "react-icons/ti";
import { PiSidebarFill } from "react-icons/pi";
import { FaChevronLeft } from "react-icons/fa";
import { useLocation, Link } from "react-router-dom";
import { LuPenLine } from "react-icons/lu";

const AdminSidebar = ({ isExpanded, setIsExpanded }) => {
  const location = useLocation();

  const navItems = [
    { label: "Admin Dashboard", icon: <TiHome size={35} />, path: "/AdminDashboard" },
    { label: "Company List", icon: <LuPenLine size={35} />, path: "/CompanyList" },
  ];

  const toggleSidebar = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div
      className={`h-screen bg-[#1F3463] text-white fixed flex flex-col justify-between transition-all duration-500 ease-in-out z-50 ${
        isExpanded ? "w-[400px]" : "w-[100px]"
      }`}
    >
      {/* Top Section with La Verdad Logo */}
      <div className="flex flex-col pt-4">
        <div className="flex items-center gap-3 px-4">
          <img src="pictures/logo.png" alt="La Verdad Logo" className="h-[60px]" />
          {isExpanded && (
            <div className="transition-opacity duration-500 whitespace-nowrap">
              <p className="text-[30px] font-custom">LA VERDAD</p>
              <span className="text-[22px] font-custom">CHRISTIAN COLLEGE, INC.</span>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="mt-6 w-full whitespace-nowrap">
          <p className="border-t-3 p-2"></p>
          <ul className="space-y-2">
            {navItems.map((item, index) => {
              const isActive = location.pathname === item.path;

              return (
                <li key={index}>
                  <Link
                    to={item.path}
                    className={`flex items-center transition-all duration-300 ease-in-out rounded-l-[50px] px-4 py-3 ml-4 pl-2 ${
                      isExpanded ? "justify-start gap-4" : "justify-center"
                    } ${
                      isActive
                        ? "bg-white text-[#1F3463] ml-4 pl-3"
                        : "hover:bg-[#F9FAFD] hover:text-[#1F3463] pl-3"
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

      {/* Bottom Toggle Button */}
      <div className="pb-3 w-full px-4 py-3 flex flex-col gap-4">
        <a
          href="#"
          className={`flex items-center justify-between bg-[#1F3463] transition-all duration-300 ease-in-out rounded-full ${
            isExpanded ? "w-full" : "w-[60px] mx-auto justify-center"
          }`}
        >
          <div className="flex items-center">
            <button onClick={toggleSidebar}>
              {isExpanded ? <FaChevronLeft size={35} /> : <PiSidebarFill size={35} />}
            </button>
          </div>
        </a>
      </div>
    </div>
  );
};

export default AdminSidebar;
