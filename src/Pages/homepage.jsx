import React from "react";
import { useNavigate } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";



function Homepage() {
  const navigate = useNavigate();

  const signUp = () => {
    navigate('/SignUp')
  }

  const signIn = () => {
    navigate('/SignIn')
  }

  return (
    <div className="relative w-full min-h-screen bg-white">
      <header className="bg-transparent w-full top-0 z-50 p-5 fixed absolute">
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
            <button className="px-7 py-2 bg-[#A4B2BE] text-[#1F3463] rounded-[10px] hover:bg-gray-400 transition" onClick={signUp}>
              Sign Up
            </button>
            <button className="px-9 py-2 bg-[#1E3A8A] text-white rounded-[10px] hover:bg-purple-700 transition" onClick={signIn}>
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

   

    {/* Gate + Text Section */}
    <div className="flex justify-between items-center px-16 py-12 bg-white">
      {/* Left Image */}
      <div className="w-1/2 pr-8  -bottom-13">
        <img src="pictures/LVGate.jpg" alt="LVCC Gate" className="rounded-lg shadow-lg ml-auto mr-auto  w-[650px] h-[588px]" />
      </div>

      {/* Right Text */}
      <div className="w-1/2 pl-8">
        <div className="flex items-center mb-15">
          <img src="pictures/logo.png" alt="LVCC Logo" className="h-[126px] mr-4" />
          <h2 className="text-[35px] font-bold text-[#2D0F7F]">LA VERDAD CHRISTIAN COLLEGE</h2>
        </div>
        <p className="text-[26px] text-gray-800 leading-relaxed">
          Leo sit amet facilisis tristique, nunc leo cursus elit, nec placerat nisl sem vitae nunc.
          Sed id magna nec libero feugiat aliquam. Curabitur et arcu vel turpis convallis facilisis.
          Aenean ac malesuada odio, et faucibus augue. Vivamus vel nulla et purus consequat fringilla.
          Ut aliquam, leo sit amet facilisis tristique, nunc leo cursus elit, nec placerat nisl sem vitae nunc.
          Sed id magna nec libero feugiat aliquam. Curabitur et arcu vel turpis convallis facilisis.
        </p>
      </div>
    </div>

    {/* Purple angled section */}
    <div className="relative w-full h-110 overflow-hidden">
      <div className="absolute inset-0 bg-[#2D0F7F] transform transform skew-y-[10deg] origin-top-left"></div>
    </div>

    {/* */}
    {/* Top Section (No Skew) */}
    <div className="flex justify-center flex-col w-full bg-[#2D0F7F] text-white py-12 px-12">
        <h2 className="text-[40px] font-bold">Get in Touch with Us</h2>
        <p className="text-[25px] max-w-[740px]">
          Have questions or need assistance? We’re here to help! Reach out to us through any of the following channels:
        </p>
      </div>

      {/* Contact & Calendar Section */}
      <div className="flex justify-center px-30 py-30 bg-[#2D0F7F]">
        <div className="flex justify-center">
        <div className="bg-white shadow-md rounded-l-lg p-6 w-1/2">
          <h3 className="text-[30px] font-bold"><FaPhone /> Phone</h3>
          <p className="text-[27px]">(045) 436 1040</p>

          <h3 className="text-[30px] font-bold mt-4">📧 Email</h3>
          <p className="text-lg">info@laverdad.edu.ph</p>
          <p className="text-lg">registrar@laverdad.edu.ph</p>

          <h3 className="text-[30px] font-bold mt-4">📍 Address</h3>
          <p className="text-lg">
            La Verdad Christian College, McArthur Highway, Sampaloc, Apalit, Pampanga
          </p>
        </div>

        {/* Map */}
        <div className="w-1/2">
          <iframe
            className="rounded-r-lg shadow-md h-full"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3854.606472345355!2d120.75580687511305!3d14.959002285570884!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33965634a341dc6f%3A0x17091aa8b0043f89!2sLa%20Verdad%20Christian%20College!5e0!3m2!1sen!2sph!4v1743415006176!5m2!1sen!2sph"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div></div>
        
      {/* Calendar of Events */}
    <div className="-mt-45 max-w-[719px] max-h-[793px]">
        <div className="bg-white shadow-md rounded-lg p-10 ">
          <h3 className="text-[50px] font-bold text-center text-[#1F3463]">Calendar of Events</h3>
          <div className="mt-4 space-y-4">
            {Array(4).fill().map((_, i) => (
              <div key={i} className="flex items-center bg-[#F1F1F1] justify-between p-4 border-1 border-[#494949] rounded-md">
                <div className="flex items-center space-x-4">
                  <div className="h-[67px] w-[66px]">📅</div>
                  <div>
                    <h4 className="text-[26px] font-bold text-[#1F3463]">FEBRUARY 24–28</h4>
                    <p className="text-[20px]">La Verdad Christian College 26th Foundation Week</p>
                  </div>
                </div>
              </div>
            ))}</div>
          </div>
        </div>
      </div>

      <footer className="bg-[#1F3463] text-white py-10">
      <div className=" mx-auto px-6 md:px-12">
        <div className="flex justify-between gap-8 items-center">
          
          {/* Left Section - Project Info */}
          <div>
            <h3 className="text-[50px] font-bold">FieldMate</h3>
            <p className="text-[20px] mt-2 max-w-[478px] leading-relaxed">
              La Verdad Christian College Bachelor of Science in Information System 
              Field Practicum Attendance Tracking System.
            </p>
          </div>

          {/* Middle Section - About Us & Social Media */}
          <div className="">
            <h4 className="font-bold text-[23px]">About Us</h4>
            <p className="text-[23px] mt-1">La Verdad Christian College</p>
            <p className="text-[23px]">Bachelor of Science in Information Systems</p>
            <p className="text-[23px]">Association of ICT Majors</p>

            {/* Social Icons */}
            <h4 className="font-bold text-[23px]">Contact Us</h4>
            <div className="flex justify-start space-x-4 mt-4">
              <a href="#" className="text-white hover:text-gray-300"><FaFacebookF size={38} /></a>
              <a href="#" className="text-white hover:text-gray-300"><FaInstagram size={38} /></a>
              <a href="#" className="text-white hover:text-gray-300"><FaTwitter size={38} /></a>
            </div>
          </div>

          {/* Right Section - School Logo & Motto */}
          <div className="flex justify-start flex-col">
            <div className="flex gap-4 ">
            <img src="pictures/logo.png" alt="La Verdad Logo" className="h-[70px] mt-4" />
            <div className="flex flex-col">
            <p className="text-[40px] font-custom max-w-[300px] ">LA VERDAD 
              </p><span className="text-[23px] font-custom">CHRISTIAN COLLEGE. INC.</span>
            </div>
            </div>
            <span className="font-bold text-[25px]">“Wisdom based on the Truth is Priceless”</span>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-6 border-t border-gray-400 pt-4 text-center text-[23px]">
          © 2025 FieldMate. All rights reserved. | <a href="#" className="underline">Privacy Policy</a>
        </div>
      </div>
    </footer>

    </div>
  );
}

export default Homepage;