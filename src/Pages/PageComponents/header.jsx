import React, { useState, useEffect } from 'react';
import { FaChevronDown, FaEnvelope } from "react-icons/fa";
import { GoBellFill } from "react-icons/go";
import { useLocation } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import UserProfileModal from './UserProfileModal';  // Importing the UserProfileModal

function Header() {
  const location = useLocation();
  const [firstName, setFirstName] = useState("");
  
  const pageTitles = {
    '/StudentDashboard': 'Student Dashboard',
    '/Attendance': 'Attendance Submission',
    '/Resources': 'Role-Based Resources',
    '/Journal': 'Daily Journal',
    '/ViewJournal': 'Daily Journal',
  };

  const title = pageTitles[location.pathname] || 'Dashboard';


  const getInitials = (name) => {
    return name
      .split(" ")
      .map(word => word.charAt(0).toUpperCase())
      .join("");
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user && user.email) {
        try {
          const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users?email=${user.email}`);
          const data = await res.json();

          if (data && data.firstName && data.company) {
            setFirstName(data.firstName);
          } else {
            console.warn("User data not found or incomplete:", data);
          }
        } catch (error) {
          console.error("Failed to fetch user info:", error);
        }
      }
    };
    fetchUserData();
  }, []);

  return (
    <header className='relative flex justify-between bg-[#FFFFFF] h-[100px] shadow px-10 items-center px-20'>
      <h1 className='text-[28px] font-semibold'>{title}</h1>
      <div className='flex items-center gap-5'>
        <UserProfileModal name={firstName} initials={getInitials(firstName)} />
      </div>

    </header>
  );
}

export default Header;
