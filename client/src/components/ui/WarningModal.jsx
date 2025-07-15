import React from 'react';

export default function WarningModal({ open, onConfirm, title = 'Warning', message, confirmText = 'OK' }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-sm w-full flex flex-col items-center">
        <div className="text-lg font-bold mb-4 text-yellow-700">{title}</div>
        <div className="mb-6 text-gray-700 text-center">{message}</div>
        <button
          className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold"
          onClick={onConfirm}
        >
          {confirmText}
        </button>
      </div>
    </div>
  );
} 