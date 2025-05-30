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
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const totalPages = Math.ceil(companies.length / pageSize);

  useEffect(() => {
    fetchCompanies();
  }, []);

  async function fetchCompanies() {
    try {
      const res = await axios.get(`${baseURL}/companies`);
      setCompanies(res.data);
    } catch (err) {
      setMessage("Failed to load companies.");
      setMessageType("error");
    }
  }

  async function handleAddCompany() {
    const trimmedName = companyName.trim();

    if (!trimmedName) {
      setMessage("Company name cannot be empty.");
      setMessageType("error");
      return;
    }

    try {
      const res = await axios.post(`${baseURL}/companies`, {
        name: trimmedName,
      });
      setCompanies((prev) => [...prev, res.data]);
      setCompanyName("");
      setMessage("Company added successfully!");
      setMessageType("success");
    } catch (err) {
      setMessage("Company Name Exists");
      setMessageType("error");
    }
  }

  async function handleDelete() {
    if (!selectedCompany) return;

    try {
      await axios.delete(`${baseURL}/companies/${selectedCompany._id}`);
      setCompanies((prev) =>
        prev.filter((c) => c._id !== selectedCompany._id)
      );
      setDeleteModalOpen(false);
      setMessage("Company deleted successfully.");
      setMessageType("success");
    } catch (err) {
      setMessage("Failed to delete company.");
      setMessageType("error");
    }
  }

  async function handleEdit() {
    if (!selectedCompany) return;

    try {
      const res = await axios.patch(`${baseURL}/companies/${selectedCompany._id}`, {
        name: editedName,
      });

      setCompanies((prev) =>
        prev.map((c) =>
          c._id === selectedCompany._id ? { ...c, name: res.data.name } : c
        )
      );
      setEditModalOpen(false);
      setMessage("Company updated successfully.");
      setMessageType("success");
    } catch (err) {
      setMessage("Failed to update company.");
      setMessageType("error");
    }
  }

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
    message,
    messageType,
  };
}
