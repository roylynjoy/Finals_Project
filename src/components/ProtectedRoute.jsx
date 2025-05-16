import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase"; // ✅ import from firebase.js

const ProtectedRoute = ({ allowedRoles, children }) => {
  const [status, setStatus] = useState("checking"); // start with 'checking'
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user?.email) {
        try {
          const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users?email=${user.email}`);
          const data = await res.json();

          if (data?.role && allowedRoles.includes(data.role)) {
            setStatus("authorized");
          } else {
            setStatus("unauthorized");
            setTimeout(() => navigate(-1), 3000);
          }
        } catch (err) {
          console.error("Role check error:", err);
          setStatus("unauthorized");
          setTimeout(() => navigate(-1), 3000);
        }
      } else {
        setStatus("unauthorized");
        setTimeout(() => navigate(-1), 3000);
      }
    });

    return () => unsubscribe();
  }, [allowedRoles, navigate]);

  if (status === "checking") {
    return (
      <div className="flex items-center justify-center h-screen bg-[#FAFAFF]">
        <div className="border-4 border-blue-500 border-t-transparent rounded-full w-12 h-12 animate-spin"></div>
      </div>
    );
  }

  if (status === "unauthorized") {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-[#FAFAFF] text-center px-8">
        <div className="bg-white border border-[#D3CECE] shadow-md p-10 rounded-xl max-w-md">
          <h1 className="text-[30px] font-bold text-[#E70000] mb-4">Access Denied</h1>
          <p className="text-[20px] text-[#3F3F46]">
            You are not authorized or not logged in to access this page.
          </p>
          <p className="text-[18px] text-[#5F5454] mt-2">
            Returning to the previous page...
          </p>
        </div>
      </div>
    );
  }

  return status === "authorized" ? children : null;
};

export default ProtectedRoute;
