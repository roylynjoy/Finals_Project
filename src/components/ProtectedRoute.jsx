import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const [status, setStatus] = useState("checking"); // 'checking' | 'authorized' | 'unauthorized'
  const navigate = useNavigate();
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setStatus("unauthorized");
        return;
      }

      try {
        const res = await fetch(`${baseURL}/user?email=${user.email}`);
        if (!res.ok) throw new Error("Failed to fetch user");

        const data = await res.json();

        if (data?.role && allowedRoles.includes(data.role)) {
          setStatus("authorized");
        } else {
          setStatus("unauthorized");
        }
      } catch (err) {
        console.error("Role check error:", err);
        setStatus("unauthorized");
      }
    });

    return () => unsubscribe();
  }, [allowedRoles]);

  useEffect(() => {
    if (status === "unauthorized") {
      navigate(-1);
    }
  }, [status, navigate]);

  if (status === "checking") {
    return (
      <div className="flex items-center justify-center h-screen bg-[#FAFAFF]">
        <div className="border-4 border-blue-500 border-t-transparent rounded-full w-12 h-12 animate-spin"></div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
