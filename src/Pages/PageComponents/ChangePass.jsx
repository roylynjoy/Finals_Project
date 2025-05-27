import React, { useState } from "react";
import { auth } from "../../firebase/firebase";
import {
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
  signOut,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import ForgotPassword from "./ForgotPassword"; // ✅ import the modal component

function ChangePass({ isOpen, closeModal }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false); // ✅ state to control modal
  const navigate = useNavigate();

  const handleSave = async () => {
    setError("");
    setSuccess("");

    const user = auth.currentUser;
    if (!user || !user.email) {
      setError("User is not authenticated.");
      return;
    }

    setLoading(true);
    const credential = EmailAuthProvider.credential(user.email, currentPassword);

    try {
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);

      setSuccess("Password updated successfully. Logging out...");
      setTimeout(async () => {
        await signOut(auth);
        navigate("/SignIn");
      }, 2000);
    } catch (err) {
      console.error("Password update error:", err);
      setError(
        err.code === "auth/wrong-password"
          ? "Current password is incorrect."
          : "Failed to update password. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50">
        <div className="absolute inset-0 bg-opacity-60 backdrop-blur-sm"></div>

        <div className="w-[667px] bg-white rounded-lg shadow-lg relative z-10">
          <div className="p-6 border border-[#BABABA] rounded-[8px]">
            <div className="text-[22px] font-semibold text-center border-5 border-[#E8E9EA] rounded-[10px] py-1">
              Change Password
            </div>

            <div className="border border-[#C4C4C4] mt-3 rounded-[10px] p-4">
              <p className="text-[43px] font-semibold text-[#3F3F46]">Password</p>
              <p className="text-gray-500 text-[21px]">
                Change your password here. After saving, you’ll be logged out.
              </p>

              <div className="space-y-4 mt-4">
                {/* Current Password */}
                <div>
                  <label
                    htmlFor="current-password"
                    className="text-[20px] font-semibold text-[#3F3F46] block mb-1"
                  >
                    Current Password
                  </label>
                  <input
                    type="password"
                    id="current-password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full border border-[#C4C4C4] bg-[#F9FAFD] rounded-[8px] p-5"
                  />
                </div>

                {/* New Password */}
                <div>
                  <label
                    htmlFor="new-password"
                    className="text-[20px] font-semibold text-[#3F3F46] block mb-1"
                  >
                    New Password
                  </label>
                  <input
                    type="password"
                    id="new-password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full border border-[#C4C4C4] bg-[#F9FAFD] rounded-[8px] p-5"
                  />
                </div>
              </div>

              {/* Feedback */}
              {error && <p className="text-red-600 mt-3">{error}</p>}
              {success && <p className="text-green-600 mt-3">{success}</p>}

              {/* Buttons */}
              <div className="flex mt-6 mb-2 gap-2 font-semibold">
                <button
                  className="px-4 py-2 text-gray-700 border border-[#C4C4C4] rounded-[8px] bg-[#F5F5F5] w-1/2 text-[23px]"
                  onClick={closeModal}
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-[#1E3A8A] text-white rounded-[8px] w-1/2 text-[23px] disabled:opacity-50"
                  onClick={handleSave}
                  disabled={loading || !currentPassword || !newPassword}
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChangePass;
