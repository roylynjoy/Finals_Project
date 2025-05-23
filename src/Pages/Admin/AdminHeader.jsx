import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase/firebase';
import { onAuthStateChanged } from "firebase/auth";
import { FaChevronDown } from "react-icons/fa";
import { useLocation } from 'react-router-dom';

function AdminHeader({isExpanded}) {
  const location = useLocation();
  const [firstName, setFirstName] = useState("");
  const [showShadow, setShowShadow] = useState(false);
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  const pageTitles = {
    '/AdminDashboard': 'Admin Dashboard',
    '/CompanyList': 'Company List',
  };

  const getInitials = (name) =>
    name
      .split(" ")
      .map(word => word.charAt(0).toUpperCase())
      .join("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user?.email) {
        try {
          const res = await fetch(`${baseURL}/users?email=${user.email}`);
          const data = await res.json();
          if (data?.firstName) {
            setFirstName(data.firstName);
          } else {
            console.warn("User data not found or incomplete:", data);
          }
        } catch (error) {
          console.error("Failed to fetch user info:", error);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleScroll = () => setShowShadow(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const title = pageTitles[location.pathname] || 'Dashboard';

  return (
    <header
          className={`fixed top-0 z-40 flex justify-between items-center h-[100px] bg-white px-20 transition-all duration-300 ${showShadow ? 'shadow' : ''}`}
          style={{
            left: isExpanded ? 400 : 100,
            width: `calc(100% - ${isExpanded ? 400 : 100}px)`
          }}
        >
          <h1 className="text-[28px] font-semibold">{title}</h1>
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-3 bg-[#F1F1F1] pl-2 pr-4 py-2 text-[18px] border border-[#1F3463] rounded">
              <span className="bg-[#1F3463] text-white font-bold p-2 text-[22px] rounded">
                {getInitials(firstName)}
              </span>
              <p>{firstName}</p>
              <FaChevronDown className="h-4 w-4 text-[#494949]" />
            </div>
          </div>
        </header>
  );
}

export default AdminHeader;
