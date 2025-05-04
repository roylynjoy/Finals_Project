import React, { useState, useEffect } from 'react';
import { FaChevronDown, FaEnvelope } from "react-icons/fa";
import { GoBellFill } from "react-icons/go";
import { useLocation } from 'react-router-dom';
import NotificationModal from './notifModal';
import MessageModal from './MessageModal';

function Header() {
  const location = useLocation();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const pageTitles = {
    '/StudentDashboard': 'Student Dashboard',
    '/Attendance': 'Attendance Submission',
    '/Resources': 'Role-Based Resources',
    '/Journal': 'Daily Journal',
  };

  const title = pageTitles[location.pathname] || 'Dashboard';

  const toggleNotification = () => {
    setShowNotifications(prev => !prev);
    setShowMessages(false);
  };

  const toggleMessages = () => {
    setShowMessages(prev => !prev);
    setShowNotifications(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`fixed top-0 w-full z-50 bg-[#FFFFFF] h-[100px] px-10 items-center px-20 flex justify-between transition-shadow duration-300 ${isScrolled ? 'shadow-md' : ''}`}>
        <h1 className='text-[28px] font-semibold'>{title}</h1>
        <div className='flex items-center gap-5'>
          <GoBellFill
            className='text-[30px] cursor-pointer'
            onClick={toggleNotification}
          />
          <FaEnvelope
            className='text-[30px] cursor-pointer'
            onClick={toggleMessages}
          />
          <div className='flex items-center gap-3 bg-[#F1F1F1] pl-2 pr-4 py-2 text-[18px] border border-[#1F3463] rounded mr-15'>
            <span className='bg-[#1F3463] text-white font-bold p-2 text-[22px] rounded'>AA</span>
            <p>Antonio Andres Watson</p>
            <FaChevronDown className='h-4 w-4 text-[#494949]' />
          </div>
        </div>

        {/* Modals */}
        <NotificationModal isOpen={showNotifications} onClose={() => setShowNotifications(false)} />
        <MessageModal isOpen={showMessages} onClose={() => setShowMessages(false)} />
      </header>

      {/* Spacer to prevent overlap */}
      <div className="h-[100px]"></div>
    </>
  );
}

export default Header;
