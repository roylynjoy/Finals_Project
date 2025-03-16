import React from "react";

function Homepage() {
  return (
    <div className="relative w-full min-h-screen bg-white">
      <header className="bg-transparent w-full top-0 z-50 p-5 absolute">
        <nav className="flex justify-between items-center py-4 px-10">
          <div className="flex items-center space-x-3 ">
            <img src="pictures/logo.png" alt="La Verdad Christian College Logo" className="h-20" />
            <span className="ml-2 text-[30px]  font-custom">
              LA VERDAD <br />
              <span className="text-[30px]">CHRISTIAN COLLEGE, INC.</span>
            </span>
          </div>

          <div className="flex space-x-12 text-[23px]">
            <a href="#" className="relative text-blue-900 font-bold">
              Home
              <span className="absolute left-0 bottom-0 w-full h-1 bg-yellow-400"></span>
            </a>
            <a href="#" className="relative text-blue-900 font-bold">About Us</a>
            <a href="#" className="relative text-blue-900 font-bold">Contact Us</a>
          </div>

          <div className="flex space-x-3 text-[22.5px] font-bold">
            <button className="px-7 py-2 bg-[#A4B2BE] text-[#1F3463] rounded-[10px] hover:bg-gray-400 transition">
              Sign Up
            </button>
            <button className="px-9 py-2 bg-[#1E3A8A] text-white rounded-[10px] hover:bg-purple-700 transition">
              Log In
            </button>
          </div>
        </nav>
      </header>

      <div className="relative flex items-center opacity-15 justify-between px-20 pt-52 pb-10 bg-cover bg-center" style={{ backgroundImage: 'url(pictures/LVBG.jpg)' }}>
        <div className="max-w-2xl text-left">
          <h1 className="text-[110px] font-bold text-black">FieldMate</h1>
          <p className="mt-4 text-[28px] text-gray-800">
            La Verdad Christian College Bachelor of Science in Information System Field Practicum Attendance Tracking System.
          </p>
          <button className="mt-6 px-15 py-3 bg-[#1E3A8A] text-white font-semibold text-[24px] rounded-lg">
            Explore
          </button>
        </div>
        <div className="w-2/5">
          <img src="pictures/LVGate.jpg" alt="College Gate" className="rounded-lg shadow-lg" />
        </div>
      </div>

      <div className="flex justify-around py-6 bg-transparent">
        <div className="text-center">
          <img src="pictures/logo.png" alt="Icon 1" className="h-27 mx-auto" />
          <p className="text-black text-[23px]">La Verdad Christian College</p>
        </div>
        <div className="text-center">
          <img src="pictures/BSIS.png" alt="Icon 2" className="h-27 mx-auto" />
          <p className="text-black text-[23px]">Bachelor of Science in Information Systems</p>
        </div>
        <div className="text-center">
          <img src="pictures/AIM.png" alt="Icon 3" className="h-27 mx-auto" />
          <p className="text-black text-[23px]">Association of ICT Majors</p>
        </div>
      </div>
    </div>
  );
}

export default Homepage;