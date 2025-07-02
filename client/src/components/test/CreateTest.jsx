import React, { useState } from "react";
import { useCreateTest } from "../../queries/useTestsQueries";
import { useNotification } from "../../contexts/NotificationContext";
import { Calendar, FileText, IndianRupee } from "lucide-react";

const initialForm = {
  name: "",
  description: "",
  startDateTime: "",
  endDateTime: "",
  registrationEndDateTime: "",
  price: "",
};

const CreateTest = () => {
  const [form, setForm] = useState(initialForm);
  const { mutateAsync: createTest, isLoading } = useCreateTest();
  const { showNotification } = useNotification();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Basic validation
    if (!form.name || !form.description || !form.startDateTime || !form.endDateTime || !form.registrationEndDateTime || !form.price) {
      showNotification("Please fill all fields.", "error");
      return;
    }
    if (new Date(form.startDateTime) >= new Date(form.endDateTime)) {
      showNotification("End time must be after start time.", "error");
      return;
    }
    if (new Date(form.registrationEndDateTime) > new Date(form.startDateTime)) {
      showNotification("Registration end must be before test start.", "error");
      return;
    }
    try {
      const payload = {
        ...form,
        price: Number(form.price),
      };
      const test = await createTest(payload);
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
          <label className="block text-sm font-medium mb-1">Test Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Enter test name"
            required
          />
        </div>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
          <div>
            <label className="block text-sm font-medium mb-1 flex items-center gap-1">
              <Calendar className="w-4 h-4" /> End Date & Time
            </label>
            <input
              type="datetime-local"
              name="endDateTime"
              value={form.endDateTime}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 flex items-center gap-1">
            <Calendar className="w-4 h-4" /> Registration End Date & Time
          </label>
          <input
            type="datetime-local"
            name="registrationEndDateTime"
            value={form.registrationEndDateTime}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 flex items-center gap-1">
            <IndianRupee className="w-4 h-4" /> Price (INR)
          </label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            min={0}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-8 py-2 rounded w-full sm:w-auto float-right"
          disabled={isLoading}
        >
          {isLoading ? "Creating..." : "Create Test"}
        </button>
      </form>
    </div>
  );
};

export default CreateTest; 