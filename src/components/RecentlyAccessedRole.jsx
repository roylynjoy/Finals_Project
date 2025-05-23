import React, { useEffect, useState } from "react";
import Skeleton from "./Skeleton";

const roleMap = {
  PM: { title: "Project Management", image: "/pictures/PM.jpg" },
  CD: { title: "Code Development", image: "/pictures/CD.jpg" },
  UIUX: { title: "UI/UX Design", image: "/pictures/UIUX.jpg" },
  SQA: { title: "System Quality Assurance", image: "/pictures/SQA.jpg" },
};

function RecentlyAccessedRole({ loading }) {
  const [recentRole, setRecentRole] = useState(null);

  useEffect(() => {
    const last = localStorage.getItem("recentRole");
    if (last && roleMap[last]) {
      setRecentRole(roleMap[last]);
    }
  }, []);

  const title = recentRole?.title || "Project Management";
  const image = recentRole?.image || "/pictures/PM.jpg";

  return (
    <div className="bg-white p-6 rounded-[10px] shadow border-2 border-[#B9B9B9] h-[305px] relative overflow-hidden">
      <h2 className="text-[27px] font-semibold mb-4 bg-white text-[#3F3F46] px-2 rounded relative z-10">
        Recently Accessed Role
      </h2>
      <div className="text-[35px] font-bold text-[#1F3463] content-center px-2 rounded relative z-10 h-[200px] flex items-center justify-center">
        {loading ? <Skeleton width="220px" height="40px" /> : title}
      </div>
      <div
        className="absolute top-[85px] left-0 w-full h-[210px] bg-cover bg-center opacity-50 z-0"
        style={{ backgroundImage: `url(${image})` }}
      />
    </div>
  );
}

export default RecentlyAccessedRole;
