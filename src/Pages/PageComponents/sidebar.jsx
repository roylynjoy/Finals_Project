import React from "react";
import { FaUserCheck } from "react-icons/fa";
import { TiHome } from "react-icons/ti";
import { PiBookOpenUserFill, PiSidebarFill } from "react-icons/pi";
import { HiMiniPencilSquare } from "react-icons/hi2";
import { FaChevronLeft } from "react-icons/fa";
import { useLocation, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebase"; // adjust path as needed

const Sidebar = ({ isExpanded, setIsExpanded }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  const navItems = [
    { label: "Student Dashboard", icon: <TiHome size={35} />, path: "/StudentDashboard" },
    { label: "Attendance Tracking", icon: <FaUserCheck size={35} />, path: "/Attendance" },
    { label: "Journal Submission", icon: <HiMiniPencilSquare size={35} />, path: "/Journal" }, // handled manually below
    { label: "Role-based Resources", icon: <PiBookOpenUserFill size={35} />, path: "/Resources" },
  ];

  const toggleSidebar = () => {
    setIsExpanded((prev) => !prev);
  };

  const handleJournalClick = async () => {
    try {
      const user = auth.currentUser;
      if (!user?.email) {
        navigate("/SignIn");
        return;
      }

      const baseURL = import.meta.env.VITE_API_BASE_URL;
      const res = await axios.get(`${baseURL}/journal/today`);

      if (res.status === 200 && res.data?.content) {
        navigate("/ViewJournal");
      } else {
        navigate("/Journal");
      }
    } catch (err) {
      if (err.response?.status === 204) {
        navigate("/Journal");
      } else {
        console.error("Error checking journal:", err);
      }
    }
  };

  return (
    <div
      className={`h-screen bg-[#1F3463] text-white fixed flex flex-col justify-between transition-all duration-500 ease-in-out z-50 ${
        isExpanded ? "w-[400px]" : "w-[100px]"
      }`}
    >
      {/* Top Section */}
      <div className="flex flex-col pt-10">
        {/* Logo */}
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
        <nav className="mt-2 w-full pt-4 whitespace-nowrap">
          <p className="border-t-3 p-2"></p>
          <ul className="space-y-2">
          {navItems.map((item, index) => {
            const isActive = location.pathname === item.path;

            const isJournal = item.label === "Journal Submission";

            return (
              <li key={index}>
                {isJournal ? (
                  <div
                    onClick={handleJournalClick}
                    className={`flex items-center transition-all duration-300 ease-in-out rounded-l-[50px] px-4 py-3 ml-4 pl-2 cursor-pointer ${
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
                  </div>
                ) : (
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
                )}
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

export default Sidebar;
