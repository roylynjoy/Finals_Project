import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { FaChevronDown, FaEnvelope } from "react-icons/fa";
import { GoBellFill } from "react-icons/go";
import { useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const pageTitles = {
    '/CompanyDashboard': 'Company Dashboard',
    '/CompanyAttendance': 'Attendance Tracking',
    '/CompanyJournal': 'Journal Submission',

  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user && user.email) {
        try {
          const res = await fetch(`${baseURL}/users?email=${user.email}`);
          const data = await res.json();
          if (data && data.firstName && data.lastName && data.email) {
            setFirstName(data.firstName);
            setLastName(data.lastName);
            setEmail(data.email);
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


  const title = pageTitles[location.pathname] || 'Dashboard';


  return (
    <header className='relative flex justify-between bg-[#FFFFFF] h-[100px] shadow px-10 items-center px-20'>
      <h1 className='text-[28px] font-semibold'>{title}</h1>
      <div className='flex items-center gap-5'>
        <div className='flex items-center gap-3 bg-[#F1F1F1] pl-2 pr-4 py-2 text-[18px] border border-[#1F3463] rounded'>
          <span className='bg-[#1F3463] text-white font-bold p-2 text-[22px] rounded'>{getInitials(`${firstName} ${lastName}`)}</span>
          <p>{firstName} {lastName}</p>
          <FaChevronDown className='h-4 w-4 text-[#494949]' />
        </div>
      </div>
    </header>
  );
}


export default Header;