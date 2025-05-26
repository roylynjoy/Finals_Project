import React, { useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

function CompanyDashboardStats({ onDataReady }) {
  const [loading, setLoading] = useState(true);
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchData = async () => {
      const user = auth.currentUser;
      if (!user?.email) return;

      try {
        // ✅ Corrected endpoint
        const userRes = await fetch(`${baseURL}/user?email=${user.email}`);
        const userData = await userRes.json();
        const company = userData.company;

        const [attendanceRes, journalRes, usersRes] = await Promise.all([
          fetch(`${baseURL}/attendance`),
          fetch(`${baseURL}/journal`),
          fetch(`${baseURL}/users`)
        ]);

        const [attendances, journals, users] = await Promise.all([
          attendanceRes.json(),
          journalRes.json(),
          usersRes.json(),
        ]);

        const today = new Date().toISOString().split("T")[0];

        const interns = users.filter(u => u.role === "student" && u.company === company);
        const todaysAttendances = attendances.filter(
          a => a.company === company && a.date === today
        );
        const presentInterns = todaysAttendances.length;
        const lateInterns = todaysAttendances.filter(a => {
          const time = new Date(`1970-01-01T${a.timeIn}`);
          return time.getHours() > 8 || (time.getHours() === 8 && time.getMinutes() >= 15);
        }).length;
        const presentNames = todaysAttendances.map(a => `${a.firstName} ${a.lastName}`);
        const absentInterns = interns.filter(i =>
          !presentNames.includes(`${i.firstName} ${i.lastName}`)
        ).length;

        const pendingAttendance = attendances.filter(
          a => a.company === company && !a.approved && !a.denied
        ).length;

        const unreadJournals = journals.filter(
          j => j.company === company && j.removed !== true
        ).length;

        onDataReady({
          presentInterns,
          lateInterns,
          absentInterns,
          pendingAttendance,
          unreadJournals
        });

      } catch (err) {
        console.error("Failed to load company dashboard stats:", err);
      } finally {
        setLoading(false);
      }
    };

    const unsub = onAuthStateChanged(auth, fetchData);
    return () => unsub();
  }, []);

  return loading ? (
    <div className="text-center w-full col-span-3">
      <p className="text-[24px] text-gray-500 animate-pulse">Loading dashboard stats...</p>
    </div>
  ) : null;
}

export default CompanyDashboardStats;
