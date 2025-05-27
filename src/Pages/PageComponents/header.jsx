import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import UserProfileModal from "./UserProfileModal";
import Skeleton from "../../components/Skeleton";

function Header({ isExpanded }) {
  const location = useLocation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const baseURL = import.meta.env.VITE_API_BASE_URL;

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
  const cachedUser = localStorage.getItem("userInfo");

  if (cachedUser) {
    const user = JSON.parse(cachedUser);
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setEmail(user.email);
    setLoading(false); // ✅ immediately stop loading
  } else {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user?.email) {
        try {
          const res = await fetch(`${baseURL}/user?email=${user.email}`);
          const data = await res.json();
          if (data?.firstName && data?.lastName && data?.email) {
            localStorage.setItem("userInfo", JSON.stringify(data)); // ✅ cache it
            setFirstName(data.firstName);
            setLastName(data.lastName);
            setEmail(data.email);
          } else {
            console.warn("User data not found or incomplete:", data);
          }
        } catch (error) {
          console.error("Failed to fetch user info:", error);
        } finally {
          setLoading(false);
        }
      }
    });

    return () => unsubscribe();
  }
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

    <div className="flex items-center">
      <UserProfileModal
        name={
          loading ? (
            <Skeleton width="100px" height="20px" />
          ) : (
            `${firstName} ${lastName}`
          )
        }
        initials={
          loading ? (
            <Skeleton width="24px" height="24px" />
          ) : (
            getInitials(`${firstName} ${lastName}`)
          )
        }
      />
    </div>

    </header>
  );
}

export default Header;
