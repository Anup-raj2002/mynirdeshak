import React, { useState } from "react";
import { useTestById, useUpdateTest, useAddQuestionToTest, useDeleteQuestionFromTest } from "../../queries/useTestsQueries";
import { X, Plus, Trash2, Edit, ChevronDown, ChevronRight } from "lucide-react";
import Loading from "../ui/Loading";
import ErrorPage from "../ui/ErrorPage";
import { SECTION_ORDER, getSectionMeta } from "../../utils/sectionConfig";

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
    section: SECTION_ORDER[0],
  });
  const [openSection, setOpenSection] = useState(null);

  if (!open) return null;
  if (isLoading) return <Loading />;
  if (error) return <ErrorPage message={error.message} />;
  if (!test) return null;

  // Section meta and mapping
  const sectionMeta = getSectionMeta(test.stream);
  const sectionMap = {};
  (test.sections || []).forEach((sec) => {
    sectionMap[sec.name] = sec;
  });

  // Handlers
  const handleEditTest = () => {
    setEditForm({
      stream: test.stream,
      description: test.description,
      startDateTime: test.startDateTime?.slice(0, 16),
    });
    setMode("editTest");
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditFormSubmit = async (e) => {
    e.preventDefault();
    await updateTest({ testId, updateData: {
      description: editForm.description,
      startDateTime: editForm.startDateTime,
    }});
    setMode("addQuestion");
  };

  const handleAddQuestion = (section) => {
    setQuestionForm({ question: "", options: ["", "", "", ""], correctAnswer: 0, section });
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
      section: questionForm.section,
    }});
    setMode("addQuestion");
  };

  const handleDeleteQuestion = async (questionId) => {
    if (!window.confirm("Delete this question?")) return;
    await deleteQuestion({ testId, questionId });
  };

  const toggleSection = (section) => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-[90vh] flex overflow-hidden">
        {/* Close button */}
        <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200 z-10">
          <X size={24} />
        </button>
        {/* Sidebar */}
        <div className="bg-gray-50 w-80 h-full p-6 flex flex-col border-r overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <span className="text-lg font-bold text-left truncate">{test.stream}</span>
            <button onClick={handleEditTest} className="p-1 rounded hover:bg-gray-200 flex items-center gap-1 text-blue-600 text-xs font-medium">
              <Edit size={16} />
            </button>
          </div>
          <div className="flex flex-col gap-2 mt-1">
            {sectionMeta.map((meta) => {
              const sec = sectionMap[meta.section] || {};
              const questions = sec.questions || [];
              return (
                <div key={meta.section} className="bg-blue-50 rounded px-2 py-2 flex flex-col">
                  <button
                    className="flex items-center justify-between w-full text-left font-semibold text-blue-800 focus:outline-none"
                    onClick={() => toggleSection(meta.section)}
                  >
                    <span>{meta.label}</span>
                    <span className="flex items-center gap-1">
                      <span className="text-xs text-gray-600">{questions.length} Qs</span>
                      {openSection === meta.section ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    </span>
                  </button>
                  <span className="text-xs text-gray-500 mb-1">{meta.topics}</span>
                  <button
                    onClick={() => handleAddQuestion(meta.section)}
                    className="mt-1 text-xs text-blue-600 hover:underline self-end"
                  >
                    <Plus size={14} className="inline-block mr-1" /> Add Question
                  </button>
                  {openSection === meta.section && questions.length > 0 && (
                    <ul className="mt-2 space-y-1">
                      {questions.map((q) => (
                        <li key={q.id} className="flex items-center justify-between group bg-gray-100 rounded px-2 py-1">
                          <span className="truncate text-sm">{q.question}</span>
                          <span className="text-xs text-green-700 ml-2">Ans: {q.options?.[q.correctAnswer] || "-"}</span>
                          <button
                            onClick={() => handleDeleteQuestion(q.id)}
                            className="ml-2 p-1 rounded hover:bg-red-100 text-red-600"
                          >
                            <Trash2 size={16} />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        {/* Main area */}
        <div className="flex-1 bg-white p-10 pb-16 overflow-y-auto">
          {mode === "editTest" && editForm && (
            <form onSubmit={handleEditFormSubmit} className="max-w-lg mx-auto space-y-6">
              <h2 className="text-xl font-bold mb-4">Edit Test Details</h2>
              <div>
                <label className="block text-sm font-medium mb-1">Stream</label>
                <input name="stream" value={editForm.stream} className="w-full border rounded px-3 py-2 bg-gray-100" disabled />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea name="description" value={editForm.description} onChange={handleEditFormChange} className="w-full border rounded px-3 py-2" rows={3} required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Start Date & Time</label>
                <input type="datetime-local" name="startDateTime" value={editForm.startDateTime} onChange={handleEditFormChange} className="w-full border rounded px-3 py-2" required />
              </div>
              <button type="submit" className="bg-blue-600 text-white px-8 py-2 rounded w-full sm:w-auto float-right">Save Changes</button>
            </form>
          )}
          {mode === "addQuestion" && (
            <form onSubmit={handleQuestionFormSubmit} className="max-w-lg mx-auto mb-8 space-y-6">
              <h2 className="text-xl font-bold mb-4">Add Question</h2>
              <div>
                <label className="block text-sm font-medium mb-1">Section</label>
                <select
                  name="section"
                  value={questionForm.section}
                  onChange={handleQuestionFormChange}
                  className="w-full border rounded px-3 py-2"
                  required
                >
                  {sectionMeta.map((meta) => (
                    <option key={meta.section} value={meta.section}>{meta.label}</option>
                  ))}
                </select>
              </div>
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
              <button type="submit" className="bg-blue-600 text-white px-8 py-2 rounded w-full sm:w-auto float-right">Add Question</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestManageModal; 