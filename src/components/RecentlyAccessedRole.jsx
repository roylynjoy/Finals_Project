import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Skeleton from "./Skeleton";

const roleMap = {
  "/PM": {
    title: "Project Management",
    image: "/pictures/PM.jpg",
  },
  "/CD": {
    title: "Code Development",
    image: "/pictures/CD.jpg",
  },
  "/UIUX": {
    title: "UI/UX Design",
    image: "/pictures/UIUX.jpg",
  },
  "/SQA": {
    title: "System Quality Assurance",
    image: "/pictures/SQA.jpg",
  },
};

function RecentlyAccessedRole({ loading }) {
  const [recentPath, setRecentPath] = useState("/PM");
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("recentRole");
    if (stored && roleMap[stored]) {
      setRecentPath(stored);
    }
  }, [window.location.pathname]);

  const { title, image } = roleMap[recentPath] || roleMap["/PM"];

  const handleClick = () => {
    navigate(recentPath);
  };

  return (
    <div
      className="relative bg-white p-6 rounded-[10px] shadow border-2 border-[#B9B9B9] h-[305px] cursor-pointer group flex flex-col justify-between overflow-hidden"
      
    >
      {/* Header */}
      <h2 className="text-[27px] font-semibold text-[#3F3F46] px-2 z-10">
        Recently Accessed Role
      </h2>

      {/* Role Display Section */}
      <div className="relative flex-1 w-full rounded-[10px] overflow-hidden flex items-center justify-center " 
        onClick={handleClick}>

        {/* Background Image */}
        <div
          className="absolute inset-0 bg-center bg-cover transition-opacity duration-500 ease-in-out z-0"
          style={{ backgroundImage: `url(${image})` }}
        />

        {/* Dim Overlay (always visible) */}
        <div className="border-2 border-[#B9B9B9] rounded-[10px] absolute inset-0 bg-black/20 z-10 transition-opacity duration-500 ease-in-out" />

        {/* Hover Overlay (only on hover) */}
        <div className="absolute border-2 border-[#B9B9B9] rounded-[10px] inset-0 z-20 opacity-0 group-hover:opacity-100 bg-white/65 backdrop-blur-sm flex items-center justify-center transition-opacity duration-500 ease-in-out">
          <span className="text-[#1F3463] text-[26px] font-bold">View Recent</span>
        </div>

        {/* Title Text (always on top, fades on hover) */}
        <div
          className="z-30 text-[35px] font-black text-[#1F3463] text-center px-4 transition-opacity duration-500 ease-in-out group-hover:opacity-0"
          style={{ WebkitTextStroke: "1px white" }}
        >
          {loading ? <Skeleton width="220px" height="40px" /> : title}
        </div>
      </div>
    </div>
  );
}

export default RecentlyAccessedRole;
