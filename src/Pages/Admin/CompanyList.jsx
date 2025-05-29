import React, { useState, useEffect } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import { FiTrash2 } from "react-icons/fi";
import { LuPenLine } from "react-icons/lu";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import axios from "axios";

function CompanyList() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [companies, setCompanies] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 5;
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const totalPages = Math.ceil(companies.length / pageSize);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const res = await axios.get(`${baseURL}/companies`);
      setCompanies(res.data);
    } catch (err) {
      console.error("Failed to load companies:", err);
    }
  };

  const handleAddCompany = async () => {
    if (companyName.trim()) {
      try {
        const res = await axios.post(`${baseURL}/companies`, {
          name: companyName.trim(),
        });
        setCompanies([...companies, res.data]);
        setCompanyName("");
      } catch (err) {
        console.error("Failed to add company:", err);
      }
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${baseURL}/companies/${selectedCompany._id}`);
      setCompanies(companies.filter((c) => c._id !== selectedCompany._id));
      setDeleteModalOpen(false);
    } catch (err) {
      console.error("Failed to delete company:", err);
    }
  };

  const handleEdit = async () => {
    try {
      const res = await axios.patch(`${baseURL}/companies/${selectedCompany._id}`, {
        name: editedName,
      });
      setCompanies(
        companies.map((c) =>
          c._id === selectedCompany._id ? { ...c, name: res.data.name } : c
        )
      );
      setEditModalOpen(false);
    } catch (err) {
      console.error("Failed to update company:", err);
    }
  };

  const paginatedCompanies = companies.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="flex flex-col min-h-screen">
      <AdminSidebar isExpanded={isSidebarExpanded} setIsExpanded={setIsSidebarExpanded} />
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${
          isSidebarExpanded ? "ml-[400px]" : "ml-[106px]"
        } bg-white`}
      >
        <AdminHeader isExpanded={isSidebarExpanded} />

        <div className="flex items-center justify-center gap-10 px-8 h-screen">
          {/* Add Company Form */}
          <div className="bg-[#F9FAFB] w-[687px] h-fit border rounded-md p-6 shadow h-[518px]">
            <h2 className="text-[35px] text-center font-bold mb-4">Add Company</h2>
            <label className="block text-[23px] mb-1">Enter Company Name :</label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="border border-[#A0A0A0] rounded w-full h-[61px] px-3 py-2 mb-4"
            />
            <button
              onClick={handleAddCompany}
              className="bg-[#1E3A8A] text-white px-7 py-2 rounded text-[23px]"
            >
              Add
            </button>
          </div>

          {/* Company Table */}
          <div className="flex-1">
            <table className="w-full h-[518px] border border-collapse">
              <thead>
                <tr className="bg-[#1F3463] text-white text-[25px]">
                  <th className="p-6">
                    <div className="flex justify-between w-full">
                      <span className="w-[80px] text-center">#</span>
                      <span className="w-[300px] text-center">Company Name</span>
                      <span className="w-[160px] text-center"></span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {companies.length === 0 ? (
                  [...Array(pageSize)].map((_, idx) => (
                    <tr key={idx} style={{ height: "61px" }}>
                      <td style={{ padding: 0 }}>
                        <div
                          style={{
                            height: "61px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "25px",
                            color: "#9CA3AF",
                          }}
                        >
                          {idx === 2 ? "No Companies Found." : null}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  [...Array(pageSize)].map((_, idx) => {
                    const company = paginatedCompanies[idx];
                    return (
                      <tr
                        key={company?._id || `empty-${idx}`}
                        className="border-b"
                        style={{ height: "61px", maxHeight: "61px", padding: 0 }}
                      >
                        <td style={{ padding: 0 }}>
                          {company ? (
                            <div
                              className="flex items-center justify-between w-full px-6"
                              style={{
                                height: "61px",
                                fontSize: "25px",
                                lineHeight: "2",
                              }}
                            >
                              <div className="w-[80px] text-center truncate">
                                {(currentPage - 1) * pageSize + idx + 1}
                              </div>
                              <div className="w-[300px] text-center truncate">{company.name}</div>
                              <div className="w-[160px] flex justify-center gap-6 text-[#0059AB]">
                                <LuPenLine
                                  size={30}
                                  className="cursor-pointer"
                                  onClick={() => {
                                    setSelectedCompany(company);
                                    setEditedName(company.name);
                                    setEditModalOpen(true);
                                  }}
                                />
                                <FiTrash2
                                  size={30}
                                  className="cursor-pointer text-red-500"
                                  onClick={() => {
                                    setSelectedCompany(company);
                                    setDeleteModalOpen(true);
                                  }}
                                />
                              </div>
                            </div>
                          ) : (
                            <div style={{ height: "61px" }}></div>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>

            {/* Pagination */}
            {companies.length > pageSize && (
              <div className="mt-6 flex justify-center gap-6 text-[20px]">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                  className="p-2 border rounded disabled:opacity-40"
                >
                  <FaChevronLeft />
                </button>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => p + 1)}
                  className="p-2 border rounded disabled:opacity-40"
                >
                  <FaChevronRight />
                </button>
              </div>
            )}
          </div>

          {/* Delete Modal */}
          {deleteModalOpen && (
            <div className="fixed inset-0 backdrop-blur-sm bg-black/20 flex justify-center items-center z-50">
              <div className="bg-white p-10 rounded-[10px] shadow w-[550px]">
                <p className="mb-6 text-center text-[25px] text-[#3F3F46]">
                  Are you sure to <span className="font-bold">DELETE</span> this company?
                </p>
                <div className="flex justify-center text-[20px] gap-4">
                  <button
                    onClick={handleDelete}
                    className="px-4 py-2 bg-[#64AD70] text-white rounded w-[140px]"
                  >
                    YES
                  </button>
                  <button
                    onClick={() => setDeleteModalOpen(false)}
                    className="px-4 py-2 bg-[#D84040] text-white rounded w-[140px]"
                  >
                    NO
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Edit Modal */}
          {editModalOpen && (
            <div className="fixed inset-0 backdrop-blur-sm bg-black/20 flex justify-center items-center z-50">
              <div className="bg-white p-15 rounded shadow w-[687px] ">
                <p className="text-[35px] font-bold mb-4 text-center">Edit Company</p>
                <p className="text-[23px] font-medium mb-4">Rename Company :</p>
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  className="border-3 border-[#A0A0A0] p-2 w-full mb-4 rounded bg-white h-[61px] text-[23px]"
                />
                <div className="flex justify-center gap-4 font-semibold">
                  <button
                    onClick={() => setEditModalOpen(false)}
                    className="px-4 py-2 border border-[#D3CECE] bg-[#F5F5F5] rounded w-1/2 text-[23px]"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleEdit}
                    className="px-4 py-2 bg-[#1E3A8A] text-white rounded w-1/2 text-[23px]"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CompanyList;
