import { useEffect, useState } from "react";

const useAttendanceSummaryStats = (firstName, lastName) => {
  const [summary, setSummary] = useState({
    presentDays: 0,
    lateHours: 0,
    absentDays: 0,
    totalHours: 0,
    remainingDays: 0,
  });

  const baseURL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchStats = async () => {
      if (!firstName || !lastName) return;

      try {
        const response = await fetch(`${baseURL}/attendance`);
        const data = await response.json();

        const userRecords = data.filter(
          (r) =>
            r.firstName === firstName &&
            r.lastName === lastName &&
            r.denied === false
        );

        // Present Days
        const presentDays = userRecords.length;

        // Late Time
        let totalLate = 0;
        userRecords.forEach((r) => {
          if (r.timeIn) {
            const refTime = new Date(`1970-01-01T08:00:00`);
            const timeIn = new Date(`1970-01-01T${to24Hr(r.timeIn)}`);
            const diff = timeIn - refTime;
            if (diff > 0) {
              totalLate += diff / (1000 * 60 * 60);
            }
          }
        });

        // Total Hours
        const totalHours = userRecords.reduce((acc, r) => acc + (parseFloat(r.hours) || 0), 0);

        // Absent Days
        let absentDays = 0;
        const uniqueDates = userRecords.map((r) => new Date(r.date).toDateString());
        const dateSet = new Set(uniqueDates);

        if (userRecords.length > 0) {
          const sorted = userRecords
            .map((r) => new Date(r.date))
            .sort((a, b) => a - b);
          const start = new Date(sorted[0]);
          const end = new Date();

          for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
            if (!dateSet.has(d.toDateString())) {
              absentDays++;
            }
          }
        }

        setSummary({
          presentDays,
          lateHours: totalLate.toFixed(1),
          totalHours: totalHours.toFixed(1),
          remainingDays: Math.floor(totalHours / 8),
          absentDays,
        });
      } catch (err) {
        console.error("Error fetching attendance stats:", err);
      }
    };

    fetchStats();
  }, [firstName, lastName]);

  const to24Hr = (timeStr) => {
    const [time, modifier] = timeStr.split(" ");
    let [hours, minutes] = time.split(":").map(Number);
    if (modifier === "PM" && hours !== 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:00`;
  };

  return summary;
};

export default useAttendanceSummaryStats;
