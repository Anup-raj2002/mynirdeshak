import React, { useState } from "react";
import { Edit, Trash2, CalendarClock, Download } from "lucide-react";
import PublishTestButton from "./PublishTestButton";
import { SECTION_ORDER } from "../../utils/sectionConfig";
import { useTestRankings } from "../../queries/useTestsQueries";
import { useUser } from "../../contexts/UserContext";
import * as xlsx from 'xlsx';
import { useUploadTestResult } from '../../queries/useTestsQueries';

const REQUIRED_COLUMNS = ['UID', 'Rank', 'Name', 'Score', 'Father Name', 'Mother Name'];

const TestCard = ({ test, onSelect, onDelete }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const { profile: user } = useUser();
  const uploadMutation = useUploadTestResult();
  
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

  // Check if test has ended (start time + 120 minutes)
  const testEndTime = new Date(test.startDateTime);
  testEndTime.setMinutes(testEndTime.getMinutes() + 120);
  const hasTestEnded = new Date() > testEndTime;

  const { refetch: downloadRankings } = useTestRankings(test.id, {
    enabled: false,
  });

  const handleDownloadRankings = async (e) => {
    e.stopPropagation();
    setIsDownloading(true);
    try {
      const response = (await downloadRankings()).data;
  
      if (response.data) {
        let filename = `test-rankings-${test.id}.xlsx`;
  
        const disposition = response.headers['content-disposition'];
        if (disposition) {
          const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
          const matches = filenameRegex.exec(disposition);
          if (matches !== null && matches[1]) {
            filename = matches[1].replace(/['"]/g, '');
          }
        }
  
        const blob = new Blob([response.data], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        });
  
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error("got this during pdf", error)
    } finally {
      setIsDownloading(false);
    }
  };

  const handleUploadRankings = async (e) => {
    e.stopPropagation();
    const file = e.target.files[0];
    if (!file) return;
    setIsUploading(true);
    try {
      const data = await file.arrayBuffer();
      const workbook = xlsx.read(data, { type: 'array' });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows = xlsx.utils.sheet_to_json(sheet, { defval: '' });
      // Validate columns
      const hasAllColumns = REQUIRED_COLUMNS.every(col => Object.keys(rows[0] || {}).includes(col));
      if (!hasAllColumns) {
        throw new Error('Missing required columns in uploaded file.');
      }
      await uploadMutation.mutateAsync({ testId: test.id, rows });
    } catch (err) {
      alert(err.message || 'Failed to upload rankings.');
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
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
          {hasTestEnded && !test.resultUploaded && user?.role !== 'instructor' && (
            <button
              onClick={handleDownloadRankings}
              disabled={isDownloading}
              className="flex items-center gap-2 px-3 py-1 text-sm font-semibold border rounded-lg transition-colors duration-200 bg-green-100 text-green-700 hover:bg-green-200 border-green-200 disabled:opacity-50"
            >
              <Download size={16} />
              {isDownloading ? 'Downloading...' : 'Download Rankings'}
            </button>
          )}
          {hasTestEnded && !test.resultUploaded && ['admin', 'test-manager', 'instructor'].includes(user?.role) && (
            <label className="flex items-center gap-2 px-3 py-1 text-sm font-semibold border rounded-lg transition-colors duration-200 bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-200 disabled:opacity-50 cursor-pointer">
              <input
                type="file"
                accept=".xlsx,.xls"
                onChange={handleUploadRankings}
                disabled={isUploading}
                style={{ display: 'none' }}
              />
              {isUploading ? 'Uploading...' : 'Upload Rankings'}
            </label>
          )}
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