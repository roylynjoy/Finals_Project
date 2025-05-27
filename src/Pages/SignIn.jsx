import React, { useState } from "react";
import { FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase/firebase";
import ForgotPassword from "../Pages/PageComponents/ForgotPassword";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const navigate = useNavigate();
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (!user || !user.email) throw new Error("Invalid user");

      const res = await fetch(`${baseURL}/users/checkUserExists`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email }),
      });

      const data = await res.json();

      if (data.exists && data.user) {
        const role = data.user.role;
        if (role === "Student") navigate("/StudentDashboard");
        else if (role === "Coordinator") navigate("/CompanyDashboard");
        else if (role === "Admin") navigate("/AdminDashboard");
        else alert("Unknown role.");
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

      if (!user || !user.email) throw new Error("Invalid Google user");

      const res = await fetch(`${baseURL}/users/checkUserExists`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email }),
      });

      const data = await res.json();

      if (data.exists && data.user) {
        const role = data.user.role;
        if (role === "Student") navigate("/StudentDashboard");
        else if (role === "Coordinator") navigate("/CompanyDashboard");
        else if (role === "Admin") navigate("/AdminDashboard");
        else alert("Unknown role.");
      } else {
        await user.delete();
        await signOut(auth);
        alert("This email is not registered in our system.");
      }
    } catch (error) {
      console.error("Google Sign-in error:", error);
      alert(error.message);
    }
  };

  const handlePasswordReset = async () => {
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      alert("Password reset email sent!");
      setIsForgotModalOpen(false);
      setResetEmail("");
    } catch (error) {
      alert(error.message);
      setResetEmail("");
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 flex flex-col justify-center items-center bg-white p-12 relative">
        <div className="absolute top-6 left-6">
          <FaArrowLeft
            className="text-2xl cursor-pointer"
            onClick={() => navigate(-1)}
          />
        </div>
        <div className="absolute top-6 right-6">
          <img src="/pictures/logo.png" alt="Logo" className="w-14 h-14" />
        </div>
        <div className="w-full max-w-md space-y-5">
          <h1 className="text-[50px] font-bold text-center mb-20">Log In</h1>
          <input
            type="email"
            placeholder="Email"
            className="border border-[#D3CECE] text-[20px] rounded p-3 w-full mb-2"
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
              {showPassword ? (
                <FaEye size={25} />
              ) : (
                <FaEyeSlash size={25} className="text-[#D3CECE]" />
              )}
            </span>
          </div>
          <div
            className="text-[#005CFA] text-[18px] cursor-pointer"
            onClick={() => setIsForgotModalOpen(true)}
          >
            Forgot your password?
          </div>

          <ForgotPassword
            isOpen={isForgotModalOpen}
            onClose={() => setIsForgotModalOpen(false)}
            onSubmit={handlePasswordReset}
            email={resetEmail}
            setEmail={setResetEmail}
          />

          <button
            onClick={handleLogin}
            className="w-full bg-[#1E3A8A] text-white py-3 rounded text-[22.5px] font-bold"
          >
            Log In
          </button>

          <div className="flex items-center">
            <div className="flex-grow h-px bg-[#9B9494]" />
            <span className="mx-4 -mt-2 text-[#5F5454] text-[22px]">or</span>
            <div className="flex-grow h-px bg-[#9B9494]" />
          </div>

          <button
            onClick={handleGoogleSignIn}
            className="flex items-center justify-center border border-[#D3CECE] py-3 w-full rounded space-x-2"
          >
            <FcGoogle className="h-[40px] w-[40px]" />
            <span className="text-[22.5px] text-[#5F5454]">
              Sign in with Google
            </span>
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
