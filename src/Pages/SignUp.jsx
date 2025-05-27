import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";

export default function CreateAccount() {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Step 1 fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Student");
  const [supervisorNumber, setSupervisorNumber] = useState("");

  // Step 2 fields
  const [company, setCompany] = useState("Company A"); // ✅ valid default
  const [arrangement, setArrangement] = useState("On-site"); // ✅ valid default
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  const handleContinue = () => setStep(2);
  const handleBack = () => setStep(1);

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    if (!["On-site", "Remote", "Hybrid"].includes(arrangement)) {
      alert("Please select a valid workplace arrangement.");
      return;
    }

    try {
      // Create Firebase user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Send user info to backend
      const res = await fetch(`${baseURL}/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uid: user.uid,
          firstName,
          lastName,
          email,
          role,
          supervisorNumber,
          company,
          arrangement,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        // ❌ Clean up Firebase user if backend fails
        await user.delete();
        throw new Error(data.message || "Failed to register user in backend.");
      }

      navigate("/SignIn");
    } catch (error) {
      console.error("Signup error:", error.message);
      alert(error.message);
    }
  };

  const login = () => navigate("/SignIn");

  return (
    <div className="flex h-screen font-poppins">
      {/* Left Side */}
      <div className="w-1/2 flex flex-col justify-center items-center bg-white p-12 relative">
        <div className="absolute top-6 left-6 flex items-center space-x-4">
          <FaArrowLeft
            className="text-2xl cursor-pointer"
            onClick={() => (step === 1 ? navigate("/#") : handleBack())}
          />
        </div>
        <div className="absolute top-6 right-6">
          <img src="/pictures/logo.png" alt="Logo" className="w-14 h-14" />
        </div>

        {/* Step 1 */}
        {step === 1 && (
          <div className="w-full max-w-md space-y-4">
            <h1 className="text-[50px] font-bold text-center mb-0">Create Account</h1>
            <p className="text-[20px] text-center font-normal">Step 1 of 2</p>
            <div className="flex space-x-2 mt-20">
              <input type="text" placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} className="border border-[#D3CECE] text-[#5F5454] text-[20px] rounded p-3 w-1/2" />
              <input type="text" placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} className="border border-[#D3CECE] text-[#5F5454] text-[20px] rounded p-3 w-1/2" />
            </div>
            <input type="email" placeholder="LV Email" value={email} onChange={e => setEmail(e.target.value)} className="border border-[#D3CECE] text-[#5F5454] text-[20px] rounded p-3 w-full" />
            <div className="relative">
              <select value={role} onChange={e => setRole(e.target.value)} className="appearance-none border bg-[rgba(217,217,217,0.5)] text-[#5F5454] border-[#D3CECE] text-[20px] rounded p-3 w-full pr-10">
                <option>Student</option>
                <option>Coordinator</option>
              </select>
              <FaChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#B3B3B3] pointer-events-none" />
            </div>
            <input type="text" placeholder="Supervisor Number" value={supervisorNumber} onChange={e => setSupervisorNumber(e.target.value)} className="border border-[#D3CECE] mb-10 text-[#5F5454] text-[20px] rounded p-3 w-full" />
            <button onClick={handleContinue} className="w-full bg-[#240F8C] text-white py-3 rounded text-[18px] font-bold">Continue</button>
            <p className="text-center text-[18px]">Already have an Account? <span className="text-[#005CFA] cursor-pointer font-medium" onClick={login}>Log In</span></p>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div className="w-full max-w-md space-y-4">
            <h1 className="text-[50px] font-bold text-center mb-0">Create Account</h1>
            <p className="text-[20px] text-center font-poppins">Step 2 of 2</p>
            <div className="relative mt-20">
              <select value={company} onChange={e => setCompany(e.target.value)} className="appearance-none border text-[#5F5454] bg-white border-[#D3CECE] text-[20px] rounded p-3 w-full pr-10">
                <option>Company A</option>
                <option>Company B</option>
              </select>
              <FaChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#B3B3B3] pointer-events-none" />
            </div>
            <div className="relative">
              <select value={arrangement} onChange={e => setArrangement(e.target.value)} className="appearance-none border text-[#5F5454] bg-white border-[#D3CECE] text-[20px] rounded p-3 w-full pr-10">
                <option>On-site</option>
                <option>Remote</option>
                <option>Hybrid</option>
              </select>
              <FaChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#B3B3B3] pointer-events-none" />
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="border border-[#D3CECE] text-[#5F5454] text-[20px] rounded p-3 w-full"
              />
              {showPassword ? (
                <FaEye className="absolute right-4 top-4 text-[#5F5454] cursor-pointer" onClick={() => setShowPassword(false)} />
              ) : (
                <FaEyeSlash className="absolute right-4 top-4 text-[#B3B3B3] cursor-pointer" onClick={() => setShowPassword(true)} />
              )}
            </div>

            <div className="relative mb-10">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                className="border border-[#D3CECE] text-[#5F5454] text-[20px] rounded p-3 w-full"
              />
              {showConfirmPassword ? (
                <FaEye className="absolute right-4 top-4 text-[#5F5454] cursor-pointer" onClick={() => setShowConfirmPassword(false)} />
              ) : (
                <FaEyeSlash className="absolute right-4 top-4 text-[#B3B3B3] cursor-pointer" onClick={() => setShowConfirmPassword(true)} />
              )}
            </div>

            <div className="flex space-x-2 mt-4">
              <button onClick={handleBack} className="border border-[#D3CECE] w-1/2 bg-[#F5F5F5] text-black py-3 rounded text-[18px] font-bold">
                Back
              </button>
              <button onClick={handleSignup} className="w-1/2 bg-[#240F8C] text-white py-3 rounded text-[18px] font-bold">
                Sign Up
              </button>
            </div>
            <p className="text-center text-[18px]">
              Already have an Account?{" "}
              <span className="text-[#005CFA] cursor-pointer font-medium" onClick={login}>Log In</span>
            </p>
          </div>
        )}
      </div>

      {/* Right Side */}
      <div className="w-1/2">
        <img src="/pictures/SIGNUP.png" alt="School Gate" className="w-full h-full object-cover" />
      </div>
    </div>
  );
}
