import React, { useState, useEffect } from 'react';
import Sidebar from '../PageComponents/sidebar';
import Footer from '../PageComponents/footer';
import Header from '../PageComponents/header';
import { auth } from '../../firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import axios from 'axios';

function AttendanceSubmission() {
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

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const checkAttendance = async (email) => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/attendance/today?email=${email}`);
        if (res.data) {
          setRecordId(res.data._id);
          setTimeIn(res.data.timeIn || '');
          setTimeOut(res.data.timeOut || '');
          setAttendanceSubmitted(!!res.data.timeIn && !!res.data.timeOut);
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

  const formatTime = (date = new Date()) =>
    date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

  const handleTimeClick = async () => {
    const nowFormatted = formatTime();

    if (canTimeIn) {
      try {
        const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/attendance/timein`, {
          email: userEmail,
        });
        setRecordId(res.data._id);
        setTimeIn(res.data.timeIn);
        setCanTimeIn(false);
        setCanTimeOut(true);
      } catch (err) {
        console.error('Failed to time in:', err);
      }
    } else if (canTimeOut && recordId) {
      try {
        const res = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/attendance/timeout/${recordId}`);
        setTimeOut(res.data.timeOut);
        setCanTimeOut(false);
      } catch (err) {
        console.error('Failed to time out:', err);
      }
    }
  };

  const resetAndDisableTimeButton = attendanceSubmitted;

  const handleSubmit = async () => {
    try {
      await axios.put(`${import.meta.env.VITE_API_BASE_URL}/attendance/submit/${recordId}`);
      setAttendanceSubmitted(true);
      setSubmittedMessage(true);
    } catch (err) {
      console.error('Failed to submit attendance:', err);
    }
  };

  const showSubmitButton = timeIn && timeOut;

  return (
    <div className="flex min-h-screen">
      <Sidebar isExpanded={isSidebarExpanded} setIsExpanded={setIsSidebarExpanded} />
      <div className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${isSidebarExpanded ? "ml-[400px]" : "ml-[106px]"} bg-[#FAFAFF]`}>
        <Header />
        <div className='flex-1 flex items-center justify-center p-10'>
          <div className='flex gap-12 justify-center items-start'>
            {/* Clock Display */}
            <div className='flex flex-col items-center mt-10'>
              <div className='bg-gray-100 rounded shadow p-6 text-center w-[542px] text-[#373737]'>
                <p className='text-[35px] font-semibold mb-2'>
                  {currentTime.toLocaleDateString(undefined, { weekday: 'long' })}
                </p>
                <h1 className='text-[60px] font-semibold'>{currentTime.toLocaleTimeString()}</h1>
                <p className='text-[35px] mt-2 font-semibold'>
                  {currentTime.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: '2-digit' })}
                </p>
              </div>

              {/* Time Button */}
              <button
                onClick={handleTimeClick}
                className={`mt-4 py-2 text-[28px] w-full rounded font-semibold ${
                  (resetAndDisableTimeButton || (!canTimeIn && !canTimeOut))
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-[#2D0F7F] hover:bg-[#1F3463] text-white"
                }`}
                disabled={resetAndDisableTimeButton || (!canTimeIn && !canTimeOut)}
              >
                {attendanceSubmitted
                  ? "Time In"
                  : canTimeIn
                  ? "Time In"
                  : canTimeOut
                  ? "Time Out"
                  : "Time Out"}
              </button>


              {/* Message Display Area */}
               {!submittedMessage && (
                <div className="h-[64px] flex items-center justify-center mt-3">
                  {timeIn && !timeOut ? (
                    <p className="text-[#0385FF] text-[25px] font-regular max-w-[300px] text-center">
                      Time In Successfully! Time in at {timeIn}.
                    </p>
                  ) : timeOut ? (
                    <p className="text-[#0385FF] text-[25px] font-regular max-w-[300px] text-center">
                      Time Out Successfully! Time out at {timeOut}.
                    </p>
                  ) : (
                    <div className="h-[25px]" />
                  )}
                </div>
              )}
            </div>

            {/* Time Info Summary */}
            <div className='w-[817px] flex flex-col'>
              <div className='flex justify-evenly gap-35 text-sm text-gray-500 font-medium'>
                <span></span>
                <span className='text-[28px]'>Date</span>
                <span className='text-[28px] mb-1'>Time</span>
              </div>

              <div className='bg-[#F9FAFD] py-[59px] text-[25px] shadow border border-[#797979] rounded-[10px] mb-4 flex justify-evenly gap-15 text-[#2D0F7F] font-semibold items-center'>
                <span className='text-black'>Time In</span>
                <span className='text-[#556689]'>{timeIn ? new Date().toLocaleDateString() : 'MM/DD/YYYY'}</span>
                <span className='text-[#556689]'>{timeIn || '00:00:00'}</span>
              </div>

              <div className='bg-[#F9FAFD] py-[59px] text-[25px] shadow border border-[#797979] rounded-[10px] mb-4 flex justify-evenly gap-15 text-[#2D0F7F] font-semibold items-center'>
                <span className='text-black'>Time Out</span>
                <span className='text-[#556689]'>{timeOut ? new Date().toLocaleDateString() : 'MM/DD/YYYY'}</span>
                <span className='text-[#556689]'>{timeOut || '00:00:00'}</span>
              </div>

              {showSubmitButton && (
                <div className='flex flex-col items-center'>
                  <button
                    onClick={handleSubmit}
                    className={`text-[30px] font-semibold px-10 py-2 rounded text-white ${
                      submittedMessage
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-[#1E3A8A] hover:bg-gray-600'
                    }`}
                    disabled={submittedMessage}
                  >
                    Submit Attendance
                  </button>
                  {submittedMessage && (
                    <p className="text-[#0385FF] text-[22px] text-center mt-4 font-regular">
                      You have submitted your attendance!
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default AttendanceSubmission;
