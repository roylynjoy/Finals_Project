import React, { useState } from 'react';
import AdminSidebar from '../PageComponents/AdminSidebar';
import AdminHeader from '../PageComponents/AdminHeader';
import { LuUser, LuChevronDown, LuChevronUp } from "react-icons/lu";
import Footer from '../PageComponents/footer';
import Skeleton from '../../components/Skeleton';
import useAdminInfo from '../../services/admin/useAdminInfo';
import useDashboardStats from '../../services/admin/useDashboardStats';
import groupCoordinatorsByCompany from '../../services/admin/groupCoordinatorsByCompany';

function AdminDashboard() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [showCoordinators, setShowCoordinators] = useState(false);
  const [selectedCoordinatorGroup, setSelectedCoordinatorGroup] = useState(null);

  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const { firstName, lastName } = useAdminInfo(baseURL);
  const { companies, coordinators, loading } = useDashboardStats(baseURL);

  const groupedCoordinators = groupCoordinatorsByCompany(coordinators);

  return (
    <div className="flex min-h-screen">
      <AdminSidebar isExpanded={isSidebarExpanded} setIsExpanded={setIsSidebarExpanded} />
      <div
        className={`flex flex-col flex-1 transition-all duration-300 ease-in-out ${
          isSidebarExpanded ? 'ml-[400px]' : 'ml-[106px]'
        } bg-white`}
      >
        <AdminHeader isExpanded={isSidebarExpanded} firstName={firstName} />
        <div className="flex-1 flex flex-col">
          <div className="mt-25 px-5">
            <div className="bg-[#F9FAFD] p-5 rounded-[10px] shadow flex items-center justify-between border-2 border-[#B9B9B9]">
              <div className="flex items-center gap-4 h-[118px]">
                <div className="flex items-center justify-center"><LuUser size={65} /></div>
                <div>
                  <div className="text-[33px] font-semibold">
                    {loading ? <Skeleton width="200px" height="36px" /> : `Hello, ${firstName || "Admin"}!`}
                  </div>
                  <p className="text-[20px]">Admin</p>
                </div>
              </div>
              <div className="w-[20px] h-[20px] rounded-full bg-[#3BC651]" />
            </div>
          </div>

          <div className="p-5 grid grid-cols-3 gap-6">
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-[10px] shadow border-2 border-[#B9B9B9] text-center bg-[#F9FAFD]">
                <p className="text-[25px] font-semibold text-gray-700">Total Number of Companies</p>
                <div className="flex justify-center items-center h-[200px] text-[140px] font-bold text-[#0059AB] mt-4 bg-white rounded-[8px] border border-[#C2C2C2]">
                  {loading ? <Skeleton width="120px" height="150px" /> : companies.length}
                </div>
              </div>

              <div className="bg-white p-6 rounded-[10px] shadow border-2 border-[#B9B9B9] text-center bg-[#F9FAFD]">
                <p className="text-[25px] font-semibold text-gray-700">Total Number of Company Coordinators</p>
                <div className="flex justify-center items-center h-[200px] text-[140px] font-bold text-[#0059AB] mt-4 bg-white rounded-[8px] border border-[#C2C2C2]">
                  {loading ? <Skeleton width="120px" height="150px" /> : coordinators.length}
                </div>
              </div>
            </div>

            <div className="bg-[#F9FAFD] p-4 rounded-[10px] shadow border-2 border-[#B9B9B9]">
              <p className="bg-[#243D73] text-white text-[25px] font-semibold p-4 rounded mb-4">Company List</p>
              <ul className="space-y-2 text-[25px] text-gray-700">
                {loading
                  ? <Skeleton width="90%" height="300px" />
                  : companies.map((c, idx) => (
                    <li className="mx-4 pb-2 border-b-2 border-gray-300" key={c._id}>{idx + 1}. {c.name}</li>
                  ))}
              </ul>
            </div>

            <div className="bg-[#F9FAFD] rounded-[10px] shadow border-2 border-[#B9B9B9]">
              <div
                className="flex rounded-tr-lg rounded-tl-lg justify-between bg-[#F4F4F4] items-center cursor-pointer border-b"
                onClick={() => setShowCoordinators(!showCoordinators)}
              >
                <p className="text-[25px] font-semibold text-[#3F3F46] p-6">
                  {selectedCoordinatorGroup ? `${selectedCoordinatorGroup} Company Coordinator` : 'Company Coordinator'}
                </p>
                {showCoordinators ? <LuChevronUp size={30} className="mr-6" /> : <LuChevronDown size={30} className="mr-6" />}
              </div>

              {showCoordinators && (
                <ul className="text-[24px] text-[#525252]">
                  {Object.keys(groupedCoordinators).map((group, idx) => (
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
                  {groupedCoordinators[selectedCoordinatorGroup].map((name, idx) => (
                    <p key={idx}>{idx + 1}. {name}</p>
                  ))}
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

export default AdminDashboard;
