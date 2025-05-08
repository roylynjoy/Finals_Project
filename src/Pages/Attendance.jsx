import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Footer from './footer';
import Header from './header';

function AttendanceSubmission() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [timeIn, setTimeIn] = useState('');
  const [timeOut, setTimeOut] = useState('');
  const [hasTimedIn, setHasTimedIn] = useState(false);
  const [hasTimedOut, setHasTimedOut] = useState(false);
  const [attendanceSubmitted, setAttendanceSubmitted] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleTimeClick = () => {
    const now = new Date().toLocaleTimeString();
    if (!hasTimedIn) {
      setTimeIn(now);
      setHasTimedIn(true);
    } else if (!hasTimedOut) {
      setTimeOut(now);
      setHasTimedOut(true);
    }
  };

  const handleSubmit = () => {
    if (hasTimedIn && hasTimedOut) {
      setAttendanceSubmitted(true);
    }
  };

  const resetAndDisableTimeButton = hasTimedIn && hasTimedOut;

  return (
    <div className="flex min-h-screen">
      <Sidebar isExpanded={isSidebarExpanded} setIsExpanded={setIsSidebarExpanded} />

      <div className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${isSidebarExpanded ? "ml-[400px]" : "ml-[106px]"} bg-[#FAFAFF]`}>
        {/* Header */}
        <Header />

        {/* Content */}
        <div className='flex-1 flex items-center justify-center p-10'>
          <div className='flex gap-12 justify-center items-center'>
            {/* Clock Display */}
            <div className='flex flex-col items-center'>
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
                  resetAndDisableTimeButton
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-[#2D0F7F] hover:bg-[#1F3463] text-white"
                }`}
                disabled={resetAndDisableTimeButton}
              >
                {resetAndDisableTimeButton ? "Time In" : (hasTimedIn ? (hasTimedOut ? "Attendance Completed" : "Time Out") : "Time In")}
              </button>

              {/* Message Display Area */}
              <div className="h-[64px] flex items-center justify-center mt-3">
                {!hasTimedOut && hasTimedIn ? (
                  <p className="text-[#0385FF] text-[25px] font-regular max-w-[300px] text-center">
                    Time In Successfully! Time in at {timeIn}.
                  </p>
                ) : hasTimedOut ? (
                  <p className="text-[#0385FF] text-[25px] font-regular max-w-[300px] text-center">
                    Time Out Successfully! Time out at {timeOut}.
                  </p>
                ) : (
                  <div className="h-[25px]" /> // reserved space
                )}
              </div>
            </div>

            {/* Time Info Summary */}
            <div className='w-[817px] flex flex-col'>
              <div className='flex justify-evenly gap-35 mt-6 text-sm text-gray-500 font-medium'>
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

              {/* Submit Button */}
              <div className='flex flex-col items-center'>
                <button
                  onClick={handleSubmit}
                  className={`text-[30px] font-semibold px-10 py-2 rounded ${
                    !hasTimedIn || !hasTimedOut || attendanceSubmitted
                      ? "bg-gray-400 text-white cursor-not-allowed"
                      : "bg-[#1E3A8A] hover:bg-gray-600 text-white"
                  }`}
                  disabled={!hasTimedIn || !hasTimedOut || attendanceSubmitted}
                >
                  Submit Attendance
                </button>

                {/* Submission Message Area with Reserved Space */}
                <div className="h-[50px] mt-4 flex items-center justify-center">
                  {attendanceSubmitted && (
                    <p className="text-[#0385FF] text-[22px] text-center font-regular">
                      You have submitted your attendance!
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}

export default AttendanceSubmission;
