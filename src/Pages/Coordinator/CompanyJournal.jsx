import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import axios from 'axios';
import CompanySidebar from '../PageComponents/CompanySidebar';
import CompanyHeader from '../PageComponents/CompanyHeader';
import Footer from '../PageComponents/footer';
import { FaRegTrashAlt } from 'react-icons/fa';
import { BiEnvelope, BiEnvelopeOpen } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

function getTodayDateString() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function CompanyJournal() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [allJournals, setAllJournals] = useState([]);
  const [filteredJournals, setFilteredJournals] = useState([]);
  const [selectedDate, setSelectedDate] = useState(getTodayDateString());
  const [loading, setLoading] = useState(false);

  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();

  const fetchJournals = async (email) => {
    try {
      setLoading(true);
      const res = await axios.get(`${baseURL}/journal/company?email=${email}`);
      const data = Array.isArray(res.data) ? res.data : [];
      const filtered = data.filter(journal => journal.removed !== true);
      setAllJournals(filtered);
    } catch (err) {
      console.error('Failed to load journal entries:', err);
      setAllJournals([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user?.email) {
        await fetchJournals(user.email);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!selectedDate) {
      setFilteredJournals([]);
      return;
    }

    const formatted = new Date(selectedDate).toLocaleDateString();
    const filtered = allJournals.filter(journal =>
      new Date(journal.createdAt).toLocaleDateString() === formatted
    );
    setFilteredJournals(filtered);
  }, [selectedDate, allJournals]);

  const toggleViewed = async (id, currentViewed) => {
    try {
      await axios.patch(`${baseURL}/journal/${id}/viewed`, { viewed: !currentViewed });
      setAllJournals(prev =>
        prev.map(j => j._id === id ? { ...j, viewed: !currentViewed } : j)
      );
    } catch (err) {
      console.error('Failed to toggle viewed:', err);
    }
  };

  const handleView = async (entry) => {
    if (!entry.viewed) {
      await toggleViewed(entry._id, false);
    }
    navigate(`/CompanyViewJournal/${entry._id}`);
  };

  const handleRemove = async (id) => {
    try {
      await axios.patch(`${baseURL}/journal/${id}/remove`, { removed: true });
      setAllJournals(prev => prev.filter(j => j._id !== id));
    } catch (err) {
      console.error('Failed to remove journal:', err);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <CompanySidebar isExpanded={isSidebarExpanded} setIsExpanded={setIsSidebarExpanded} />
      <div className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${isSidebarExpanded ? 'ml-[400px]' : 'ml-[106px]'} bg-white min-h-screen`}>
        <CompanyHeader isExpanded={isSidebarExpanded} />
        <div className="py-12 px-30 mt-[100px]">
          <div className="mb-6">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="border border-gray-300 rounded-md p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {loading ? (
            <div className="text-center text-lg">Loading journal entries...</div>
          ) : !selectedDate ? (
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
                        <BiEnvelopeOpen size={30} className="text-black hover:text-gray-700" />
                      ) : (
                        <BiEnvelope size={30} className="text-[#0060F0] hover:text-blue-700" />
                      )}
                    </button>

                      { entry.viewed ? (<button
                        onClick={() => handleView(entry)}
                        className="flex items-center gap-2 px-7 py-1 text-black bg-[#D9D9D9] border-1 rounded text-[20px] hover:bg-[#006ad1]"
                      >
                        View
                      </button>) : (
                      <button
                        onClick={() => handleView(entry)}
                        className="flex items-center gap-2 px-7 py-1 text-white bg-[#0385FF] rounded text-[20px] hover:bg-[#006ad1]">
                        View
                      </button>
                      )}
                      <button
                        className="text-[#1D1B20] hover:text-red-600"
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
