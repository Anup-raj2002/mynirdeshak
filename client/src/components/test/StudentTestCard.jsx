import React, { useEffect, useState } from "react";
import { CalendarClock } from "lucide-react";

const StudentTestCard = ({ test, onClick }) => {
  const [countdown, setCountdown] = useState("");

  const formatDateIST = (dateString) => {
    return new Date(dateString).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  useEffect(() => {
    if (!test.startDateTime) return;
    const interval = setInterval(() => {
      const now = new Date();
      const start = new Date(test.startDateTime);
      const diff = start - now;
      if (diff <= 0) {
        setCountdown("Exam Started");
        clearInterval(interval);
        return;
      }
      const hours = Math.floor(diff / 1000 / 60 / 60);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setCountdown(
        `${hours > 0 ? hours + 'h ' : ''}${minutes}m ${seconds}s`
      );
    }, 1000);
    return () => clearInterval(interval);
  }, [test.startDateTime]);

  return (
    <div
      className="bg-white rounded-lg shadow border p-4 flex flex-col gap-2 hover:shadow-lg transition cursor-pointer min-w-[320px] max-w-xl mx-auto"
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-blue-700 font-semibold">
          <CalendarClock size={18} />
          <span>{formatDateIST(test.startDateTime)}</span>
        </div>
        <div className="text-xs text-gray-500 font-medium">
          {countdown}
        </div>
      </div>
      <div className="flex items-center gap-2 mt-1">
        <span className="text-base font-bold text-gray-800">{test.stream}</span>
        <span className="ml-2 px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-xs font-semibold">{test.stream}</span>
      </div>
      {test.description && (
        <div className="text-xs text-gray-600 mt-1 line-clamp-2">{test.description}</div>
      )}
    </div>
  );
};

export default StudentTestCard; 