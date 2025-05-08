import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
import Header from './header';
import Sidebar from './Sidebar';
import Footer from './footer';

function ViewJournal() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [journalContent, setJournalContent] = useState('');
  const journalContentRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJournal = async () => {
      try {
        const response = await axios.get('/api/journal/today');
        if (response.status === 200) {
          setJournalContent(response.data.content); // Set journal content
        } else {
          navigate('/Journal'); 
        }
      } catch (err) {
        navigate('/Journal'); 
      }
    };

    fetchJournal();
  }, []);

  return (
    <div>
      <Sidebar isExpanded={isSidebarExpanded} setIsExpanded={setIsSidebarExpanded} />
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${
          isSidebarExpanded ? 'ml-[400px]' : 'ml-[106px]'
        } bg-white min-h-screen`}
      >
        <Header />
        <div className="p-6">
          <div className="bg-[#F9FAFD] rounded-md shadow-md p-10">
            <h2 className="text-[25px] font-semibold mb-2">
              Antonio Andres Watson - {new Date().toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' })}
            </h2>
            <p className='border-b border-[#959494] -ml-3 -mr-3 mb-7'></p>
            <div
              ref={journalContentRef}
              className="text-[25px]"
              dangerouslySetInnerHTML={{ __html: journalContent }}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ViewJournal;
