import React, { useState } from 'react';
import CompanySidebar from '../Pages/CompanySidebar';
import CompanyHeader from '../Pages/CompanyHeader';
import Footer from './footer';

function CompanyAttendance() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const students = [
    {
      name: 'Antonio Andres Watson',
      timeIn: '8:00:01 AM',
      timeOut: '5:00:01 PM',
      totalHours: '8 Hours'
    },
    {
      name: 'Aaron Bonnin Williams',
      timeIn: '8:00:01 AM',
      timeOut: '5:00:01 PM',
      totalHours: '8 Hours'
    },
    {
      name: 'Charles Marc Herve Leclerc',
      timeIn: '8:00:01 AM',
      timeOut: '5:00:01 PM',
      totalHours: '8 Hours'
    },
    {
      name: 'Oliver James Bearman',
      timeIn: '8:00:01 AM',
      timeOut: '5:00:01 PM',
      totalHours: '8 Hours'
    },
    {
      name: 'Kimi Andrea Antonelli',
      timeIn: '8:00:01 AM',
      timeOut: '5:00:01 PM',
      totalHours: '8 Hours'
    }
  ];

  return (
    <div className="flex flex-col">
      <CompanySidebar isExpanded={isSidebarExpanded} setIsExpanded={setIsSidebarExpanded} />
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${
          isSidebarExpanded ? 'ml-[400px]' : 'ml-[106px]'
        } bg-[#FAFAFF] min-h-screen`}
      >
        <CompanyHeader />

        {/* Attendance Section */}
        <div className="py-12 px-30">
          

          {/* Date Picker */}
          <div className="mb-6">
            <input
              
              type="date"
              className="border border-gray-300 rounded-md p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Attendance Table */}
          <div className="overflow-x-auto text-[25px]">
            <table className="min-w-full bg-white rounded-lg border">
              <thead className="bg-[#2e1065] text-white text-left ">
                <tr>
                  <th className="py-4 pl-15">Name</th>
                  <th className="py-4 px-6">Time In</th>
                  <th className="py-4 px-6">Time Out</th>
                  <th className="py-4 ">Total Hours</th>
                  <th className=""></th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <tr
                    key={index}
                    onClick={() => setSelectedRow(index)}
                    className={`border-t cursor-pointer ${
                      selectedRow === index ? 'border-2' : ''
                    }`}
                  >
                    <td className="py-10 px-15 font-medium text-[#556689]">{student.name}</td>
                    <td className="py-4 px-6">{student.timeIn}</td>
                    <td className="py-4 px-6">{student.timeOut}</td>
                    <td className="py-4 px-6">{student.totalHours}</td>
                    <td className="py-4 px-6 pr-15 flex justify-end gap-4">
                      <button className="bg-[#64AD70] text-white px-4 py-3 rounded-md hover:bg-green-600 transition">
                        Approve
                      </button>
                      <button className="bg-[#D84040] text-white px-10 py-3 rounded-md hover:bg-red-600 transition">
                        Deny
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div> 
      <Footer />
    </div>
  );
}

export default CompanyAttendance;
