import React, { useState, useEffect } from "react";
import { auth } from "../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import CompanySidebar from "../PageComponents/CompanySidebar";
import CompanyHeader from "../PageComponents/CompanyHeader";
import Footer from "../PageComponents/footer";
import Calendar from "../PageComponents/Calendar";
import { LuUser } from "react-icons/lu";
import CompanyDashboardStats from "../../components/CompanyDashboardStats";
import Skeleton from "../../components/Skeleton";
import { useNavigate } from "react-router-dom";

function CompanyDashboard() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [company, setCompany] = useState("");
  const [loading, setLoading] = useState(true);

  const [present, setPresent] = useState(null);
  const [late, setLate] = useState(null);
  const [absent, setAbsent] = useState(null);
  const [pendingAttendance, setPendingAttendance] = useState(null);
  const [unreadJournals, setUnreadJournals] = useState(null);

  const navigate = useNavigate();
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user?.email) {
        try {
          const res = await fetch(`${baseURL}/user?email=${user.email}`);
          const data = await res.json();
          if (data && data.firstName && data.lastName && data.company) {
            setFirstName(data.firstName);
            setLastName(data.lastName);
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

  const handleCardNavigation = (buttonLabel) => {
    if (buttonLabel === "Go to Attendance Tracking") {
      navigate("/CompanyAttendance");
    } else if (buttonLabel === "Go to Journal Submissions") {
      navigate("/CompanyJournal");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <CompanySidebar isExpanded={isSidebarExpanded} setIsExpanded={setIsSidebarExpanded} />
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${
          isSidebarExpanded ? "ml-[400px]" : "ml-[106px]"
        } bg-white`}
      >
        <CompanyHeader isExpanded={isSidebarExpanded} firstName={firstName} />

        <CompanyDashboardStats
          onDataReady={({ presentInterns, lateInterns, absentInterns, pendingAttendance, unreadJournals }) => {
            setPresent(presentInterns);
            setLate(lateInterns);
            setAbsent(absentInterns);
            setPendingAttendance(pendingAttendance);
            setUnreadJournals(unreadJournals);
          }}
        />

        <div className="mt-20 p-8 grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-6">
            {/* Company Info */}
            <div className="bg-white p-5 rounded-[10px] shadow flex items-center justify-between border-2 border-[#B9B9B9]">
              <div className="flex items-center gap-4 h-[118px]">
                <div className="flex items-center justify-center">
                  <LuUser size={65} />
                </div>
                <div>
                  <div className="text-[33px] font-semibold">
                    {loading ? <Skeleton width="200px" height="36px" /> : `Hello, ${firstName || "Intern"}!`}
                  </div>
                  <div className="text-[20px]">
                    {loading ? <Skeleton width="150px" height="24px" /> : `${company || "Intern"} Intern`}
                  </div>
                </div>
              </div>
              <div className="w-[20px] h-[20px] rounded-full bg-[#3BC651]" />
            </div>

            {/* Attendance Summary */}
            <div className="bg-white p-6 rounded-[10px] shadow border-2 border-[#B9B9B9]">
              <div className="text-[30px] font-semibold text-[#3F3F46] mb-4">Daily Attendance Summary</div>
              <div className="grid grid-cols-3 gap-4">
                {/* Present */}
                <div className="bg-[#F9FAFD] p-4 rounded-[10px] border-3 border-[#6BD37C]">
                  <div className="flex justify-between items-center mt-7">
                    <div>
                      <div className="text-[40px] font-bold text-[#6BD37C]">
                        {present !== null ? present : <Skeleton width="40px" />}
                      </div>
                      <p className="text-[20px] text-[#6BD37C]">Interns</p>
                    </div>
                    <img src="/pictures/Green.png" alt="Present Icon" className="w-[85px] mr-5" />
                  </div>
                  <p className="text-start text-[25px] font-semibold mt-5 text-[#6BD37C]">Present</p>
                </div>

                {/* Late */}
                <div className="bg-[#F9FAFD] p-4 rounded-[10px] border-3 border-[#F38A40]">
                  <div className="flex justify-between items-center mt-7">
                    <div>
                      <div className="text-[40px] font-bold text-[#F38A40]">
                        {late !== null ? late : <Skeleton width="40px" />}
                      </div>
                      <p className="text-[20px] text-[#F38A40]">Interns</p>
                    </div>
                    <img src="/pictures/Orange.png" alt="Late Icon" className="w-[85px] mr-5" />
                  </div>
                  <p className="text-start text-[25px] font-semibold mt-5 text-[#F38A40]">Late</p>
                </div>

                {/* Absent */}
                <div className="bg-[#F9FAFD] p-4 rounded-[10px] border-3 border-[#9B3F62]">
                  <div className="flex justify-between items-center mt-7">
                    <div>
                      <div className="text-[40px] font-bold text-[#9B3F62]">
                        {absent !== null ? absent : <Skeleton width="40px" />}
                      </div>
                      <p className="text-[20px] text-[#9B3F62]">Interns</p>
                    </div>
                    <img src="/pictures/Pink.png" alt="Absent Icon" className="w-[85px] mr-5" />
                  </div>
                  <p className="text-start text-[25px] font-semibold mt-5 text-[#9B3F62]">Absent</p>
                </div>
              </div>
            </div>

            {/* Tracking & Journal */}
            <div className="grid grid-cols-2 gap-6">
              <TrackingCard
                title="Attendance Tracking"
                count={pendingAttendance}
                color="#FF4400"
                buttonLabel="Go to Attendance Tracking"
                onClick={handleCardNavigation}
              />
              <TrackingCard
                title="Journal Submission"
                count={unreadJournals}
                color="#FF4400"
                buttonLabel="Go to Journal Submissions"
                onClick={handleCardNavigation}
              />
            </div>
          </div>

          {/* Calendar and Interns Overview */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-[5px] shadow text-center h-[287px] border-2 border-[#B9B9B9] group">
              <p className="text-[30px] text-start font-semibold text-[#3F3F46]">Interns Overview</p>
              <div className="border-2 border-[#0385FF] h-[183px] rounded mt-2 flex items-center justify-center relative overflow-hidden transition-colors duration-300 group-hover:bg-[#0385FF]">
                <div className="flex flex-col items-center justify-center transition-opacity duration-300 group-hover:opacity-0 absolute">
                  <p className="text-[90px] font-bold text-[#2D0F7F]">10</p>
                  <p className="text-[20px] text-[#0059AB] font-medium -mt-6">Current Committed Interns</p>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute">
                  <button className="text-white underline text-[20px] font-medium">Interns List</button>
                </div>
              </div>
            </div>

            <Calendar className="w-[500px] h-[575px] border-2 border-[#B9B9B9] rounded-[5px]" />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

  const TrackingCard = ({ title, count, color, buttonLabel, onClick }) => (
    <div className="bg-white p-6 rounded-[10px] shadow text-center border-2 border-[#B9B9B9]">
      <div>
        <p className="text-[30px] font-semibold mb-4 text-[#3F3F46]">{title}</p>
        <h1 className="flex justify-center font-bold text-[90px]" style={{ color }}>
          {count !== null ? count : <Skeleton width="60px" />}
        </h1>
        <p className={`text-[20px]`} style={{ color }}>
          {title.includes("Attendance") ? "Pending Attendance" : "Unread Journal Submissions"}
        </p>
      </div>
      <button
        className="bg-[#0385FF] text-white mt-4 py-4 px-6 text-[20px] rounded-[10px] transition"
        onClick={() => onClick(buttonLabel)}
      >
        {buttonLabel}
      </button>
    </div>
  );


export default CompanyDashboard;
