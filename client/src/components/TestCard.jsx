import React from 'react';
import { Calendar, Clock, Users } from 'lucide-react';

function formatDuration(start, end) {
  const diff = (new Date(end) - new Date(start)) / 1000;
  const hours = Math.floor(diff / 3600);
  const minutes = Math.floor((diff % 3600) / 60);
  return `${hours ? hours + "h " : ""}${minutes}m`;
}

function formatIST(date) {
  return new Date(date).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', hour12: true });
}

const TestCard = ({ test, isRegisterDisabled, countdown, description, onRegister }) => (
  <div className="bg-white rounded-xl shadow flex flex-col gap-4 p-6 w-full max-w-xs min-h-[340px] mx-auto">
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-bold">{test.name}</h2>
      <span className="text-lg font-semibold text-blue-600">₹{test.price}</span>
    </div>
    <div className="text-gray-500 text-sm mb-2 line-clamp-3 min-h-[48px]">{description || 'No description provided.'}</div>
    <div className="flex flex-wrap gap-4 text-gray-600">
      <div className="flex items-center gap-1">
        <Calendar className="w-5 h-5" />
        {formatIST(test.startDateTime)}
      </div>
      <div className="flex items-center gap-1">
        <Clock className="w-5 h-5" />
        Duration: {formatDuration(test.startDateTime, test.endDateTime)}
      </div>
      <div className="flex items-center gap-1">
        <Users className="w-5 h-5" />
        {test.registration || 0} Registered
      </div>
      <div className="flex items-center gap-1">
        <Calendar className="w-5 h-5" />
        Registration closes in: <span className="font-semibold">{countdown || "..."}</span>
      </div>
    </div>
    <button
      className={`mt-auto w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 ${
        isRegisterDisabled
          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
          : "bg-blue-600 hover:bg-blue-700 text-white"
      }`}
      disabled={isRegisterDisabled}
      onClick={onRegister}
    >
      Register
    </button>
  </div>
);

export default TestCard; 