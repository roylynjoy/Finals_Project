import { useState, useEffect } from "react";
import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;
const pageSize = 5;

export function useCompanyService() {
  const [companyName, setCompanyName] = useState("");
  const [companies, setCompanies] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // total pages based on current companies
  const totalPages = Math.ceil(companies.length / pageSize);

  useEffect(() => {
    fetchCompanies();
  }, []);

  async function fetchCompanies() {
    try {
      const res = await axios.get(`${baseURL}/companies`);
      setCompanies(res.data);
    } catch (err) {
      console.error("Failed to load companies:", err);
    }
  }

  async function handleAddCompany() {
    if (companyName.trim()) {
      try {
        const res = await axios.post(`${baseURL}/companies`, {
          name: companyName.trim(),
        });
        setCompanies((prev) => [...prev, res.data]);
        setCompanyName("");
      } catch (err) {
        console.error("Failed to add company:", err);
      }
    }
  }

  async function handleDelete() {
    if (!selectedCompany) return;
    try {
      await axios.delete(`${baseURL}/companies/${selectedCompany._id}`);
      setCompanies((prev) => prev.filter((c) => c._id !== selectedCompany._id));
      setDeleteModalOpen(false);
    } catch (err) {
      console.error("Failed to delete company:", err);
    }
  }

  async function handleEdit() {
    if (!selectedCompany) return;
    try {
      const res = await axios.patch(`${baseURL}/companies/${selectedCompany._id}`, {
        name: editedName,
      });
      setCompanies((prev) =>
        prev.map((c) => (c._id === selectedCompany._id ? { ...c, name: res.data.name } : c))
      );
      setEditModalOpen(false);
    } catch (err) {
      console.error("Failed to update company:", err);
    }
  }

  // slice companies for pagination
  const paginatedCompanies = companies.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return {
    companyName,
    setCompanyName,
    companies,
    setCompanies,
    editModalOpen,
    setEditModalOpen,
    deleteModalOpen,
    setDeleteModalOpen,
    selectedCompany,
    setSelectedCompany,
    editedName,
    setEditedName,
    currentPage,
    setCurrentPage,
    totalPages,
    pageSize,
    paginatedCompanies,
    fetchCompanies,
    handleAddCompany,
    handleDelete,
    handleEdit,
  };
}
