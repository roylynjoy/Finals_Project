import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRegTrashAlt } from 'react-icons/fa';
import { BiEnvelope, BiEnvelopeOpen } from 'react-icons/bi';
import CompanySidebar from '../PageComponents/CompanySidebar';
import CompanyHeader from '../PageComponents/CompanyHeader';
import Footer from '../PageComponents/footer';
import { useCompanyJournal } from '../../services/coordinator/useCompanyJournal';

function CompanyJournal() {
  const {
    isSidebarExpanded,
    setIsSidebarExpanded,
    filteredJournals,
    selectedDate,
    setSelectedDate,
    loading,
    toggleViewed,
    handleRemove,
  } = useCompanyJournal();

  const navigate = useNavigate();

  const handleView = async (entry) => {
    if (!entry.viewed) {
      await toggleViewed(entry._id, false);
    }
    navigate(`/CompanyViewJournal/${entry._id}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <CompanySidebar isExpanded={isSidebarExpanded} setIsExpanded={setIsSidebarExpanded} />
      <div className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${isSidebarExpanded ? 'ml-[400px]' : 'ml-[106px]'} bg-white min-h-screen`}>
        <CompanyHeader isExpanded={isSidebarExpanded} />
        <div className="mt-20 py-12 px-30">
          <div className="mb-6">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="border border-gray-300 rounded-md p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {!selectedDate ? (
            <p className="text-gray-500 text-xl">Select a date to view daily journal submissions.</p>
          ) : filteredJournals.length === 0 ? (
            <p className="text-center text-gray-500 text-xl mt-50">No journal entries found for this date.</p>
          ) : (
            <div className="overflow-x-auto">
              <div className="grid grid-cols-5 gap-6 min-w-[1400px]">
                {filteredJournals.map((entry, index) => (
                  <div key={index} className="bg-[#F9FAFD] shadow rounded border border-[#C2C2C2] p-4 flex flex-col justify-between w-full h-[370px]">
                    <div className="flex-1 mb-6">
                      <p className={`text-[20px] leading-snug ${entry.viewed ? 'font-normal' : 'font-bold'}`}>
                        {entry.firstName} {entry.lastName}<br />
                        <span className="text-gray-500 text-xs">
                          {new Date(entry.createdAt).toLocaleDateString('en-US', {
                            month: 'long',
                            day: '2-digit',
                            year: 'numeric'
                          })}
                        </span>
                      </p>
                    </div>
                    <div className="flex justify-between items-center border-t-3 border-[#959494] pt-3">
                    <button
                      onClick={() => toggleViewed(entry._id, entry.viewed)}
                      title={entry.viewed ? 'Mark as unread' : 'Mark as read'}
                    >
                      {entry.viewed ? (
                        <BiEnvelopeOpen size={30} className="text-black hover:text-gray-700 cursor-pointer" />
                      ) : (
                        <BiEnvelope size={30} className="text-[#0060F0] hover:text-blue-700 cursor-pointer" />
                      )}
                    </button>

                      { entry.viewed ? (<button
                        onClick={() => handleView(entry)}
                        className="flex items-center gap-2 px-7 py-1 text-black bg-[#D9D9D9] border-1 border-black/10 rounded text-[20px] hover:bg-[#B0B0B0] cursor-pointer"
                      >
                        View
                      </button>) : (
                      <button
                        onClick={() => handleView(entry)}
                        className="flex items-center gap-2 px-7 py-1 text-white bg-[#0385FF] rounded text-[20px] hover:bg-[#5CAEFF] cursor-pointer">
                        View
                      </button>
                      )}
                      <button
                        className="text-[#1D1B20] hover:text-red-600 cursor-pointer"
                        onClick={() => handleRemove(entry._id)}
                      >
                        <FaRegTrashAlt size={28} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CompanyJournal;
