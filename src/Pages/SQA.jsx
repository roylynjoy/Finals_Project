import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './header';
import Footer from './footer';
import { FaRegCopy, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

function SQA() {
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
    const navigate = useNavigate();

    const arrowBack = () => {
      navigate(-1)
    }
    const topics = [
            "Understand the quality assurance context.",
            "Understand SQA projects.",
            "Understand SQA management organization.",
            "Understand TEST CASES In Manual Testing.",
            "The Software Quality Challenge.",
            "Software Quality Factors.",
            "Components of SQA System."
    ];
  return (
    <div className="flex flex-col">
    <Sidebar isExpanded={isSidebarExpanded} setIsExpanded={setIsSidebarExpanded} />
    <div
      className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${
        isSidebarExpanded ? 'ml-[400px]' : 'ml-[106px]'
      } bg-[#FAFAFF] min-h-screen`}
    >
      <Header />
      <div className="mt-10 ml-10">
        <FaArrowLeft className="text-2xl cursor-pointer" onClick={arrowBack}/>
      </div>

      <div className="py-10 px-20">
        <h1 className="text-[70px] font-bold text-[#1C1C4D] mb-2 text-center">System Quality Assurance</h1>
        <p className="text-gray-600 mb-10 text-[25px] text-center">
            Navigate your internship journey with essential resources to strengthen your system quality assurance skills
        </p>
        <div className="space-y-3">
          {topics.map((topic, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-white p-4 rounded-md shadow-sm hover:shadow-md transition"
            >
              <span className="text-[#1F3463] text-[30px] py-3 px-5">{topic}</span>
              <FaRegCopy className="w-[48px] h-[48px] text-gray-400 hover:text-black cursor-pointer mx-10" />
            </div>
          ))}
        </div>
      </div>
    </div>
    <Footer />
  </div>
);
}

export default SQA