import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import CompanySidebar from './CompanySidebar';
import CompanyHeader from './CompanyHeader';
import Footer from './footer';
import Calendar from './Calendar';
import { LuUser } from "react-icons/lu";

function CompanyDashboard() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [company, setCompany] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user && user.email) {
        try {
          const res = await fetch(`http://localhost:5000/api/users?email=${user.email}`);
          const data = await res.json();

          if (data && data.firstName && data.company) {
            setFirstName(data.firstName);
            setCompany(data.company);
          } else {
            console.warn("User data not found or incomplete:", data);
          }
        } catch (error) {
          console.error("Failed to fetch user info:", error);
        }
      }
    };
    fetchUserData();
  }, []);
  
  return (
    <div className="flex flex-col min-h-screen">
      <CompanySidebar isExpanded={isSidebarExpanded} setIsExpanded={setIsSidebarExpanded} />
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${
          isSidebarExpanded ? 'ml-[400px]' : 'ml-[106px]'
        } bg-white`}
      >
        <CompanyHeader />

        {/* Main Content */}
        <div className="p-8 grid grid-cols-3 gap-6">
          {/* Left Column (2/3 Width) */}
          <div className="col-span-2 space-y-6">
            {/* Company Info */}
            <div className="bg-white p-5 rounded-[10px] shadow flex items-center justify-between border-2 border-[#B9B9B9]">
              <div className="flex items-center gap-4 h-[118px]">
                <div className="flex items-center justify-center"><LuUser size={65}/></div>
                <div>
                <p className="text-[33px] font-semibold">Hello, {firstName || "Coordinator!"}!</p>
                <p className="text-[20px]">{company ? `${company} Coordinator` : "Coordinator"}</p>
                </div>
              </div>
              <div className="w-[20px] h-[20px] rounded-full bg-[#3BC651]" />
            </div>

            {/* Attendance Summary */}
            <div className="bg-white p-6 rounded-[10px] shadow border-2 border-[#B9B9B9]">
              <div className="text-[30px] font-semibold text-[#3F3F46] mb-4">Attendance Summary</div>
              <div className="grid grid-cols-3 gap-4 ">
                
                {/* Present */}
                <div className="bg-[#F9FAFD] p-4  rounded border-2 border-[#B9B9B9]">
                  <div className="flex justify-between items-center mt-7">
                    <div>
                      <p className="text-[40px] font-bold text-[#3F3F46]">0</p>
                      <p className="text-[20px] text-[#3F3F46]">Interns</p>
                    </div>
                    <img src="/pictures/Green.png" alt="Present Icon" className="w-[85px] mr-5" />
                  </div>
                  <p className="text-start text-[25px] font-semibold text-green-700 mt-5 ">Present</p>
                </div>

                {/* Late */}
                <div className="bg-[#F9FAFD] p-4 rounded border-2 border-[#B9B9B9]">
                  <div className="flex justify-between items-center  mt-7">
                    <div>
                      <p className="text-[40px] font-bold text-[#3F3F46]">0</p>
                      <p className="text-[20px] text-[#3F3F46]">Interns</p>
                    </div>
                    <img src="/pictures/Orange.png" alt="Late Icon" className="w-[85px] mr-5" />
                  </div>
                  <p className="text-start text-[25px] font-semibold text-yellow-700 mt-5">Late</p>
                </div>

                {/* Absent */}
                <div className="bg-[#F9FAFD] p-4 rounded border-2 border-[#B9B9B9]">
                  <div className="flex justify-between items-center  mt-7">
                    <div>
                      <p className="text-[40px] font-bold text-[#3F3F46]">0</p>
                      <p className="text-[20px] text-[#3F3F46]">Interns</p>
                    </div>
                    <img src="/pictures/Pink.png" alt="Absent Icon" className="w-[85px] mr-5" />
                  </div>
                  <p className="text-start text-[25px] font-semibold text-red-700 mt-5">Absent</p>
                </div>

              </div>
            </div>



            {/* Tasks & Journal */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-[10px] shadow text-center border-2  border-[#B9B9B9]">
                <div>
                  <p className="text-[30px] font-semibold mb-4 text-[#3F3F46]">Attendance Tracking</p>
                  <h1 className='font-bold text-[90px] text-[#FF4400]'>8</h1>
                  <p className='text-[20px] text-[#FF4400]'>Pending Attendance</p>
                </div>
                <button className="bg-[#0385FF] text-white mt-4 py-4 px-6 text-[20px] rounded-[10px]  transition">Go to Attendance Tracking</button>
              </div>
              <div className="bg-white p-6 rounded-[10px] shadow text-center border-2  border-[#B9B9B9]">
                <div>
                  <p className="text-[30px] font-semibold mb-4 text-[#3F3F46]">Journal Submission</p>
                  <p className="text-[90px] font-bold text-[#FF4400]">2</p>
                  <p className="text-[20px] text-[#FF4400]">Unread Journal Submissions</p>
                </div>
                <button className="bg-[#0385FF] text-white mt-4 py-4 px-6 text-[20px] rounded-[10px] transition">Go to Journal Submissions</button>
              </div>
            </div>
          </div>

          {/* Right Column (1/3 Width) */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-[5px] shadow text-center h-[287px] border-2 border-[#B9B9B9] group">
              <p className='text-[30px] text-start font-semibold text-[#3F3F46]'>Interns Overview</p>

              <div className="border-2 border-[#0385FF] h-[183px] rounded mt-2 flex items-center justify-center relative overflow-hidden transition-colors duration-300 group-hover:bg-[#0385FF]">
                
                <div className="flex flex-col items-center justify-center transition-opacity duration-300 group-hover:opacity-0 absolute">
                  <p className="text-[90px] font-bold text-[#2D0F7F]">10</p>
                  <p className="text-[20px] text-[#0059AB] font-medium -mt-6">Current Committed Interns</p>
                </div>

                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute">
                  <button className="text-white underline text-[20px] font-medium">
                    Interns List
                  </button>
                </div>

              </div>
            </div>


              <div className="">
                <Calendar className="w-[500px] h-[575px] border-2 border-[#B9B9B9] rounded-[5px]"/>
              </div>
            </div>
          </div>

        
      </div>
      <Footer />
    </div>
  );
}

export default CompanyDashboard;
