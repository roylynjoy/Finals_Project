import React, { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import { FiTrash2 } from "react-icons/fi";
import { LuPenLine } from "react-icons/lu";

function CompanyList() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [companies, setCompanies] = useState(["STU Company", "VWX Company"]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedCompanyIndex, setSelectedCompanyIndex] = useState(null);
  const [editedName, setEditedName] = useState("");

  const handleAddCompany = () => {
    if (companyName.trim()) {
      setCompanies([...companies, companyName.trim()]);
      setCompanyName("");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <AdminSidebar
        isExpanded={isSidebarExpanded}
        setIsExpanded={setIsSidebarExpanded}
      />

      <div
        className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${
          isSidebarExpanded ? "ml-[400px]" : "ml-[106px]"
        } bg-white`}
      >
        <AdminHeader isExpanded={isSidebarExpanded} />

        {/* Main Content */}
        <div className="flex gap-10 px-8 py-6 mt-[100px]">
          {/* Add Company Form */}
          <div className="bg-[#F9FAFB] w-[687px] border rounded-md p-6 shadow">
            <h2 className="text-[35px] text-center font-bold mb-4">
              Add Company
            </h2>
            <label className="block text-[23px] mb-1">
              Enter Company Name :
            </label>
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
            <table className="w-full border">
              <thead>
                <tr className="bg-[#1F3463] text-white text-[25px]">
                  <th className="p-6">
                    <div className="flex justify-between w-full">
                      <span className="w-[80px] text-center">#</span>
                      <span className="w-[300px] text-center">
                        Company Name
                      </span>
                      <span className="w-[160px] text-center"></span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {companies.map((company, idx) => (
                  <tr key={idx} className="border text-[25px] text-gray-800">
                    <td className="p-6">
                      <div className="flex justify-between items-center w-full">
                        <div className="w-[80px] text-center">{idx + 1}</div>
                        <div className="w-[300px] text-center">{company}</div>
                        <div className="w-[160px] flex justify-center gap-6 text-[#0059AB]">
                          <LuPenLine
                            size={30}
                            className="cursor-pointer"
                            title="Edit"
                            onClick={() => {
                              setSelectedCompanyIndex(idx);
                              setEditedName(company);
                              setEditModalOpen(true);
                            }}
                          />
                          <FiTrash2
                            size={30}
                            className="cursor-pointer text-red-500"
                            title="Delete"
                            onClick={() => {
                              setSelectedCompanyIndex(idx);
                              setDeleteModalOpen(true);
                            }}
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {deleteModalOpen && (
            <div className="fixed inset-0 backdrop-blur-sm border border-[#099E20] bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white border border-[#52525B] p-10 rounded-[10px] shadow w-[550px]">
                <p className="mb-6 text-center text-[36px] text-[#3F3F46]">
                  Are you sure to <span className="font-bold">DELETE</span> this company?
                </p>
                <div className="flex justify-center text-[25px] gap-4">
                  <button
                    onClick={() => {
                      setCompanies(
                        companies.filter((_, i) => i !== selectedCompanyIndex)
                      );
                      setDeleteModalOpen(false);
                    }}
                    className="px-4 py-2 bg-[#64AD70] text-white rounded w-[140px]"
                  >
                    YES
                  </button>
                  <button
                    onClick={() => setDeleteModalOpen(false)}
                    className="px-4 py-2 border border-[#990000] bg-[#D84040] text-white rounded w-[140px]"
                  >
                    NO
                  </button>
                </div>
              </div>
            </div>
          )}

          {editModalOpen && (
            <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white p-15 rounded shadow w-[687px] border-2 border-[#8F8F8F]">
                <p className="text-[35px] font-bold mb-4 text-center">
                  Edit Company
                </p>
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
                    onClick={() => {
                      const updated = [...companies];
                      updated[selectedCompanyIndex] = editedName;
                      setCompanies(updated);
                      setEditModalOpen(false);
                    }}
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
