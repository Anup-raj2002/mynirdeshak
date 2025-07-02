import React, { useState } from "react";
import { useTestById, useUpdateTest, useAddQuestionToTest, useDeleteQuestionFromTest } from "../../queries/useTestsQueries";
import { X, Plus, Trash2, Edit } from "lucide-react";
import Loading from "..//uiLoading";
import ErrorPage from "../ui/ErrorPage";

const TestManageModal = ({ testId, open, onClose }) => {
  const { data: test, isLoading, error } = useTestById(testId);
  const { mutateAsync: updateTest } = useUpdateTest();
  const { mutateAsync: addQuestion } = useAddQuestionToTest();
  const { mutateAsync: deleteQuestion } = useDeleteQuestionFromTest();

  const [mode, setMode] = useState("addQuestion");
  const [editForm, setEditForm] = useState(null);
  const [questionForm, setQuestionForm] = useState({
    question: "",
    options: ["", "", "", ""],
    correctAnswer: 0,
    points: 1,
  });

  if (!open) return null;
  if (isLoading) return <Loading />;
  if (error) return <ErrorPage message={error.message} />;
  if (!test) return null;

  // Handlers
  const handleEditTest = () => {
    setEditForm({
      name: test.name,
      description: test.description,
      startDateTime: test.startDateTime?.slice(0, 16),
      endDateTime: test.endDateTime?.slice(0, 16),
      registrationEndDateTime: test.registrationEndDateTime?.slice(0, 16),
      price: test.price,
    });
    setMode("editTest");
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditFormSubmit = async (e) => {
    e.preventDefault();
    await updateTest({ testId, updateData: { ...editForm, price: Number(editForm.price) } });
    setMode(null);
  };

  const handleAddQuestion = () => {
    setQuestionForm({ question: "", options: ["", "", "", ""], correctAnswer: 0, points: 1 });
    setMode("addQuestion");
  };

  const handleQuestionFormChange = (e, idx) => {
    const { name, value } = e.target;
    if (name === "options") {
      setQuestionForm((prev) => {
        const newOptions = [...prev.options];
        newOptions[idx] = value;
        return { ...prev, options: newOptions };
      });
    } else {
      setQuestionForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleQuestionFormSubmit = async (e) => {
    e.preventDefault();
    await addQuestion({ testId, questionData: {
      ...questionForm,
      correctAnswer: Number(questionForm.correctAnswer),
      points: Number(questionForm.points),
    }});
    setMode(null);
  };

  const handleDeleteQuestion = async (questionId) => {
    if (!window.confirm("Delete this question?")) return;
    await deleteQuestion({ testId, questionId });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-[90vh] flex overflow-hidden">
        {/* Close button */}
        <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200 z-10">
          <X size={24} />
        </button>
        {/* Sidebar */}
        <div className="bg-gray-50 w-80 h-full p-6 flex flex-col border-r">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-lg font-bold text-left flex-1 truncate">{test.name}</span>
            <button onClick={handleEditTest} className="p-1 rounded hover:bg-gray-200">
              <Edit size={18} />
            </button>
          </div>
          <div className="mb-4 text-xs text-gray-500">Questions</div>
          <div className="flex-1 overflow-y-auto">
            {test.questions && test.questions.length > 0 ? (
              <ul className="space-y-2">
                {test.questions.map((q) => (
                  <li key={q.id} className="flex items-center justify-between group bg-gray-100 rounded px-2 py-1">
                    <span className="truncate text-sm">{q.question}</span>
                    <button
                      onClick={() => handleDeleteQuestion(q.id)}
                      className="ml-2 p-1 rounded hover:bg-red-100 text-red-600"
                    >
                      <Trash2 size={16} />
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex flex-col items-center justify-center h-40 text-gray-400">
                <span className="mb-2">No questions yet</span>
                <svg width="48" height="48" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#cbd5e1" strokeWidth="2" /><path d="M12 8v4m0 4h.01" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" /></svg>
              </div>
            )}
          </div>
          {/* Add Question button only visible in editTest mode */}
          {mode === "editTest" && (
            <button
              onClick={() => setMode("addQuestion")}
              className="mt-6 flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 w-full"
            >
              <Plus size={18} /> Add Question
            </button>
          )}
        </div>
        {/* Main area */}
        <div className="flex-1 bg-white p-10 pb-16 overflow-y-auto">
          {mode === "editTest" && editForm && (
            <form onSubmit={handleEditFormSubmit} className="max-w-lg mx-auto space-y-6">
              <h2 className="text-xl font-bold mb-4">Edit Test Details</h2>
              <div>
                <label className="block text-sm font-medium mb-1">Test Name</label>
                <input name="name" value={editForm.name} onChange={handleEditFormChange} className="w-full border rounded px-3 py-2" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea name="description" value={editForm.description} onChange={handleEditFormChange} className="w-full border rounded px-3 py-2" rows={3} required />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Start Date & Time</label>
                  <input type="datetime-local" name="startDateTime" value={editForm.startDateTime} onChange={handleEditFormChange} className="w-full border rounded px-3 py-2" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">End Date & Time</label>
                  <input type="datetime-local" name="endDateTime" value={editForm.endDateTime} onChange={handleEditFormChange} className="w-full border rounded px-3 py-2" required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Registration End Date & Time</label>
                <input type="datetime-local" name="registrationEndDateTime" value={editForm.registrationEndDateTime} onChange={handleEditFormChange} className="w-full border rounded px-3 py-2" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Price (INR)</label>
                <input type="number" name="price" value={editForm.price} onChange={handleEditFormChange} className="w-full border rounded px-3 py-2" min={0} required />
              </div>
              <button type="submit" className="bg-blue-600 text-white px-8 py-2 rounded w-full sm:w-auto float-right">Save Changes</button>
            </form>
          )}
          {mode !== "editTest" && (
            <form onSubmit={e => {
              e.preventDefault();
              addQuestion({ testId, questionData: {
                ...questionForm,
                correctAnswer: questionForm.correctAnswer,
                points: Number(questionForm.points),
              }});
              handleAddQuestion();
            }} className="max-w-lg mx-auto space-y-6">
              <h2 className="text-xl font-bold mb-4">Add Question</h2>
              <div>
                <label className="block text-sm font-medium mb-1">Question</label>
                <input name="question" value={questionForm.question} onChange={handleQuestionFormChange} className="w-full border rounded px-3 py-2" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Options</label>
                {questionForm.options.map((opt, idx) => (
                  <div key={idx} className="flex items-center mb-2">
                    <input
                      name="options"
                      value={opt}
                      onChange={e => handleQuestionFormChange(e, idx)}
                      className="w-full border rounded px-3 py-2 mr-2"
                      placeholder={`Option ${idx + 1}`}
                      required
                    />
                    <input
                      type="radio"
                      name="correctAnswerRadio"
                      checked={questionForm.correctAnswer === idx}
                      onChange={() => setQuestionForm(prev => ({ ...prev, correctAnswer: idx }))}
                      className="ml-2"
                    />
                    <span className="ml-1 text-xs text-gray-600">Correct</span>
                  </div>
                ))}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Points</label>
                <input
                  name="points"
                  type="number"
                  min={1}
                  value={questionForm.points}
                  onChange={handleQuestionFormChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <button type="submit" className="bg-blue-600 text-white px-8 py-2 rounded w-full sm:w-auto float-right">Add Question</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestManageModal; 