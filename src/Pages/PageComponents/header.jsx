import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getAuth } from "firebase/auth";
import UserProfileModal from "./UserProfileModal";

function Header({ isExpanded }) {
  const location = useLocation();
  const [firstName, setFirstName] = useState("");
  const [scrolled, setScrolled] = useState(false);

  const pageTitles = {
    "/StudentDashboard": "Student Dashboard",
    "/Attendance": "Attendance Submission",
    "/Resources": "Role-Based Resources",
    "/Journal": "Daily Journal",
    "/ViewJournal": "Daily Journal",
  };

  const title = pageTitles[location.pathname] || "Dashboard";

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user?.email) {
        try {
          const res = await fetch(
            `${import.meta.env.VITE_API_BASE_URL}/users?email=${user.email}`
          );
          const data = await res.json();
          if (data?.firstName) setFirstName(data.firstName);
        } catch (error) {
          console.error("Failed to fetch user info:", error);
        }
      }
    };
    fetchUserData();
  }, []);

  const getInitials = (name) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  return (
    <header
      className={`fixed top-0 z-40 flex justify-between items-center h-[100px] px-10 bg-white transition-shadow duration-300 ${
        scrolled ? "shadow-md" : ""
      }`}
      style={{
        left: isExpanded ? 400 : 100,
        width: `calc(100% - ${isExpanded ? 400 : 100}px)`,
      }}
    >
      <h1 className="text-[28px] font-semibold">{title}</h1>
      <div className="flex items-center gap-5">
        <UserProfileModal name={firstName} initials={getInitials(firstName)} />
      </div>
    </header>
  );
}

export default Header;
