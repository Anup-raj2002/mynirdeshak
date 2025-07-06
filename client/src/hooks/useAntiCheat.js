import { useEffect } from 'react';

export default function useAntiCheat({ onFirstViolation, onSecondViolation, examStarted }) {
  useEffect(() => {
    if (!examStarted) return;
    let violationCount = 0;
    let warned = false;

    const handleVisibility = () => {
      if (document.hidden) {
        violationCount++;
        violationCount === 1 ? onFirstViolation() : onSecondViolation();
      }
    };
    const handleFullscreen = () => {
      if (!document.fullscreenElement) {
        violationCount++;
        violationCount === 1 ? onFirstViolation() : onSecondViolation();
      }
    };
    const handleKeydown = (e) => {
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && ['I', 'J', 'C', 'U'].includes(e.key.toUpperCase()))
      ) {
        violationCount++;
        violationCount === 1 ? onFirstViolation() : onSecondViolation();
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
  }, [examStarted, onFirstViolation, onSecondViolation]);
} 