import React, { useState } from "react";
import { useCreateExamSession, useExamSessions } from "../../queries/useTestsQueries";
import { useNotification } from "../../contexts/NotificationContext";

const initialForm = {
  commonName: "",
  year: "",
};

const SessionManager = () => {
  const [form, setForm] = useState(initialForm);
  const { mutateAsync: createSession, isLoading } = useCreateExamSession();
  const { data: sessions, isLoading: sessionsLoading } = useExamSessions();
  const { showNotification } = useNotification();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.commonName || !form.year) {
      showNotification("Please fill all fields.", "error");
      return;
    }
    try {
      await createSession(form);
      setForm(initialForm);
    } catch (err) {
      // Notification handled in hook
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-8 w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Session Management</h2>
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <div>
          <label className="block text-sm font-medium mb-1">Exam Name</label>
          <input
            name="commonName"
            value={form.commonName}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            placeholder="e.g. Mynirdeshak National Scholarship Exam"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Year</label>
          <input
            name="year"
            value={form.year}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            placeholder="e.g. 2025-26"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-8 py-2 rounded w-full sm:w-auto mt-4"
          disabled={isLoading}
        >
          {isLoading ? "Creating..." : "Create Session"}
        </button>
      </form>
      <h3 className="text-lg font-semibold mb-2">Existing Sessions</h3>
      <div className="space-y-2">
        {sessionsLoading ? (
          <div>Loading sessions...</div>
        ) : sessions && sessions.length > 0 ? (
          sessions.map((session) => (
            <div key={session._id} className="border rounded px-3 py-2 flex justify-between items-center">
              <span>{session.commonName} ({session.year})</span>
              <span className="text-xs text-gray-500">{session._id}</span>
            </div>
          ))
        ) : (
          <div>No sessions found.</div>
        )}
      </div>
    </div>
  );
};

export default SessionManager; 