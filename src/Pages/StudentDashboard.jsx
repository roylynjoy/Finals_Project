import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { FaChevronDown } from "react-icons/fa";
import Header from './header';
import Footer from './footer';

function StudentDashboard() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  // Calendar logic
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth(); // 0-indexed
  const monthName = today.toLocaleString('default', { month: 'long' });
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const daysArray = [];
  for (let i = 0; i < firstDay; i++) {
    daysArray.push(null); // empty cells before first day
  }
  for (let i = 1; i <= daysInMonth; i++) {
    daysArray.push(i);
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Sidebar isExpanded={isSidebarExpanded} setIsExpanded={setIsSidebarExpanded} />

      <div className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${isSidebarExpanded ? "ml-[400px]" : "ml-[106px]"}`}>
        <Header />

        <div className='px-20 py-10 grid grid-cols-3 gap-6 grid-rows-[auto_auto_auto]'>

          {/* Welcome Card */}
          <div className='bg-white shadow border border-[#C2C2C2] rounded-[10px] col-span-2 flex items-center justify-between px-6 py-4'>
            <div>
              <h1 className='text-[30px] font-semibold'>Hello, Antonio!</h1>
              <h2 className='text-[18px] text-gray-600'>ABCDE Company Intern</h2>
            </div>
            <div className='h-4 w-4 bg-[#3BC651] rounded-full'></div>
          </div>

          {/* Journal Submission */}
          <div className='bg-white shadow border border-[#C2C2C2] rounded-[10px] p-4'>
            <h1 className='text-[26px] font-semibold mb-2 ml-2'>Journal Submission</h1>
            <p className='text-gray-700 bg-[#F1F1F1] h-[188px] pl-5 pt-5 text-[20px]'>Antonio Andres Watson – January 01, 2025</p>
          </div>

          {/* Attendance Summary */}
          <div className='bg-white shadow border border-[#C2C2C2] rounded-[10px] p-6 col-span-2'>
            <h2 className='text-[26px] font-semibold mb-4'>Attendance Summary</h2>
            <div className='grid grid-cols-3 gap-4'>
              <div className='bg-[#E7F8ED] border-2 border-[#6BD37C] rounded-[10px] p-4 h-[216px]'>
                <h1 className='text-[40px] font-bold text-[#00A94D] text-start'>100</h1>
                <p className='text-[20px]'>Days</p>
                <p className='font-semibold text-[25px] '>Present</p>
              </div>
              <div className='bg-[#FFF5E9] border-2 border-[#F38A40] rounded-[10px] p-4 text-center'>
                <h1 className='text-[32px] font-bold text-[#F38A40]'>2</h1>
                <p className='text-sm'>Days</p>
                <p className='font-semibold'>Late</p>
              </div>
              <div className='bg-[#FAEEF2] border-2 border-[#9B3F62] rounded-[10px] p-4 text-center'>
                <h1 className='text-[32px] font-bold text-[#9B3F62]'>1</h1>
                <p className='text-sm'>Days</p>
                <p className='font-semibold'>Absent</p>
              </div>
            </div>
          </div>

          {/* Calendar - Now dynamic and functional */}
          <div className='bg-white shadow border border-[#C2C2C2] rounded-[10px] p-4'>
            <h2 className='text-[20px] font-semibold mb-2'>{monthName} {currentYear}</h2>
            <div className='grid grid-cols-7 gap-2 text-center text-sm'>
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d, i) => (
                <div key={i} className='font-bold'>{d}</div>
              ))}
              {daysArray.map((day, index) => (
                <div
                  key={index}
                  className={`py-1 rounded ${day === today.getDate() ? 'bg-[#1F3463] text-white font-bold' : ''}`}
                >
                  {day || ''}
                </div>
              ))}
            </div>
          </div>

          {/* Time Remaining */}
          <div className='bg-white shadow border border-[#C2C2C2] rounded-[10px] p-4 text-center'>
            <h2 className='text-[20px] font-semibold mb-4'>Time Remaining</h2>
            <div className='flex justify-around'>
              <div>
                <svg className='w-20 h-20 mb-1' viewBox="0 0 36 36">
                  <path fill="none" stroke="#6A0DAD" strokeWidth="3.8" strokeDasharray="53,100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831" />
                </svg>
                <p className='text-sm'>19/38 Days</p>
              </div>
              <div>
                <svg className='w-20 h-20 mb-1' viewBox="0 0 36 36">
                  <path fill="none" stroke="#1F3463" strokeWidth="3.8" strokeDasharray="31,100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831" />
                </svg>
                <p className='text-sm'>150/486 Hours</p>
              </div>
            </div>
          </div>

          {/* Recently Accessed Role */}
          <div className='bg-white shadow border border-[#C2C2C2] rounded-[10px] p-4 flex flex-col justify-between'>
            <h2 className='text-[20px] font-semibold'>Recently Accessed Role</h2>
            <div className='h-full flex items-center justify-center'>
              <p className='text-xl font-bold text-[#1F3463]'>Project Management</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default StudentDashboard;
