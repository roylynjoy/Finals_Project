import React, { useState, useEffect } from 'react';
import { auth } from '../firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import axios from 'axios';
import CompanySidebar from './CompanySidebar';
import CompanyHeader from './CompanyHeader';
import Footer from './footer';
import { FaEye, FaTrash } from 'react-icons/fa';

function CompanyJournal() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [journals, setJournals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user?.email) {
        try {
          const res = await axios.get(`http://localhost:5000/api/journal/company?email=${user.email}`);
          setJournals(res.data);
        } catch (err) {
          console.error('Failed to load company journal entries:', err);
        } finally {
          setLoading(false);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <CompanySidebar
        isExpanded={isSidebarExpanded}
        setIsExpanded={setIsSidebarExpanded}
      />
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${
          isSidebarExpanded ? 'ml-[400px]' : 'ml-[106px]'
        } bg-white min-h-screen`}
      >
        <CompanyHeader />

        {/* Journal Submission Section */}
        <div className="px-10 py-6">
          {loading ? (
            <div className="text-center text-lg">Loading journal entries...</div>
          ) : (
            <div className="overflow-x-auto">
              {journals.length > 0 ? (
                <div className="grid grid-cols-5 gap-6 min-w-[1400px]">
                  {journals.map((entry, index) => (
                    <div
                      key={index}
                      className="bg-[#F9FAFD] shadow rounded border border-[#C2C2C2] p-4 flex flex-col justify-between w-full h-[370px]"
                    >
                      <div className="flex-1 mb-6">
                        <p className="text-[20px] font-medium leading-snug">
                          {entry.firstName} {entry.lastName}
                          <br />
                          <span className="text-gray-500 text-xs">
                            {new Date(entry.createdAt).toLocaleDateString('en-US', {
                              month: 'long',
                              day: '2-digit',
                              year: 'numeric',
                            })}
                          </span>
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
              ) : (
                <p className="text-center text-gray-500 text-xl">No journal entries found for your company.</p>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CompanyJournal;
