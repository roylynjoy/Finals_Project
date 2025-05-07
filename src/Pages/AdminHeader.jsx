import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { FaChevronDown, FaEnvelope } from "react-icons/fa";
import { GoBellFill } from "react-icons/go";
import { useLocation } from 'react-router-dom';
import NotifModal from './notifModal';


function AdminHeader() {
  const location = useLocation();
  const [showNotifications, setShowNotifications] = useState(false);
  const [firstName, setFirstName] = useState("");

  const pageTitles = {
    '/AdminDashboard': 'Admin Dashboard',
    '/CompanyList': 'Company List',

  };

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
          const res = await fetch(`http://localhost:5000/api/users?email=${user.email}`);
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


  const title = pageTitles[location.pathname] || 'Dashboard';


  return (
    <header className='relative flex justify-between bg-[#FFFFFF] h-[100px] shadow px-10 items-center px-20'>
      <h1 className='text-[28px] font-semibold'>{title}</h1>
      <div className='flex items-center gap-5'>
        <GoBellFill
          className='text-[30px] cursor-pointer'
          onClick={() => setShowNotifications(prev => !prev)}
        />
        <FaEnvelope className='text-[30px]' />
        <div className='flex items-center gap-3 bg-[#F1F1F1] pl-2 pr-4 py-2 text-[18px] border border-[#1F3463] rounded'>
          <span className='bg-[#1F3463] text-white font-bold p-2 text-[22px] rounded'>{getInitials(firstName)}</span>
          <p>{firstName}</p>
          <FaChevronDown className='h-4 w-4 text-[#494949]' />
        </div>
      </div>
      <NotifModal isOpen={showNotifications} onClose={() => setShowNotifications(false)} />
    </header>
  );
}


export default AdminHeader;