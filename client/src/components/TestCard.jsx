import React from "react";
import { Clock, Users, Trash2, Calendar, Edit } from "lucide-react";
import PublishTestButton from "./PublishTestButton";

const TestCard = ({ test, onSelect, onDelete }) => {
  const isPast = new Date(test.endDateTime) < new Date();

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div
      onClick={() => onSelect(test.id)}
      className={`bg-white rounded-xl shadow-md border p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer ${
        isPast ? "opacity-60 bg-gray-50" : ""
      }`}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-800">{test.name}</h3>
          <p className="text-sm text-gray-500 mt-1">{test.description}</p>
        </div>
        <span
          className={`px-3 py-1 text-xs font-semibold rounded-full ${
            test.isPublished
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {test.isPublished ? "Published" : "Draft"}
        </span>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-600">
          <div className="flex items-center gap-1.5" title="Registrations">
            <Users size={16} />
            <span>{test.registration || 0} Registered</span>
          </div>
          <div className="flex items-center gap-1.5" title="Start Date">
            <Calendar size={16} />
            <span>{formatDate(test.startDateTime)}</span>
          </div>
          <div className="flex items-center gap-1.5" title="End Date">
            <Clock size={16} />
            <span>{formatDate(test.endDateTime)}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-2 sm:mt-0">
          <PublishTestButton test={test} />
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