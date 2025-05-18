import React, { useState, useEffect } from "react";
import { auth } from "../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Sidebar from "../PageComponents/sidebar";
import Header from "../PageComponents/header";
import Footer from "../PageComponents/footer";
import { LuUser } from "react-icons/lu";
import Calendar from "../PageComponents/Calendar";
import LoadingOverlay from "../../components/loadingOverlay"; // ✅ Import spinner

function StudentDashboard() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [company, setCompany] = useState("");
  const [loading, setLoading] = useState(true); // ✅ loading state
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const monthName = today.toLocaleString("default", { month: "long" });
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const daysArray = [];
  for (let i = 0; i < firstDay; i++) daysArray.push(null);
  for (let i = 1; i <= daysInMonth; i++) daysArray.push(i);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user?.email) {
        try {
          const res = await fetch(`${baseURL}/users?email=${user.email}`);
          const data = await res.json();
          if (data && data.firstName && data.company) {
            setFirstName(data.firstName);
            setCompany(data.company);
          } else {
            console.warn("User data not found or incomplete:", data);
          }
        } catch (error) {
          console.error("Failed to fetch user info:", error);
        } finally {
          setLoading(false);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="flex flex-col min-h-screen relative">
      <Sidebar
        isExpanded={isSidebarExpanded}
        setIsExpanded={setIsSidebarExpanded}
      />

      <div
        className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${
          isSidebarExpanded ? "ml-[400px]" : "ml-[106px]"
        } bg-[#ffffff] relative`}
      >
        {loading && <LoadingOverlay />}

        <Header />
        <div className="p-8 grid grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="col-span-2 space-y-6">
            {/* Welcome Card */}
            <div className="bg-white p-5 rounded-[10px] shadow flex items-center justify-between border-2 border-[#B9B9B9]">
              <div className="flex items-center gap-4 h-[118px]">
                <div className="flex items-center justify-center">
                  <LuUser size={65} />
                </div>
                <div>
                  <p className="text-[33px] font-semibold">Hello, {firstName || "Intern"}!</p>
                  <p className="text-[20px]">{company ? `${company} Intern` : "Intern"}</p>
                </div>
              </div>
              <div className="w-[20px] h-[20px] rounded-full bg-[#3BC651]" />
            </div>

            {/* Attendance Summary */}
            <div className="bg-white p-6 rounded-[10px] shadow border-2 border-[#B9B9B9]">
              <div className="text-[30px] font-semibold text-[#3F3F46] mb-4">
                Attendance Summary
              </div>
              <div className="grid grid-cols-3 gap-4">
                {/* Present */}
                <div className="bg-[#F9FAFD] p-4 rounded-[10px] border-3 border-[#6BD37C]">
                  <div className="flex justify-between items-center mt-7">
                    <div>
                      <p className="text-[40px] font-bold text-[#6BD37C]">100</p>
                      <p className="text-[20px] text-[#6BD37C]">Days</p>
                    </div>
                    <img src="/pictures/Green.png" alt="Present Icon" className="w-[85px] mr-5" />
                  </div>
                  <p className="text-start text-[25px] font-semibold text-[#6BD37C] mt-5">
                    Total Present Days
                  </p>
                </div>

                {/* Late */}
                <div className="bg-[#F9FAFD] p-4 rounded-[10px] border-3 border-[#F38A40]">
                  <div className="flex justify-between items-center mt-7">
                    <div>
                      <p className="text-[40px] font-bold text-[#F38A40]">2</p>
                      <p className="text-[20px] text-[#F38A40]">Hours</p>
                    </div>
                    <img src="/pictures/Orange.png" alt="Late Icon" className="w-[85px] mr-5" />
                  </div>
                  <p className="text-start text-[25px] font-semibold text-[#F38A40] mt-5">
                    Total Late Time
                  </p>
                </div>

                {/* Absent */}
                <div className="bg-[#F9FAFD] p-4 rounded-[10px] border-3 border-[#9B3F62]">
                  <div className="flex justify-between items-center mt-7">
                    <div>
                      <p className="text-[40px] font-bold text-[#9B3F62]">0</p>
                      <p className="text-[20px] text-[#9B3F62]">Days</p>
                    </div>
                    <img src="/pictures/Pink.png" alt="Absent Icon" className="w-[85px] mr-5" />
                  </div>
                  <p className="text-start text-[25px] font-semibold text-[#9B3F62] mt-5">
                    Total Absent Days
                  </p>
                </div>
              </div>
            </div>

            {/* Tasks & Journal */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-[10px] shadow border-2 border-[#B9B9B9]">
                <h1 className="text-[30px] font-semibold mb-4 text-[#3F3F46]">
                  Time Remaining
                </h1>
                <div className="flex justify-around">
                  <div className="flex flex-col items-center">
                    <svg className="h-38 mb-1" viewBox="0 0 36 36">
                      <path fill="none" stroke="#1E3A8A" strokeWidth="4" strokeDasharray="53,100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831" />
                      <text x="18" y="22" textAnchor="middle" fill="#1E3A8A" fontSize="6" fontWeight="bold">19/62</text>
                    </svg>
                    <span className="text-[25px]">Days</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <svg className="h-38 mb-1" viewBox="0 0 36 36">
                      <path fill="none" stroke="#1E3A8A" strokeWidth="4" strokeDasharray="31,100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831" />
                      <text x="18" y="22" textAnchor="middle" fill="#1E3A8A" fontSize="6" fontWeight="bold">150/486</text>
                    </svg>
                    <span className="text-[25px]">Hours</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-[10px] shadow border-2 border-[#B9B9B9] h-[305px] relative overflow-hidden">
                <h2 className="text-[27px] font-semibold mb-4 bg-white text-[#3F3F46] px-2 rounded relative z-10">
                  Recently Accessed Role
                </h2>
                <div className="text-[35px] font-bold text-[#1F3463] content-center px-2 rounded relative z-10 h-[200px] flex items-center justify-center">
                  Project Management
                </div>
                <div className="absolute top-[85px] left-0 w-full h-[210px] bg-cover bg-center opacity-50 z-0" style={{ backgroundImage: "url('/pictures/PM.jpg')" }}></div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-[10px] shadow text-center border-2 border-[#B9B9B9]">
              <h1 className="text-[26px] font-semibold mb-4 text-[#3F3F46]">Journal Submission</h1>
              <p className="text-gray-700 bg-[#F1F1F1] h-[160px] p-5 text-[20px]">
                {firstName} – {new Date().toLocaleDateString('en-US', {
                  month: 'long',
                  day: '2-digit',
                  year: 'numeric'
                })}
              </p>
            </div>

            <div>
              <Calendar className="w-[500px] h-[550px] border-2 border-[#B9B9B9] rounded-[5px]" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default StudentDashboard;
