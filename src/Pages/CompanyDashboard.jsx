import React, { useState } from 'react';
import CompanySidebar from '../Pages/CompanySidebar';
import CompanyHeader from '../Pages/CompanyHeader';
import Footer from './footer';

function CompanyDashboard() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <CompanySidebar isExpanded={isSidebarExpanded} setIsExpanded={setIsSidebarExpanded} />
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${
          isSidebarExpanded ? 'ml-[400px]' : 'ml-[106px]'
        } bg-[#FAFAFF]`}
      >
        <CompanyHeader />

        {/* Main Content */}
        <div className="p-8 grid grid-cols-3 gap-6">
          {/* Left Column (2/3 Width) */}
          <div className="col-span-2 space-y-6">
            {/* Company Info */}
            <div className="bg-white p-5 rounded shadow flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-[#D9D9D9] w-12 h-12 rounded-md flex items-center justify-center text-white font-semibold">AD</div>
                <div>
                  <p className="text-lg font-semibold">Alexandra Doe - ABCDE Company</p>
                </div>
              </div>
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>

            {/* Attendance Summary */}
            <div className="bg-white p-6 rounded shadow grid grid-cols-3 gap-4">
              <div className="bg-[#E6F9EA] p-4 rounded flex flex-col items-center">
                <p className="text-2xl font-bold text-green-600">10</p>
                <p className="text-sm text-green-700">Interns Present</p>
              </div>
              <div className="bg-[#FFF6E5] p-4 rounded flex flex-col items-center">
                <p className="text-2xl font-bold text-yellow-600">0</p>
                <p className="text-sm text-yellow-700">Interns Late</p>
              </div>
              <div className="bg-[#FDE9E9] p-4 rounded flex flex-col items-center">
                <p className="text-2xl font-bold text-red-600">0</p>
                <p className="text-sm text-red-700">Interns Absent</p>
              </div>
            </div>

            {/* Tasks & Journal */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded shadow">
                <p className="text-lg font-semibold mb-4">Tasks to be Accomplished</p>
                <form className="space-y-3 text-sm">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="accent-[#2D0F7F] w-4 h-4" />
                    Read intern journal submission
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="accent-[#2D0F7F] w-4 h-4" />
                    Mark internship performance
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="accent-[#2D0F7F] w-4 h-4" />
                    Approve submitted attendance
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="accent-[#2D0F7F] w-4 h-4" />
                    Re-evaluate pending logs
                  </label>
                </form>
              </div>
              <div className="bg-white p-6 rounded shadow flex flex-col justify-between">
                <div>
                  <p className="text-lg font-semibold mb-2">Journal Submission</p>
                  <p className="text-4xl font-bold text-red-500">2</p>
                  <p className="text-sm text-gray-500">Unread Journal Submissions</p>
                </div>
                <button className="bg-[#2D0F7F] text-white mt-4 py-2 rounded hover:bg-[#1f2b6d] transition">Go to Journal Submissions</button>
              </div>
            </div>
          </div>

          {/* Right Column (1/3 Width) */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded shadow text-center h-[287px]">
              <p className='text-[30px] text-start font-semibold text-[#3F3F46]'>Interns Overview</p>
              <div className='bg-[#B5DBFF] h-[183px] rounded-[10px]'>
              <p className="text-[120px] font-bold text-[#2D0F7F]">10</p>
              <p className="text-[25px] text-[#0059AB] font-medium -mt-10">Current Committed Interns</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded shadow">
              <p className="font-semibold mb-2 text-center">February 2024</p>
              <div className="grid grid-cols-7 text-sm gap-2 text-center text-gray-500">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d, i) => (
                  <div key={i} className="font-bold">{d}</div>
                ))}
                {Array.from({ length: 31 + new Date(2024, 1, 1).getDay() }).map((_, i) => {
                  const day = i - new Date(2024, 1, 1).getDay() + 1;
                  return (
                    <div key={i} className={`py-1 rounded ${day === 15 ? 'bg-[#2D0F7F] text-white' : ''}`}>
                      {day > 0 && day <= 29 ? day : ''}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        
      </div>
      <Footer />
    </div>
  );
}

export default CompanyDashboard;
