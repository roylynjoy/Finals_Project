import React, { useState } from 'react';
import { FaChevronDown, FaEnvelope } from "react-icons/fa";
import { GoBellFill } from "react-icons/go";
import { useLocation } from 'react-router-dom';
import NotifModal from './notifModal';


function AdminHeader() {
  const location = useLocation();
  const [showNotifications, setShowNotifications] = useState(false);


  const pageTitles = {
    '/AdminDashboard': 'Admin Dashboard',
    '/CompanyList': 'Company List',

  };


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
          <span className='bg-[#1F3463] text-white font-bold p-2 text-[22px] rounded'>AD</span>
          <p>Alexandra Doe </p>
          <FaChevronDown className='h-4 w-4 text-[#494949]' />
        </div>
      </div>
      <NotifModal isOpen={showNotifications} onClose={() => setShowNotifications(false)} />
    </header>
  );
}


export default AdminHeader;