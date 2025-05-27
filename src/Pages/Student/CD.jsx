import React, { useState, useEffect } from 'react';
import Sidebar from '../PageComponents/sidebar';
import Header from '../PageComponents/header';
import Footer from '../PageComponents/footer';
import { FaRegCopy, FaArrowLeft, FaExternalLinkAlt } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

function CD() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const navigate = useNavigate();

  const arrowBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    localStorage.setItem("recentRole", "/CD");
  }, []);


  const topics = [
    {
      title: "What is Code Development?",
      link: "https://youtu.be/yAf-XQ9Fuc4?si=BY01GJP6sBk9cUYu"
    },
    {
      title: "Web Foundations.",
      link: "https://youtube.com/playlist?list=PLMJlRf5sZ0zTmdv8SuDXtCPcN-nXLKwR4&si=0x8UhHZfw44RrcjL"
    },
    {
      title: "Frontend Development.",
      link: "https://youtube.com/playlist?list=PLWKjhJtqVAbmMuZ3saqRIBimAKIMYkt0E&si=8JQ3N5yWRUS-IVSU"
    },
    {
      title: "Backend Development.",
      link: "https://youtube.com/playlist?list=PLbtI3_MArDOkXRLxdMt1NOMtCS-84ibHH&si=1-y7a5gHki0Q6vxj"
    },
    {
      title: "Hosting and Deployment.",
      link: "https://youtu.be/LLhAuUM0iU0?si=ajayjXJ18sgo9kpg"
    },
    {
      title: "Progressive Web Apps.",
      link: "https://youtu.be/sFsRylCQblw?si=vLuUpaZcK503r0HJ"
    },
    {
      title: "Web App Optimizations.",
      link: "https://youtube.com/playlist?list=PLJrzt4ameiaPTLN4LXiv1Y7ONKuaj7Q9O&si=PdjCKqT7lkMkOQ-I"
    }
  ];

  return (
    <div className="flex flex-col">
      <Sidebar isExpanded={isSidebarExpanded} setIsExpanded={setIsSidebarExpanded} />
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${
          isSidebarExpanded ? 'ml-[400px]' : 'ml-[106px]'
        } bg-white min-h-screen`}
      >
        <Header />

        <div className="mt-[110px] ml-10">
          <FaArrowLeft className="text-2xl cursor-pointer" onClick={arrowBack} />
        </div>

        <div className="py-10 px-20">
          <h1 className="text-[70px] font-bold text-[#1C1C4D] mb-2 text-center">Code Development</h1>
          <p className="text-gray-600 mb-10 text-[25px] text-center">
            Navigate your internship journey with essential resources to strengthen your code development skills
          </p>
          <div className="space-y-3">
            {topics.map((topic, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-[#FAFAFF] p-4 rounded-md shadow-sm hover:bg-[#BEFAF5] transition"
              >
                <span className="text-[#1F3463] text-[30px] py-3 px-5">{topic.title}</span>
                <a
                  href={topic.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaExternalLinkAlt size={25} className="text-gray-400 hover:text-black cursor-pointer mx-10" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CD;
