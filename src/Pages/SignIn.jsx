import React, { useState } from "react";
import { FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(true);
  const navigate = useNavigate();

  const signUp = () => {
    navigate('/SignUp')
  }

  const arrowBack = () => {
    navigate(-1)
  }

  return (
    <div className="flex h-screen">
      {/* Left Side */}
      <div className="w-1/2 flex flex-col justify-center items-center bg-white p-12 relative">

        {/* Back arrow */}
        <div className="absolute top-6 left-6">
          <FaArrowLeft className="text-2xl cursor-pointer" onClick={arrowBack}/>
        </div>

        {/* Logo */}
        <div className="absolute top-6 right-6">
          <img src="/pictures/logo.png" alt="Logo" className="w-14 h-14" />
        </div>

        {/* Login Form */}
        <div className="w-full max-w-md space-y-5">
          <h1 className="text-[50px] font-bold text-center mb-20">Log In</h1>

          <input
            type="email"
            placeholder="Email"
            className="border border-[#D3CECE] text-[#5F5454] text-[20px] rounded p-3 w-full"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="border border-[#D3CECE] text-[#5F5454] text-[20px] rounded p-3 w-full pr-10"
            />
            <span
              className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-[#5F5454]"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <p className="text-[#005CFA] text-[18px] cursor-pointer">Forgot your password?</p>

          <button className="w-full bg-[#240F8C] text-white py-3 rounded text-[22.5px] font-bold">
            Log In
          </button>

          <div className="flex items-center my-4">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="mx-4 text-[#5F5454]">or</span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>

          <button className="flex items-center justify-center border border-[#D3CECE] py-3 w-full rounded space-x-2">
            <FcGoogle className="h-[40px] w-[40px]" />
            <span className="text-[22.5px] text-[#5F5454]">Sign in with Google</span>
          </button>

          <p className="text-center text-[18px]">
            Don’t have an Account?{" "}
            <span className="text-[#005CFA] cursor-pointer font-medium" onClick={signUp}>Sign Up</span>
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-1/2">
        <img
          src="/pictures/LOGIN.png"
          alt="Campus Building"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
