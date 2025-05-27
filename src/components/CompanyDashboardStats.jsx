import React, { useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

function CompanyDashboardStats({ onDataReady }) {
  const [loading, setLoading] = useState(true);
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  // Helper to normalize dates like "5/21/2025" into "2025-05-21"
  const normalizeToISODate = (dateStr) => {
    if (!dateStr) return "";
    const [month, day, year] = dateStr.split("/");
    if (!month || !day || !year) return "";
    const isoDate = new Date(`${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`);
    return isoDate.toISOString().split("T")[0];
  };

  useEffect(() => {
    const fetchData = async () => {
      const user = auth.currentUser;
      if (!user?.email) return;

      try {
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

        const today = new Date().toISOString().split("T")[0]; // ISO: "2025-05-21"

        const interns = users.filter(
          (u) => u.role === "student" && u.company === company
        );

        const todaysAttendances = attendances.filter(
          (a) =>
            a.company === company &&
            normalizeToISODate(a.date) === today
        );

        const presentInterns = todaysAttendances.length;

        const lateInterns = todaysAttendances.filter((a) => {
          if (!a.timeIn) return false;
          const [time, modifier] = a.timeIn.split(" ");
          let [hours, minutes] = time.split(":").map(Number);
          if (modifier === "PM" && hours !== 12) hours += 12;
          if (modifier === "AM" && hours === 12) hours = 0;
          return hours > 8 || (hours === 8 && minutes >= 15);
        }).length;

        const presentNames = todaysAttendances.map(
          (a) => `${a.firstName} ${a.lastName}`
        );

        const absentInterns = interns.filter(
          (i) => !presentNames.includes(`${i.firstName} ${i.lastName}`)
        ).length;

        const pendingAttendance = attendances.filter(
          (a) => a.company === company && !a.approved && !a.denied
        ).length;

        const unreadJournals = journals.filter(
          (j) => j.company === company && j.removed !== true
        ).length;

        onDataReady({
          presentInterns,
          lateInterns,
          absentInterns,
          pendingAttendance,
          unreadJournals,
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
