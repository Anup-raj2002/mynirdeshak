import React, { useEffect, useState } from "react";
import { CalendarClock, Download } from "lucide-react";
import { useDownloadScoreCard } from '../../queries/useTestsQueries';

function formatDateIST(dateString) {
  return new Date(dateString).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

const StudentTestCard = ({ test, onClick, expectedScore }) => {
  const [countdown, setCountdown] = useState("");
  const [canStart, setCanStart] = useState(false);
  const downloadScoreCard = useDownloadScoreCard();

  useEffect(() => {
    if (!test.startDateTime) return;
    const interval = setInterval(() => {
      const now = new Date();
      const start = new Date(test.startDateTime);
      const end = new Date(start.getTime() + 100 * 60000); // 100 minutes after start
      const fiveMinBefore = new Date(start.getTime() - 5 * 60000);
      // Show countdown until exam start
      if (now < start) {
        const diff = start - now;
        const hours = Math.floor(diff / 1000 / 60 / 60);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setCountdown(
          `${hours > 0 ? hours + 'h ' : ''}${minutes}m ${seconds}s`
        );
      } else if (now >= start && now <= end) {
        setCountdown("Exam Ongoing");
      } else {
        setCountdown("Exam Ended");
      }
      // Show start button from 5 min before start until end
      setCanStart(now >= fiveMinBefore && now <= end);
    }, 1000);
    return () => clearInterval(interval);
  }, [test.startDateTime]);

  // Shorten description to 80 chars
  const shortDescription = test.description && test.description.length > 80
    ? test.description.slice(0, 77) + "..."
    : test.description;

  const handleDownloadScoreCard = async (e) => {
    e.stopPropagation();
    try {
      const response = await downloadScoreCard.mutateAsync(test.id);
      if (response && response.data) {
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `scorecard-${test.id}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }
    } catch (err) {
      // Notification handled in hook
    }
  };

  return (
    <div
      className="bg-white rounded-lg shadow border p-4 flex flex-col gap-2 hover:shadow-lg transition min-w-[320px] max-w-xl mx-auto"
    >
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2 text-blue-700 font-semibold">
          <CalendarClock size={18} />
          <span>{formatDateIST(test.startDateTime)}</span>
        </div>
        <div className="text-xs text-gray-500 font-medium">{countdown}</div>
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-1">
        <span className="text-base font-bold text-gray-800">
          {test.sessionId?.commonName ? test.sessionId.commonName: "Exam" }
        </span>
        <span className="ml-0 sm:ml-2 px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-xs font-semibold">{test.stream}</span>
        {test.sessionId?.year && (
          <span className="ml-0 sm:ml-2 px-2 py-0.5 rounded bg-gray-100 text-gray-700 text-xs font-medium">{test.sessionId.year}</span>
        )}
      </div>
      {shortDescription && (
        <div className="text-xs text-gray-600 mt-1 line-clamp-2">{shortDescription}</div>
      )}
      {typeof expectedScore === 'number' && !test.resultUploaded && (
        <div className="text-sm font-semibold text-green-700 mt-1">Expected Score: {expectedScore}</div>
      )}
      {canStart && (
        <button
          onClick={onClick}
          className="mt-3 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
        >
          Start Exam
        </button>
      )}
      {test.resultUploaded && (
        <button
          onClick={handleDownloadScoreCard}
          className="mt-2 w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
          disabled={downloadScoreCard.isLoading}
        >
          <Download size={18} />
          {downloadScoreCard.isLoading ? 'Downloading...' : 'Download Scorecard'}
        </button>
      )}
    </div>
  );
};

export default StudentTestCard; 