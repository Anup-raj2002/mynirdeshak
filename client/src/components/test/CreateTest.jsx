import React, { useState, useEffect } from "react";
import { useCreateTest, useExamSessions } from "../../queries/useTestsQueries";
import { useNotification } from "../../contexts/NotificationContext";
import { Calendar, FileText } from "lucide-react";

const initialForm = {
  description: "",
  stream: "",
  sessionId: "",
  startDateTime: "",
};

const STREAM_OPTIONS = [
  { value: "PCM", label: "PCM (Physics, Chemistry, Maths)" },
  { value: "PCB", label: "PCB (Physics, Chemistry, Biology)" },
  { value: "PCMB", label: "PCMB (All Four Science Subjects)" },
  { value: "Commerce", label: "Commerce (Accounts, Business, Economics)" },
  { value: "Arts", label: "Arts / Humanities" },
  { value: "Others", label: "Others (Vocational / ITI / Polytechnic / Open School)" },
];

const CreateTest = () => {
  const [form, setForm] = useState(initialForm);
  const { mutateAsync: createTest, isLoading } = useCreateTest();
  const { showNotification } = useNotification();
  const { data: sessions, isLoading: sessionsLoading } = useExamSessions();

  // Set default sessionId to latest session
  useEffect(() => {
    if (sessions && sessions.length > 0 && !form.sessionId) {
      setForm((prev) => ({ ...prev, sessionId: sessions[0]._id }));
    }
  }, [sessions]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.description || !form.stream || !form.sessionId || !form.startDateTime) {
      showNotification("Please fill all required fields.", "error");
      return;
    }
    try {
      const payload = {
        description: form.description,
        stream: form.stream,
        sessionId: form.sessionId,
        startDateTime: form.startDateTime,
      };
      await createTest(payload);
      showNotification("Test created! You can now add questions.", "success");
      setForm(initialForm);
    } catch (err) {
      showNotification(err.response?.data?.message || "Failed to create test.", "error");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-8 w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <FileText className="w-6 h-6 text-blue-600" /> Create New Test
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Describe the test"
            rows={3}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Stream</label>
          <select
            name="stream"
            value={form.stream}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          >
            <option value="">Select Stream</option>
            {STREAM_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Session</label>
          <select
            name="sessionId"
            value={form.sessionId}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
            disabled={sessionsLoading}
          >
            <option value="">{sessionsLoading ? "Loading..." : "Select Session"}</option>
            {sessions && sessions.map((session) => (
              <option key={session._id} value={session._id}>
                {session.commonName} ({session.year})
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 flex items-center gap-1">
            <Calendar className="w-4 h-4" /> Start Date & Time
          </label>
          <input
            type="datetime-local"
            name="startDateTime"
            value={form.startDateTime}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-8 py-2 rounded w-full sm:w-auto mt-4"
          disabled={isLoading}
        >
          {isLoading ? "Creating..." : "Create Test"}
        </button>
      </form>
    </div>
  );
};

export default CreateTest; 