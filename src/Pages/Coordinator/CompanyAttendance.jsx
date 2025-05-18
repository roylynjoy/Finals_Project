import React, { useState, useEffect } from 'react';
import CompanySidebar from './CompanySidebar';
import CompanyHeader from './CompanyHeader';

import Footer from '../PageComponents/footer';
import { auth } from '../../firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import axios from 'axios';

function CompanyAttendance() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [allAttendances, setAllAttendances] = useState([]);
  const [filteredAttendances, setFilteredAttendances] = useState([]);
  const [userEmail, setUserEmail] = useState('');
  const baseURL = import.meta.env.VITE_BASE_URL;
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0]; // YYYY-MM-DD
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [modalAction, setModalAction] = useState('');
  const [modalRecordId, setModalRecordId] = useState(null);

  const fetchUserAndAttendance = async (email) => {
    try {
      const userRes = await axios.get(`${baseURL}/users?email=${email}`);
      const { company } = userRes.data;

      const attendanceRes = await axios.get(`${baseURL}/attendance/company?email=${email}`);
      const all = attendanceRes.data || [];

      setAllAttendances(all);
      filterByDate(all, selectedDate);
    } catch (err) {
      console.error('Error fetching company attendance:', err);
    }
  };

  const filterByDate = (data, dateStr) => {
    const formatted = new Date(dateStr).toLocaleDateString();
    const filtered = data.filter(record => record.date === formatted);
    setFilteredAttendances(filtered);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user?.email) {
        setUserEmail(user.email);
        fetchUserAndAttendance(user.email);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (selectedDate && allAttendances.length > 0) {
      filterByDate(allAttendances, selectedDate);
    }
  }, [selectedDate]);

  const confirmAction = (id, action) => {
    setModalRecordId(id);
    setModalAction(action);
    setModalVisible(true);
  };

  const handleModalConfirm = async () => {
    try {
      await axios.put(`${baseURL}/attendance/${modalAction}/${modalRecordId}`);
      setAllAttendances(prev => prev.filter(record => record._id !== modalRecordId));
      setFilteredAttendances(prev => prev.filter(record => record._id !== modalRecordId));
    } catch (err) {
      console.error(`Failed to ${modalAction} record:`, err);
    } finally {
      setModalVisible(false);
      setModalRecordId(null);
      setModalAction('');
    }
  };

  const handleModalCancel = () => {
    setModalVisible(false);
    setModalRecordId(null);
    setModalAction('');
  };

  return (
    <div className="flex flex-col">
      <CompanySidebar isExpanded={isSidebarExpanded} setIsExpanded={setIsSidebarExpanded} />
      <div className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${isSidebarExpanded ? 'ml-[400px]' : 'ml-[106px]'} bg-[#FAFAFF] min-h-screen`}>
        <CompanyHeader />

        <div className="py-12 px-30">
          {/* Date Picker */}
          <div className="mb-6">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="border border-gray-300 rounded-md p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Prompts */}
          {!selectedDate && (
            <p className="text-gray-500 text-xl mt-2">
              Select a date to view daily student attendance.
            </p>
          )}

          {selectedDate && filteredAttendances.length === 0 && (
            <p className="text-gray-500 text-center text-xl mt-50">
              No attendance record for this date.
            </p>
          )}

          {/* Attendance Table */}
          {selectedDate && filteredAttendances.length > 0 && (
            <div className="overflow-x-auto text-[25px]">
              <table className="min-w-full bg-white rounded-lg border">
                <thead className="bg-[#1F3463] text-white text-left">
                  <tr>
                    <th className="py-4 pl-15">Name</th>
                    <th className="py-4 px-6">Time In</th>
                    <th className="py-4 px-6">Time Out</th>
                    <th className="py-4">Total Hours</th>
                    <th className=""></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAttendances.map((record, index) => (
                    <tr key={record._id} onClick={() => setSelectedRow(index)}>
                      <td className="py-10 px-15 font-medium text-[#556689]">{record.firstName} {record.lastName}</td>
                      <td className="py-4 px-6">{record.timeIn || '—'}</td>
                      <td className="py-4 px-6">{record.timeOut || '—'}</td>
                      <td className="py-4 px-6">{record.hours || '—'}</td>
                      <td className="py-7 px-6 pr-15 flex justify-end items-center gap-4">
                        <button
                          onClick={() => confirmAction(record._id, 'approve')}
                          className="bg-[#64AD70] text-white px-4 py-3 rounded-md hover:bg-green-600 transition"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => confirmAction(record._id, 'deny')}
                          className="bg-[#D84040] text-white px-10 py-3 rounded-md hover:bg-red-600 transition"
                        >
                          Deny
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      <Footer />

      {/* Confirmation Modal */}
      {modalVisible && (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-brightness-90 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <p className="text-center mb-7 text-gray-600">
              Are you sure you want to <span className="font-bold">{modalAction}</span> this attendance record?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleModalConfirm}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-10 rounded"
              >
                Yes
              </button>
              <button
                onClick={handleModalCancel}
                className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-10 rounded"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CompanyAttendance;
