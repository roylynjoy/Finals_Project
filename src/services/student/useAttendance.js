// /services/student/useAttendance.js
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase/firebase';
import axios from 'axios';

export default function useAttendance() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [timeIn, setTimeIn] = useState('');
  const [timeOut, setTimeOut] = useState('');
  const [recordId, setRecordId] = useState(null);
  const [userEmail, setUserEmail] = useState('');
  const [canTimeIn, setCanTimeIn] = useState(false);
  const [canTimeOut, setCanTimeOut] = useState(false);
  const [attendanceSubmitted, setAttendanceSubmitted] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState(false);
  const [loading, setLoading] = useState(true);
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const checkAttendance = async (email) => {
      const start = Date.now();
      try {
        const res = await axios.get(`${baseURL}/attendance/today?email=${email}`);
        if (res.data) {
          setRecordId(res.data._id);
          setTimeIn(res.data.timeIn || '');
          setTimeOut(res.data.timeOut || '');
          setAttendanceSubmitted(!!res.data.submitted);
          setSubmittedMessage(!!res.data.submitted);
          setCanTimeIn(!res.data.timeIn);
          setCanTimeOut(!!res.data.timeIn && !res.data.timeOut);
        } else {
          setCanTimeIn(true);
        }
      } catch (err) {
        if (err.response?.status === 404) {
          setCanTimeIn(true);
        } else {
          console.error('Error fetching attendance:', err);
        }
      } finally {
        const elapsed = Date.now() - start;
        const delay = Math.max(300 - elapsed, 0);
        setTimeout(() => setLoading(false), delay);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user?.email) {
        setUserEmail(user.email);
        await checkAttendance(user.email);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleTimeClick = async () => {
    if (canTimeIn) {
      try {
        const res = await axios.post(`${baseURL}/attendance/timein`, { email: userEmail });
        setRecordId(res.data._id);
        setTimeIn(res.data.timeIn);
        setCanTimeIn(false);
        setCanTimeOut(true);
      } catch (err) {
        console.error('Failed to time in:', err);
      }
    } else if (canTimeOut && recordId) {
      try {
        const res = await axios.put(`${baseURL}/attendance/timeout/${recordId}`);
        setTimeOut(res.data.timeOut);
        setCanTimeOut(false);
      } catch (err) {
        console.error('Failed to time out:', err);
      }
    }
  };

  const handleSubmit = async () => {
    try {
      await axios.put(`${baseURL}/attendance/submit/${recordId}`);
      setAttendanceSubmitted(true);
      setSubmittedMessage(true);
    } catch (err) {
      console.error('Failed to submit attendance:', err);
    }
  };

  return {
    isSidebarExpanded,
    setIsSidebarExpanded,
    currentTime,
    timeIn,
    timeOut,
    attendanceSubmitted,
    submittedMessage,
    loading,
    canTimeIn,
    canTimeOut,
    handleTimeClick,
    handleSubmit,
  };
}
