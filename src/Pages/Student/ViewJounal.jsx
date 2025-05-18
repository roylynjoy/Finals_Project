import React, { useEffect, useState, useRef } from 'react';
import { auth } from '../../firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../PageComponents/header';
import Sidebar from '../PageComponents/sidebar';
import Footer from '../PageComponents/footer';
import LoadingOverlay from '../../components/loadingOverlay';

function ViewJournal() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [journalContent, setJournalContent] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const journalContentRef = useRef(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchJournal = async () => {
      try {
        const startTime = Date.now();

        const response = await axios.get('/api/journal/today');
        if (response.status === 200 && response.data?.content) {
          setJournalContent(response.data.content);
        } else {
          navigate('/Journal');
          return;
        }

        const duration = Date.now() - startTime;
        const delay = Math.max(500 - duration, 0);
        setTimeout(() => setLoading(false), delay);
      } catch (err) {
        console.error("Error fetching journal:", err);
        navigate('/Journal');
      }
    };

    const unsubscribe = onAuthStateChanged(auth, () => {
      fetchJournal();
    });

    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;

      if (user && user.email) {
        try {
          const res = await fetch(`${baseURL}/users?email=${user.email}`);
          const data = await res.json();

          if (data && data.firstName && data.lastName) {
            setFirstName(data.firstName);
            setLastName(data.lastName);
          }
        } catch (error) {
          console.error("Failed to fetch user info:", error);
        }
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="relative">
      <Sidebar isExpanded={isSidebarExpanded} setIsExpanded={setIsSidebarExpanded} />
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ease-in-out relative ${
          isSidebarExpanded ? 'ml-[400px]' : 'ml-[106px]'
        } bg-white min-h-screen`}
      >
        <Header />

        {loading && <LoadingOverlay />}

        <div className="p-6">
          <div className="bg-[#F9FAFD] rounded-md shadow-md p-10">
            <h2 className="text-[25px] font-semibold mb-2">
              {firstName} {lastName} - {new Date().toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' })}
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
