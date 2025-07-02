import React from "react";
import { Edit, Trash2, CalendarClock } from "lucide-react";
import PublishTestButton from "./PublishTestButton";
import { SECTION_ORDER } from "../../utils/sectionConfig";

const TestCard = ({ test, onSelect, onDelete }) => {
  const sectionMap = {};
  (test.sections || []).forEach((sec) => {
    sectionMap[sec.name] = sec;
  });
  const sectionDisplay = SECTION_ORDER.map(
    (sec) => String((sectionMap[sec]?.questions?.length || 0)).padStart(2, "0")
  ).join(" | ");

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

  return (
    <div className="bg-white rounded-xl shadow-md border p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="text-xs text-gray-500 mt-1 flex items-center gap-1">
            <h3 className="text-xl font-bold text-gray-800">{test.stream}</h3>
            <CalendarClock size={14} className="ms-2 inline-block" />
            {formatDateIST(test.startDateTime)}
          </div>
          <p className="text-sm text-gray-500 mt-1">{test.description}</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <PublishTestButton test={test} />
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col gap-1 text-sm text-gray-600 min-w-[180px]">
          <div className="font-semibold text-blue-700 tracking-wider">{sectionDisplay}</div>
        </div>
        <div className="flex items-center gap-2 mt-2 sm:mt-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(test.id);
            }}
            className="flex items-center gap-2 px-3 py-1 text-sm font-semibold border rounded-lg transition-colors duration-200 bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-200"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(test.id);
            }}
            className="flex items-center gap-2 px-3 py-1 text-sm font-semibold border rounded-lg transition-colors duration-200 bg-red-100 text-red-700 hover:bg-red-200 border-red-200 disabled:opacity-50"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestCard; 