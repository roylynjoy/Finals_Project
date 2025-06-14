// src/services/student/useJournalData.js
import { useEffect, useRef, useState } from 'react';
import { auth } from '../../firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const useJournalData = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [journalContent, setJournalContent] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(true);
  const journalContentRef = useRef(null);
  const navigate = useNavigate();
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchUserAndJournal = async () => {
      const user = auth.currentUser;
      if (!user?.email) return;

      try {
        const userRes = await fetch(`${baseURL}/user?email=${user.email}`);
        const userData = await userRes.json();

        if (!userData.firstName || !userData.lastName) {
          throw new Error("Incomplete user data");
        }

        setFirstName(userData.firstName);
        setLastName(userData.lastName);

        const response = await axios.get(
          `${baseURL}/journal/today?firstName=${encodeURIComponent(userData.firstName)}&lastName=${encodeURIComponent(userData.lastName)}`
        );

        if (response.status === 200 && response.data?.content) {
          setJournalContent(response.data.content);
        } else {
          navigate('/Journal');
        }
      } catch (error) {
        console.error("Error fetching journal:", error);
        navigate('/Journal');
      } finally {
        setTimeout(() => setLoading(false), 500);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, fetchUserAndJournal);
    return () => unsubscribe();
  }, [navigate, baseURL]);

  return {
    isSidebarExpanded,
    setIsSidebarExpanded,
    journalContent,
    firstName,
    lastName,
    journalContentRef,
    loading,
  };
};

export default useJournalData;
