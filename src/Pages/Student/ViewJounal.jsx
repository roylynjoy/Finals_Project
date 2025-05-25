import React, { useEffect, useState, useRef } from 'react';
import { auth } from '../../firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../PageComponents/header';
import Sidebar from '../PageComponents/sidebar';
import Footer from '../PageComponents/footer';
import Skeleton from '../../components/Skeleton';

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

  const isDataLoaded = !loading && firstName && lastName && journalContent;

  return (
    <div className="flex min-h-screen">
      <Sidebar isExpanded={isSidebarExpanded} setIsExpanded={setIsSidebarExpanded} />

      <div
        className={`flex flex-col flex-1 transition-all duration-300 ease-in-out ${
          isSidebarExpanded ? 'ml-[400px]' : 'ml-[106px]'
        } bg-white`}
      >
        <Header />

        {/* Main Content fills remaining space */}
        <div className="flex flex-col flex-1 px-10 py-6">
          <div className="bg-[#F9FAFD] mt-20 ml-10 mr-10 border border-[#B9B9B9] rounded-md shadow-lg px-10 h-[75vh] flex flex-col">
          <div className="h-[40px] mb-5 mt-10 flex items-center">
            {firstName && lastName ? (
              <h2 className="text-[25px] font-semibold">
                {firstName} {lastName} -{' '}
                {new Date().toLocaleDateString('en-US', {
                  month: 'long',
                  day: '2-digit',
                  year: 'numeric',
                })}
              </h2>
            ) : (
              <Skeleton width="300px" height="35px" />
            )}
          </div>

            <p className="border-b border-[#959494] -ml-3 -mr-3 mb-7"></p>

            {loading ? (
              <div className="space-y-4 overflow-y-auto flex-1">
                <Skeleton width="30%" height="20px" />
              </div>
            ) : (
              <div
                ref={journalContentRef}
                className="overflow-y-auto flex-1 pr-2"
                dangerouslySetInnerHTML={{ __html: journalContent }}
              />
            )}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default ViewJournal;
