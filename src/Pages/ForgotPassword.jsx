import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";

function ForgotPassword({ isOpen, onClose, email, setEmail }) {
  const [step, setStep] = useState("email");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  if (!isOpen) return null;

  const handleOtpChange = (value, index) => {
    if (/^\d?$/.test(value)) {
      const updatedOtp = [...otp];
      updatedOtp[index] = value;
      setOtp(updatedOtp);

      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleContinue = () => {
    if (step === "email") {
      setStep("otp");
    } else if (step === "otp") {
      const enteredOtp = otp.join("");
      if (enteredOtp.length < 6) {
        alert("Please enter a 6-digit OTP.");
        return;
      }
      setStep("reset");
    } else {
      if (newPassword !== confirmPassword) {
        alert("Passwords do not match.");
        return;
      }
      console.log("New Password:", newPassword);
      onClose();
    }
  };

  const handleBack = () => {
    if (step === "reset") {
      setStep("otp");
    } else if (step === "otp") {
      setStep("email");
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-[647px] relative">
        <button onClick={handleBack} className="absolute top-4 left-4">
          <FaArrowLeft size={23} />
        </button>

        {step === "email" && (
          <>
            <h2 className="text-[50px] font-bold text-center pt-4">Forgot Password</h2>
            <p className="mb-8 -mt-1 text-[21px] text-gray-600 text-center">
              Please enter your email to reset your password.
            </p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full px-3 py-5 border border-[#D3CECE] rounded mb-4 text-[21px]"
            />
          </>
        )}

        {step === "otp" && (
          <>
            <h2 className="text-[50px] font-bold mb-4 text-center pt-4">Verification</h2>
            <p className="mb-2 text-[21px] text-[#959494] text-center">
              Please enter the code sent to your email.
            </p>
            <p className="text-center text-[20px] mb-2">Enter OTP</p>
            <div className="flex justify-center mb-4 font-bold">
              {otp.map((value, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength={1}
                  value={value}
                  onChange={(e) => handleOtpChange(e.target.value, index)}
                  className="w-20 h-20 text-center text-[22px] border border-gray-300 rounded"
                />
              ))}
            </div>
          </>
        )}

        {step === "reset" && (
          <>
            <h2 className="text-[50px] font-bold -mb-2 text-center pt-4">Reset Password</h2>
            <p className="mb-6 text-[21px] text-[#959494] text-center">
              Set the new password for your account.
            </p>
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-3 py-4 border border-[#D3CECE] rounded mb-3 text-[21px] text-[#5F5454]"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-4 border border-[#D3CECE] rounded mb-4 text-[21px] text-[#5F5454]"
            />
          </>
        )}

        <button
          onClick={handleContinue}
          className="bg-[#1E3A8A] text-white text-[22px] font-bold px-4 py-2 rounded w-full"
        >
          {step === "reset" ? "Reset Password" : step === "otp" ? "Verify" : "Continue"}
        </button>
      </div>
    </div>
  );
}

export default ForgotPassword;
