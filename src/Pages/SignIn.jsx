import React, { useState } from "react";
import { FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "../firebase/firebase";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Send email to backend to check the role
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users/checkUserExists`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email }),
      });
  
      const data = await res.json();
  
      if (data.exists && data.user) {
        console.log("User role:", data.user.role);
  
        if (data.user.role === "Student") {
          navigate("/StudentDashboard");
        } else if (data.user.role === "Coordinator") {
          navigate("/CompanyDashboard");
        } else if (data.user.role === "Admin") {
          navigate("/AdminDashboard");
        } else {
          alert("Unknown role.");
        }
      } else {
        await signOut(auth);
        alert("This email is not registered in our system.");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
  
      // Send user.email to backend to check if it exists in MongoDB
      const res = await fetch("http://localhost:5000/api/users/checkUserExists", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email }),
      });
      
      const data = await res.json();
      
      // Check if user exists and inspect structure
      if (data.exists && data.user) {

        if (data.user.role === "Student") {
          navigate("/StudentDashboard");
        } else if (data.user.role === "Coordinator") {
          navigate("/CompanyDashboard");
        } else if (data.user.role === "Admin") {
          navigate("/AdminDashboard");
        } else {
          alert("Unknown role.");
        }
      } else {
        await result.user.delete();
        await signOut(auth);
        alert("This email is not registered in our system.");
      }
    } catch (error) {
      console.error("Google Sign-in error:", error);
      alert(error.message);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 flex flex-col justify-center items-center bg-white p-12 relative">
        <div className="absolute top-6 left-6">
          <FaArrowLeft className="text-2xl cursor-pointer" onClick={() => navigate(-1)} />
        </div>
        <div className="absolute top-6 right-6">
          <img src="/pictures/logo.png" alt="Logo" className="w-14 h-14" />
        </div>
        <div className="w-full max-w-md space-y-5">
          <h1 className="text-[50px] font-bold text-center mb-20">Log In</h1>
          <input
            type="email"
            placeholder="Email"
            className="border border-[#D3CECE] text-[20px] rounded p-3 w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="border border-[#D3CECE] text-[20px] rounded p-3 w-full pr-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <button
            onClick={handleLogin}
            className="w-full bg-[#240F8C] text-white py-3 rounded text-[22.5px] font-bold"
          >
            Log In
          </button>
          <div className="flex items-center my-4">
            <div className="flex-grow h-px bg-gray-300" />
            <span className="mx-4 text-[#5F5454]">or</span>
            <div className="flex-grow h-px bg-gray-300" />
          </div>
          <button
            onClick={handleGoogleSignIn}
            className="flex items-center justify-center border border-[#D3CECE] py-3 w-full rounded space-x-2"
          >
            <FcGoogle className="h-[40px] w-[40px]" />
            <span className="text-[22.5px] text-[#5F5454]">Sign in with Google</span>
          </button>
          <p className="text-center text-[18px]">
            Don’t have an Account?{" "}
            <span
              className="text-[#005CFA] cursor-pointer font-medium"
              onClick={() => navigate("/SignUp")}
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>
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
