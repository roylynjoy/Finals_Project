import React, { useState } from 'react';
import CompanySidebar from './CompanySidebar';
import CompanyHeader from './CompanyHeader';
import Footer from './footer';
import { FaEye, FaTrash } from 'react-icons/fa';

function CompanyJournal() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  const journalEntries = [
    'Antonio Andres Watson',
    'Charles Marc Herve Leclerc',
    'Kimi Andrea Antonelli',
    'Ivan Amber Gray Silvan',
    'Mikhael Timothy Alonso',
    'Aaron Bonnin Williams',
    'Carlos Sainz Vasquez De Castro',
    'Oliver James Bearman',
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <CompanySidebar
        isExpanded={isSidebarExpanded}
        setIsExpanded={setIsSidebarExpanded}
      />
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${
          isSidebarExpanded ? 'ml-[400px]' : 'ml-[106px]'
        } bg-[#FAFAFF] min-h-screen`}
      >
        <CompanyHeader />

        {/* Journal Submission Section */}
        <div className="px-10 py-6">

          {/* Force 5 entries per row */}
          <div className="overflow-x-auto">
            <div className="grid grid-cols-5 gap-6 min-w-[1400px]">
              {journalEntries.map((name, index) => (
                <div
                  key={index}
                  className="bg-[#F9FAFD] shadow rounded border border-[#C2C2C2] p-4 flex flex-col justify-between w-full h-[370px]"
                >
                  <div className="flex-1 mb-6">
                    <p className="text-[20px] font-medium leading-snug">
                      {name}
                      <br />
                      <span className="text-gray-500 text-xs">January 01, 2025</span>
                    </p>
                  </div>

                  <div className="flex justify-between items-center border-t-3 border-[#959494] pt-3">
                    <button className="flex items-center gap-2 px-3 py-1 text-white bg-[#0385FF] rounded text-sm hover:bg-[#1F3463]">
                      <FaEye size={14} />
                      View
                    </button>
                    <button className="text-gray-500 hover:text-red-600">
                      <FaTrash size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CompanyJournal;
