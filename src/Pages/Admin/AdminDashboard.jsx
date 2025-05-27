import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase/firebase';
import { onAuthStateChanged } from "firebase/auth";
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import { LuUser, LuChevronDown, LuChevronUp } from "react-icons/lu";
import Footer from '../PageComponents/footer';

function AdminDashboard() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [showCoordinators, setShowCoordinators] = useState(false);
  const [selectedCoordinatorGroup, setSelectedCoordinatorGroup] = useState(null);
  const [firstName, setFirstName] = useState("");
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  const coordinatorGroups = {
    'ABC': ['Roylyn Didican', 'Rizalyne Asaldo'],
    'DEF': ['Shaina Karilyn Pagarigan', 'Lorenz Genesis Reyes'],
    'GHI': ['Christian Eliseo Isip', 'Kristel Magpaayo'],
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user?.email) {
        try {
          const res = await fetch(`${baseURL}/user?email=${user.email}`);
          const data = await res.json();

          if (data?.firstName) {
            setFirstName(data.firstName);
          } else {
            console.warn("User data not found or incomplete:", data);
          }
        } catch (error) {
          console.error("Failed to fetch user info:", error);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <AdminSidebar isExpanded={isSidebarExpanded} setIsExpanded={setIsSidebarExpanded} />

      <div
        className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${
          isSidebarExpanded ? 'ml-[400px]' : 'ml-[106px]'
        } bg-white`}
      >
        {/* Header */}
        <AdminHeader isExpanded={isSidebarExpanded}/>

        {/* Welcome Section */}
        <div className="px-8 pt-8 mt-[100px]">
          <div className="bg-[#F9FAFD] p-5 rounded-[10px] shadow flex items-center justify-between border-2 border-[#B9B9B9]">
            <div className="flex items-center gap-4 h-[118px]">
              <div className="flex items-center justify-center"><LuUser size={65} /></div>
              <div>
                <p className="text-[33px] font-semibold">Hello, {firstName}!</p>
                <p className="text-[20px]">Admin</p>
              </div>
            </div>
            <div className="w-[20px] h-[20px] rounded-full bg-[#3BC651]" />
          </div>
        </div>

        {/* Main Content */}
        <div className="p-8 grid grid-cols-3 gap-6">
          {/* Left Column - Summary Stats */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-[10px] shadow border-2 border-[#B9B9B9] text-center bg-[#F9FAFD]">
              <p className="text-[25px] font-semibold text-gray-700">Total Number of Companies</p>
              <div className="text-[140px] font-bold text-[#0059AB] mt-4 bg-white rounded-[8px] border border-[#C2C2C2]">9</div>
            </div>
            <div className="bg-white p-6 rounded-[10px] shadow border-2 border-[#B9B9B9] text-center bg-[#F9FAFD]">
              <p className="text-[25px] font-semibold text-gray-700">Total Number of Company Coordinators</p>
              <div className="text-[140px] font-bold text-[#0059AB] mt-4 bg-white rounded-[8px] border border-[#C2C2C2]">6</div>
            </div>
          </div>

          {/* Middle Column - Company List */}
          <div className="bg-[#F9FAFD] p-4 rounded-[10px] shadow border-2 border-[#B9B9B9] h-full">
            <p className="bg-[#243D73] text-white text-[25px] font-semibold p-4 rounded mb-4">Company List</p>
            <ul className="space-y-2 text-[30px] text-gray-700 pl-4">
              {['ABC', 'DEF', 'GHI', 'JKL', 'MNO', 'PQR', 'STU', 'VWX', 'YZ'].map((name, idx) => (
                <li key={idx}>{idx + 1}. {name} Company</li>
              ))}
            </ul>
          </div>

          {/* Right Column - Company Coordinator Info */}
          <div className="bg-[#F9FAFD] rounded-[10px] shadow border-2 border-[#B9B9B9]">
            <div
              className="flex justify-between bg-[#F4F4F4] items-center cursor-pointer border-b"
              onClick={() => setShowCoordinators(!showCoordinators)}
            >
              <p className="text-[25px] font-semibold text-[#3F3F46] p-6">
                {selectedCoordinatorGroup ? `${selectedCoordinatorGroup} Company Coordinator` : 'Company Coordinator'}
              </p>
              {showCoordinators ? <LuChevronUp size={30} className="mr-6" /> : <LuChevronDown size={30} className="mr-6" />}
            </div>

            {showCoordinators && (
              <ul className="text-[24px] text-[#525252]">
                {Object.keys(coordinatorGroups).map((group, idx) => (
                  <li
                    key={idx}
                    className="border-b-2 px-3 py-4 rounded bg-[#F4F4F4] cursor-pointer"
                    onClick={() => {
                      setSelectedCoordinatorGroup(group);
                      setShowCoordinators(false);
                    }}
                  >
                    {group} Company Coordinator
                  </li>
                ))}
              </ul>
            )}

            {selectedCoordinatorGroup && (
              <div className="p-4 pl-8 text-[22px] space-y-2 bg-white border-t border-gray-300">
                {coordinatorGroups[selectedCoordinatorGroup].map((name, idx) => (
                  <p key={idx}>{idx + 1}. {name}</p>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default AdminDashboard;