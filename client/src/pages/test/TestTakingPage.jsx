import React, { useEffect, useState, useCallback, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useStartTestAttempt,
  useSubmitTestAttempt,
  useTests,
} from "../../queries/useTestsQueries";
import { useNotification } from "../../contexts/NotificationContext";
import { getSectionMeta } from "../../utils/sectionConfig";
import WarningModal from "../../components/ui/WarningModal";
import Loading from "../../components/ui/Loading";
import { Clock, BookOpen, ListChecks } from "lucide-react";

// Constants
const SECTION_TIME = 25 * 60 * 1000; // 25 min
const EARLY_ENTRY = 5 * 60 * 1000; // 5 min

function formatTime(ms) {
  if (ms <= 0 || !ms) return "00:00";
  const s = Math.floor(ms / 1000);
  return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
}

function toISTString(dt) {
  return new Date(dt).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

export default function TestTakingPage() {
  const { testId } = useParams();
  const navigate = useNavigate();
  const { showNotification } = useNotification();

  // Data hooks
  const { data: allTests } = useTests();
  const test = allTests?.find((t) => t.id === testId || t._id === testId);

  // Mutations
  const { mutateAsync: startAttempt, isLoading: startingAttempt } = useStartTestAttempt();
  const { mutateAsync: submitAttempt } = useSubmitTestAttempt();

  // State
  const [attempt, setAttempt] = useState(null);
  const [globalCountdown, setGlobalCountdown] = useState(null);
  const [sectionCountdown, setSectionCountdown] = useState(SECTION_TIME);
  const [currentSection, setCurrentSection] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [sectionLocked, setSectionLocked] = useState({});
  const [examStarted, setExamStarted] = useState(false);
  const [finalSubmitted, setFinalSubmitted] = useState(false);
  const [startError, setStartError] = useState(null);
  const sectionMeta = attempt ? getSectionMeta(attempt.stream) : test ? getSectionMeta(test.stream) : [];

  // Load answers from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(`answers-${testId}`);
      if (stored) setUserAnswers(JSON.parse(stored));
    } catch {}
  }, [testId]);

  // Set initial countdowns using Date.now()
  useEffect(() => {
    if (!attempt) return;
    const now = Date.now();
    const start = new Date(attempt.startDateTime).getTime();
    const entryTime = start - EARLY_ENTRY;
    if (now < entryTime) {
      setGlobalCountdown(entryTime - now);
    } else if (now < start) {
      setGlobalCountdown(start - now);
    } else {
      setExamStarted(true);
    }
  }, [attempt]);

  // Global timer
  useEffect(() => {
    if (globalCountdown === null) return;
    const i = setInterval(() => {
      setGlobalCountdown((prev) => {
        if (!prev || prev <= 1000) {
          clearInterval(i);
          setExamStarted(true);
          return 0;
        }
        return prev - 1000;
      });
    }, 1000);
    return () => clearInterval(i);
  }, [globalCountdown]);

  // Section timer
  useEffect(() => {
    if (!examStarted) return;
    setSectionCountdown(SECTION_TIME);
    const i = setInterval(() => {
      setSectionCountdown((prev) => {
        if (prev <= 1000) {
          clearInterval(i);
          handleSectionLock();
          return 0;
        }
        return prev - 1000;
      });
    }, 1000);
    return () => clearInterval(i);
  }, [examStarted, currentSection]);

  // Fullscreen logic
  useEffect(() => {
    if (examStarted && !document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    }
  }, [examStarted]);

  // Anti-cheat logic using useRef
  const violationCount = useRef(0);
  const [showWarning, setShowWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");

  useEffect(() => {
    if (!examStarted) return;
    const handleCheat = () => {
      if (violationCount.current === 0) {
        setWarningMessage("Do not leave fullscreen or switch tabs! Next violation will auto-submit your exam.");
        setShowWarning(true);
        violationCount.current++;
      } else {
        setShowWarning(false);
        showNotification("Exam auto-submitted due to cheating attempt.", "error");
        handleAutoSubmit();
      }
    };
    const handleVisibility = () => { if (document.hidden) handleCheat(); };
    const handleFullscreen = () => { if (!document.fullscreenElement) handleCheat(); };
    const handleKeydown = (e) => {
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && ['I', 'J', 'C', 'U'].includes(e.key.toUpperCase()))
      ) {
        handleCheat();
      }
    };
    const handleCopyPaste = (e) => e.preventDefault();
    document.addEventListener('visibilitychange', handleVisibility);
    document.addEventListener('fullscreenchange', handleFullscreen);
    document.addEventListener('keydown', handleKeydown);
    document.addEventListener('copy', handleCopyPaste);
    document.addEventListener('paste', handleCopyPaste);
    document.addEventListener('cut', handleCopyPaste);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      document.removeEventListener('fullscreenchange', handleFullscreen);
      document.removeEventListener('keydown', handleKeydown);
      document.removeEventListener('copy', handleCopyPaste);
      document.removeEventListener('paste', handleCopyPaste);
      document.removeEventListener('cut', handleCopyPaste);
    };
  }, [examStarted, showNotification]);

  // Auto-save answers
  useEffect(() => {
    const id = setInterval(() => {
      localStorage.setItem(`answers-${testId}`, JSON.stringify(userAnswers));
    }, 5000);
    return () => clearInterval(id);
  }, [testId, userAnswers]);

  const handleOptionChange = useCallback((qId, opt) => {
    setUserAnswers((p) => ({ ...p, [qId]: opt }));
  }, []);

  const handleAcknowledge = async () => {
    setStartError(null);
    try {
      const d = await startAttempt(testId);
      setAttempt(d);
    } catch (err) {
      setStartError(err?.response?.data?.message || err.message || "Failed to start exam");
    }
  };

  const handleSectionLock = useCallback(() => {
    setSectionLocked((p) => ({ ...p, [currentSection]: true }));
    if (currentSection < attempt.sections.length - 1) {
      setCurrentSection((i) => i + 1);
    }
  }, [currentSection, attempt]);

  const handleFinalSubmit = useCallback(async () => {
    if (finalSubmitted) return;
    setFinalSubmitted(true);
    const ans = [];
    attempt.sections.forEach((s) =>
      s.questions.forEach((q) =>
        ans.push({
          questionId: q._id,
          selectedOption: userAnswers[q._id],
          optionMap: q.optionMap,
        })
      )
    );
    await submitAttempt({ testId, answers: ans });
    showNotification("Submitted! Good luck 😊", "success");
    navigate("/dashboard/student");
  }, [attempt, userAnswers, submitAttempt, testId, showNotification, navigate, finalSubmitted]);

  const handleAutoSubmit = useCallback(async () => {
    setFinalSubmitted(true);
    const ans = [];
    attempt.sections.forEach((s) =>
      s.questions.forEach((q) =>
        ans.push({
          questionId: q._id,
          selectedOption: userAnswers[q._id],
          optionMap: q.optionMap,
        })
      )
    );
    await submitAttempt({ testId, answers: ans });
    navigate("/dashboard/student");
  }, [attempt, userAnswers, submitAttempt, testId, navigate]);

  // Render loading state
  if (!test) return <Loading message="Loading test..." />;

  // Render pre-exam (instructions/acknowledgement)
  if (!attempt || !examStarted) {
    return (
      <div className="w-full min-h-screen flex flex-col bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900">
        <div className="w-full bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 text-white py-4 px-6 text-2xl font-bold flex flex-col sm:flex-row sm:items-center justify-between shadow-lg">
          <span>{test?.sessionId?.commonName || test?.name || 'Exam'}</span>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <span className="text-base font-normal">{test?.sessionId?.year}</span>
            <span className="ml-4 font-mono text-lg flex items-center gap-2"><Clock size={18} />{formatTime(globalCountdown)}</span>
          </div>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="max-w-2xl w-full p-8 bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl mt-8">
            <h2 className="text-3xl font-bold mb-6 text-white text-center drop-shadow">Exam Entry</h2>
            <div className="mb-2 text-white/90"><b>Stream:</b> {test.stream}</div>
            <div className="mb-2 text-white/90"><b>Exam Starts At:</b> {test.startDateTime ? toISTString(test.startDateTime) : ''}</div>
            <div className="mb-2 text-white/90"><b>Description:</b> {test.description}</div>
            <div className="mb-2 text-white/90"><b>Sections:</b></div>
            <div className="space-y-2 mb-4">
              {sectionMeta.map((meta, idx) => (
                <div key={meta.section} className="flex items-center gap-3 bg-blue-100/20 rounded px-3 py-2">
                  <BookOpen size={18} className="text-blue-200" />
                  <span className="font-semibold text-blue-100">{meta.label} ({meta.section})</span>
                  <span className="text-xs text-blue-200 flex items-center gap-1">
                    <Clock size={14} className="inline-block" /> 25 min
                  </span>
                  <span className="text-xs text-blue-200 flex items-center gap-1">
                    <ListChecks size={14} className="inline-block" /> {meta.topics}
                  </span>
                </div>
              ))}
            </div>
            <ul className="list-disc pl-6 mb-4 text-blue-100/90">
              <li>No cheating: No tab switching, no dev tools, no copy/paste.</li>
              <li>Ensure a stable internet connection.</li>
              <li>Each section is 25 minutes. Once submitted, you cannot go back.</li>
              <li>Exiting fullscreen or switching tabs will auto-submit your exam.</li>
            </ul>
            {startError && <div className="text-red-400 mb-2">{startError}</div>}
            <button
              className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 hover:from-orange-600 hover:via-red-600 hover:to-pink-600 text-white px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 shadow-xl w-full mt-4"
              onClick={handleAcknowledge}
              disabled={startingAttempt}
            >
              {startingAttempt ? 'Starting Exam...' : 'I have read and understood the instructions'}
            </button>
          </div>
        </div>
        <WarningModal
          open={showWarning}
          onConfirm={() => {
            setShowWarning(false);
            document.documentElement.requestFullscreen();
          }}
          message={warningMessage}
        />
      </div>
    );
  }

  // Section questions UI
  const section = attempt.sections[currentSection];
  const sectionLabel = sectionMeta[currentSection]?.label || section.name;
  const answeredCount = Object.keys(userAnswers).length;
  const totalQ = attempt.sections.reduce((sum, s) => sum + s.questions.length, 0);

  return (
    <div className="w-full min-h-screen flex flex-col bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900">
      <div className="w-full bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 text-white py-4 px-6 text-2xl font-bold flex flex-col sm:flex-row sm:items-center justify-between shadow-lg">
        <span>
          {attempt.sessionId?.commonName || attempt.name}
          {" — "}
          Section {sectionLabel} ({section.name})
        </span>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <span className="text-base font-normal">{attempt.sessionId?.year}</span>
          <span className="ml-4 font-mono text-lg flex items-center gap-2"><Clock size={18} />{formatTime(sectionCountdown)}</span>
        </div>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="w-full max-w-3xl p-6 bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl mt-8">
          <div className="flex justify-between items-center mb-4">
            <div>
              <div className="font-bold text-lg text-blue-100 drop-shadow">Section {sectionLabel} ({section.name})</div>
            </div>
            <div className="text-right">
              <div className="font-semibold text-blue-100">{attempt.name}</div>
              <div className="text-xs text-blue-200">Stream: {attempt.stream}</div>
              <div className="text-xs text-blue-200 mt-2">Answered: {answeredCount}/{totalQ}</div>
            </div>
          </div>
          <div className="mb-6">
            {section.questions.map((q, idx) => (
              <div key={q._id} className="mb-4 p-4 border border-blue-200/20 rounded-lg bg-white/5">
                <div className="font-medium mb-2 text-blue-100">Q{idx + 1}. {q.question}</div>
                <div className="space-y-2">
                  {q.options.map((opt, oIdx) => (
                    <label key={oIdx} className="flex items-center cursor-pointer p-2 border border-blue-200/10 rounded hover:bg-blue-100/10 transition">
                      <input
                        type="radio"
                        name={`q-${q._id}`}
                        value={oIdx}
                        checked={userAnswers[q._id] === oIdx}
                        onChange={() => handleOptionChange(q._id, oIdx)}
                        disabled={sectionLocked[currentSection] || finalSubmitted}
                        className="form-radio h-4 w-4 text-blue-600"
                      />
                      <span className="ml-3 text-blue-100">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center pt-4 border-t border-blue-200/20">
            <button
              onClick={() => setCurrentSection((i) => i - 1)}
              disabled={currentSection === 0}
              className="px-4 py-2 bg-blue-200/20 text-blue-100 rounded hover:bg-blue-200/40 disabled:opacity-50"
            >
              Previous Section
            </button>
            <button
              onClick={() => setCurrentSection((i) => i + 1)}
              disabled={currentSection === attempt.sections.length - 1 || !sectionLocked[currentSection]}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              Next Section
            </button>
            {currentSection === attempt.sections.length - 1 ? (
              <button
                onClick={handleFinalSubmit}
                disabled={finalSubmitted}
                className="px-6 py-3 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white rounded hover:from-green-600 hover:to-teal-600 font-semibold disabled:opacity-50 shadow-xl"
              >
                {finalSubmitted ? 'Submitting...' : 'Submit Exam'}
              </button>
            ) : (
              <button
                onClick={handleSectionLock}
                disabled={sectionLocked[currentSection] || finalSubmitted}
                className="px-6 py-3 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white rounded hover:from-green-600 hover:to-teal-600 font-semibold disabled:opacity-50 shadow-xl"
              >
                {finalSubmitted ? 'Submitting...' : 'Submit Section'}
              </button>
            )}
          </div>
        </div>
      </div>
      <WarningModal
        open={showWarning}
        onConfirm={() => {
          setShowWarning(false);
          document.documentElement.requestFullscreen();
        }}
        message={warningMessage}
      />
    </div>
  );
} 