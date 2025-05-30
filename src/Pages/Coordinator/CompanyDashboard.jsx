import React, { useState, useEffect } from "react";
import CompanySidebar from "../PageComponents/CompanySidebar";
import CompanyHeader from "../PageComponents/CompanyHeader";
import Footer from "../PageComponents/footer";
import Calendar from "../PageComponents/Calendar";
import { LuUser } from "react-icons/lu";
import { IoMdClose } from "react-icons/io";
import { MdArrowBackIos } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";
import CompanyDashboardStats from "../../components/CompanyDashboardStats";
import Skeleton from "../../components/Skeleton";
import { useNavigate } from "react-router-dom";
import userInfo from "../../services/userInfo";

function CompanyDashboard() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [present, setPresent] = useState(null);
  const [late, setLate] = useState(null);
  const [absent, setAbsent] = useState(null);
  const [pendingAttendance, setPendingAttendance] = useState(null);
  const [unreadJournals, setUnreadJournals] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [interns, setInterns] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const internsPerPage = 5;

  const navigate = useNavigate();
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const { firstName, lastName, company, loading } = userInfo(baseURL);

  const handleCardNavigation = (buttonLabel) => {
    if (buttonLabel === "Go to Attendance Tracking") navigate("/CompanyAttendance");
    else if (buttonLabel === "Go to Journal Submissions") navigate("/CompanyJournal");
  };

  useEffect(() => {
    if (showModal || company) {
      fetch(`${baseURL}/users`)
        .then(res => res.json())
        .then(data => {
          const filtered = data.filter(user => user.role === "Student" && user.company === company);
          setInterns(filtered);
          console.log("Fetched interns:", filtered);
        })
        .catch(err => console.error("Error fetching interns:", err));
    }
  }, [showModal, company]);

  const totalPages = Math.ceil(interns.length / internsPerPage);
  const paginatedInterns = interns.slice(
    (currentPage - 1) * internsPerPage,
    currentPage * internsPerPage
  );

  const absentInterns = present !== null ? interns.length - present : null;

  return (
    <div className="flex flex-col min-h-screen">
      <CompanySidebar isExpanded={isSidebarExpanded} setIsExpanded={setIsSidebarExpanded} />
      <div className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${isSidebarExpanded ? "ml-[400px]" : "ml-[106px]"} bg-white`}>
        <CompanyHeader isExpanded={isSidebarExpanded} firstName={firstName} />

        <CompanyDashboardStats
          onDataReady={({ presentInterns, lateInterns, pendingAttendance, unreadJournals }) => {
            setPresent(presentInterns);
            setLate(lateInterns);
            setPendingAttendance(pendingAttendance);
            setUnreadJournals(unreadJournals);
          }}
        />

        <div className="mt-25 px-8 grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-6">
            {/* Company Info */}
            <div className="bg-white p-5 rounded-[10px] shadow flex items-center justify-between border-2 border-[#B9B9B9]">
              <div className="flex items-center gap-4 h-[118px]">
                <LuUser size={65} />
                <div>
                  <div className="text-[33px] font-semibold mt-1">
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
              <div className="text-[25px] font-semibold text-[#3F3F46] mb-4">Daily Attendance Summary</div>
              <div className="grid grid-cols-3 gap-4">
                <SummaryCard
                  label="Present"
                  interns={present}
                  color="green"
                  icon="/pictures/Green.png"
                  borderColor="border-green-500"
                />
                <SummaryCard
                  label="Late"
                  interns={late}
                  color="yellow"
                  icon="/pictures/Orange.png"
                  borderColor="border-yellow-400"
                />
                <SummaryCard
                  label="Absent"
                  interns={absentInterns}
                  color="red"
                  icon="/pictures/Pink.png"
                  borderColor="border-red-400"
                />

              </div>
            </div>

            {/* Tracking & Journal */}
            <div className="grid grid-cols-2 gap-6">
              <TrackingCard title="Attendance Tracking" count={pendingAttendance} color="#FF4400" buttonLabel="Go to Attendance Tracking" onClick={handleCardNavigation} />
              <TrackingCard title="Journal Submission" count={unreadJournals} color="#FF4400" buttonLabel="Go to Journal Submissions" onClick={handleCardNavigation} />
            </div>
          </div>

          {/* Right Panel */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-[10px] shadow text-center h-[287px] border-2 border-[#B9B9B9] group">
              <p className="text-[30px] text-start font-semibold text-[#3F3F46]">Interns Overview</p>
              <div
                className="border-2 border-[#0385FF] h-[183px] rounded-[10px] mt-2 flex items-center justify-center relative overflow-hidden cursor-pointer group hover:bg-white transition-colors duration-300"
                onClick={() => {
                  setShowModal(true);
                  setCurrentPage(1);
                }}
              >
                <div className="flex flex-col items-center justify-center transition-opacity duration-300 group-hover:opacity-0 absolute cursor-pointer">
                  <div className="text-[90px] font-bold text-[#1F3463]">
                    {loading ? <Skeleton width="150px" height="90px" className="mt-10" /> : `${interns.length}`}
                  </div>
                  <p className="text-[20px] text-[#0059AB] font-medium mb-5">Current Committed Interns</p>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute">
                  <button className="text-[#0059AB] text-[20px] font-medium cursor-pointer">View Interns List</button>
                </div>
              </div>
            </div>

            <Calendar className="w-[500px] h-[520px] border-2 border-[#B9B9B9] rounded-[10px]" />
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
            <div className="bg-white w-[600px] p-6 rounded-xl relative">
              <button onClick={() => setShowModal(false)} className="text-black text-[25px] mb-4 cursor-pointer">
                <IoMdClose />
              </button>
              <div className="bg-[#1F3463] text-white text-[40px] font-semibold text-center py-3 rounded-[10px] mb-4">
                {company} Interns
              </div>
              <ul className="text-[25px]">
                {paginatedInterns.map((user, index) => (
                  <li key={user._id} className="flex items-center gap-4">
                    <div className="w-[55px] h-[55px] bg-[#1F3463] text-white font-bold flex items-center justify-center rounded">
                      {`${user.firstName[0] ?? ""}${user.lastName[0] ?? ""}`.toUpperCase()}
                    </div>
                    <div className="flex-1 pl-[25%] border-b-1 border-t-1 border-black/15 py-5">
                      <span className="font-semibold">
                        {user.firstName} {user.lastName}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Pagination */}
            {interns.length >= internsPerPage && (
            <div className="mt-6 flex justify-center space-x-4 text-[25px]">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="text-[#1F3463] w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full disabled:opacity-50 cursor-pointer hover:bg-gray-300"
              >
                <MdArrowBackIos className="relative left-[5px]" />
              </button>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="text-[#1F3463] w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full disabled:opacity-50 cursor-pointer hover:bg-gray-300"
              >
                <MdArrowForwardIos className="relative left-[2px]" />
              </button>
            </div>
            )}

            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

const SummaryCard = ({ label, interns, color, icon, borderColor }) => {
  const colorMap = {
    green: "text-[#6BD37C]",
    yellow: "text-[#F38A40]",
    red: "text-[#9B3F62]",
  };

  return (
    <div className={`bg-[#F9FAFD] p-4 rounded-[10px] border-3 ${borderColor}`}>
      <div className="flex justify-between items-center mt-7">
        <div>
          <div className="text-[40px] font-bold text-[#3F3F46]">
            {interns !== null ? interns : <Skeleton width="40px" />}
          </div>
          <p className={`text-[20px] font-medium ${colorMap[color]}`}>Interns</p>
        </div>
        <img src={icon} alt={`${label} Icon`} className="w-[85px] mr-5" />
      </div>
      <p className={`text-start text-[25px] font-semibold mt-5 ${colorMap[color]}`}>
        {label}
      </p>
    </div>
  );
};


const TrackingCard = ({ title, count, color, buttonLabel, onClick }) => (
  <div className="bg-white p-6 rounded-[10px] shadow text-center border-2 border-[#B9B9B9]">
    <div>
      <p className="text-[25px] font-semibold text-[#3F3F46]">{title}</p>
      <h1 className="flex justify-center font-bold text-[80px]" style={{ color }}>
        {count !== null ? count : <Skeleton width="70px" height="110px" />}
      </h1>
      <p className={`text-[20px]`} style={{ color }}>
        {title.includes("Attendance") ? "Pending Attendance" : "Unread Journal Submissions"}
      </p>
    </div>
    <button className="bg-[#0385FF] text-white mt-4 py-2 px-6 text-[20px] rounded-[10px] cursor-pointer hover:bg-[#0999FF]" onClick={() => onClick(buttonLabel)}>
      {buttonLabel}
    </button>
  </div>
);

export default CompanyDashboard;