"use client";

import { useState, useEffect, useCallback, useRef } from "react";

type Mode = "work" | "break";

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

export default function PomodoroTimer() {
  const [mode, setMode] = useState<Mode>("work");
  const [workMinutes, setWorkMinutes] = useState(25);
  const [breakMinutes, setBreakMinutes] = useState(5);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [completedPomodoros, setCompletedPomodoros] = useState(0);
  const [label, setLabel] = useState("");

  // Settings popup
  const [showSettings, setShowSettings] = useState(false);
  const [draftWork, setDraftWork] = useState("25");
  const [draftBreak, setDraftBreak] = useState("5");
  const [draftLabel, setDraftLabel] = useState("");

  // Confirmation dialog
  const [showConfirm, setShowConfirm] = useState(false);
  const pendingActionRef = useRef<(() => void) | null>(null);
  const wasRunningRef = useRef(false);

  const currentMinutes = mode === "work" ? workMinutes : breakMinutes;

  // --- Confirmation helpers ---
  function requestConfirm(action: () => void) {
    pendingActionRef.current = action;
    wasRunningRef.current = isRunning;
    setIsRunning(false);
    setShowConfirm(true);
  }

  function confirmPending() {
    pendingActionRef.current?.();
    pendingActionRef.current = null;
    setShowConfirm(false);
  }

  function cancelPending() {
    pendingActionRef.current = null;
    if (wasRunningRef.current) setIsRunning(true);
    setShowConfirm(false);
  }

  // --- Mode switching ---
  const resetToIdle = useCallback(
    (newMode: Mode) => {
      setMode(newMode);
      setTimeLeft(newMode === "work" ? workMinutes * 60 : breakMinutes * 60);
      setIsRunning(false);
      setHasStarted(false);
    },
    [workMinutes, breakMinutes],
  );

  const autoSwitchMode = useCallback(() => {
    if (mode === "work") {
      setCompletedPomodoros((prev) => prev + 1);
      setMode("break");
      setTimeLeft(breakMinutes * 60);
    } else {
      setMode("work");
      setTimeLeft(workMinutes * 60);
    }
    setIsRunning(false);
    setHasStarted(false);
  }, [mode, workMinutes, breakMinutes]);

  // --- Timer tick ---
  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          autoSwitchMode();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning, autoSwitchMode]);

  // --- Settings popup ---
  function openSettings() {
    if (hasStarted) return;
    setDraftWork(String(workMinutes));
    setDraftBreak(String(breakMinutes));
    setDraftLabel(label);
    setShowSettings(true);
  }

  function saveSettings() {
    const parsedWork = parseInt(draftWork, 10);
    const parsedBreak = parseInt(draftBreak, 10);

    const newWork = !isNaN(parsedWork) ? clamp(parsedWork, 1, 180) : workMinutes;
    const newBreak = !isNaN(parsedBreak) ? clamp(parsedBreak, 1, 60) : breakMinutes;

    setWorkMinutes(newWork);
    setBreakMinutes(newBreak);
    setLabel(draftLabel.trim());
    setTimeLeft(mode === "work" ? newWork * 60 : newBreak * 60);
    setShowSettings(false);
  }

  function cancelSettings() {
    setShowSettings(false);
  }

  // --- Actions ---
  function handleStart() {
    setIsRunning(true);
    setHasStarted(true);
  }

  function handlePause() {
    setIsRunning(false);
  }

  function handleResume() {
    setIsRunning(true);
  }

  function handleGiveUp() {
    requestConfirm(() => resetToIdle(mode));
  }

  // --- Derived ---
  const totalSeconds = currentMinutes * 60;
  const progress = hasStarted ? 1 - timeLeft / totalSeconds : 0;
  const circumference = 2 * Math.PI * 120;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Timer circle */}
      <div className="relative flex items-center justify-center">
        <svg width="280" height="280" className="-rotate-90">
          <circle
            cx="140"
            cy="140"
            r="120"
            fill="none"
            stroke="currentColor"
            strokeWidth="6"
            className="text-zinc-200 dark:text-zinc-800"
          />
          <circle
            cx="140"
            cy="140"
            r="120"
            fill="none"
            strokeWidth="6"
            strokeLinecap="round"
            className={mode === "work" ? "text-red-500" : "text-emerald-500"}
            stroke="currentColor"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{ transition: "stroke-dashoffset 0.5s ease" }}
          />
        </svg>

        <div className="absolute flex flex-col items-center">
          {!hasStarted ? (
            /* Idle: click duration to open settings popup */
            <div className="flex flex-col items-center">
              <button
                onClick={openSettings}
                className="text-6xl font-mono font-bold tracking-wider text-zinc-900 transition-colors hover:text-zinc-600 dark:text-zinc-100 dark:hover:text-zinc-300"
                title="Klik untuk atur durasi & label"
              >
                {currentMinutes}
              </button>
              <span className="text-sm text-zinc-400">
                {mode === "work" ? "menit fokus" : "menit istirahat"}
              </span>
              {label && (
                <span className="mt-1 max-w-[200px] truncate text-xs text-zinc-500 dark:text-zinc-400">
                  {label}
                </span>
              )}
            </div>
          ) : (
            /* Running / Paused: countdown + label replaces mode text */
            <div className="flex flex-col items-center">
              <span className="text-6xl font-mono font-bold tracking-wider text-zinc-900 dark:text-zinc-100">
                {formatTime(timeLeft)}
              </span>
              <span className="mt-2 text-sm font-medium uppercase tracking-widest text-zinc-400">
                {label || (mode === "work" ? "Fokus" : "Istirahat")}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4">
        {!hasStarted ? (
          <button
            onClick={handleStart}
            className={`flex h-16 w-16 items-center justify-center rounded-full text-white transition-colors ${
              mode === "work"
                ? "bg-red-500 hover:bg-red-600"
                : "bg-emerald-500 hover:bg-emerald-600"
            }`}
            aria-label="Mulai"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <polygon points="6,4 20,12 6,20" />
            </svg>
          </button>
        ) : isRunning ? (
          <>
            <button
              onClick={handleGiveUp}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-200 text-zinc-600 transition-colors hover:bg-red-100 hover:text-red-500 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-red-900/30 dark:hover:text-red-400"
              aria-label="Menyerah"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <button
              onClick={handlePause}
              className={`flex h-16 w-16 items-center justify-center rounded-full text-white transition-colors ${
                mode === "work"
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-emerald-500 hover:bg-emerald-600"
              }`}
              aria-label="Jeda"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleGiveUp}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-200 text-zinc-600 transition-colors hover:bg-red-100 hover:text-red-500 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-red-900/30 dark:hover:text-red-400"
              aria-label="Menyerah"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <button
              onClick={handleResume}
              className={`flex h-16 w-16 items-center justify-center rounded-full text-white transition-colors ${
                mode === "work"
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-emerald-500 hover:bg-emerald-600"
              }`}
              aria-label="Lanjut"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="6,4 20,12 6,20" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Completed count */}
      <div className="text-sm text-zinc-400">
        Pomodoro selesai:{" "}
        <span className="font-mono font-bold text-zinc-600 dark:text-zinc-300">
          {completedPomodoros}
        </span>
      </div>

      {/* Settings popup */}
      {showSettings && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="mx-4 w-full max-w-xs rounded-2xl bg-white p-6 shadow-xl dark:bg-zinc-900">
            <h3 className="mb-5 text-lg font-bold text-zinc-900 dark:text-zinc-100">
              Pengaturan Sesi
            </h3>

            <div className="flex flex-col gap-4">
              <div>
                <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-zinc-400">
                  Durasi Fokus (menit)
                </label>
                <input
                  type="number"
                  min={1}
                  max={180}
                  value={draftWork}
                  onChange={(e) => setDraftWork(e.target.value)}
                  className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2.5 text-center font-mono text-lg font-bold text-zinc-900 outline-none focus:border-red-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:focus:border-red-500 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-zinc-400">
                  Durasi Istirahat (menit)
                </label>
                <input
                  type="number"
                  min={1}
                  max={60}
                  value={draftBreak}
                  onChange={(e) => setDraftBreak(e.target.value)}
                  className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2.5 text-center font-mono text-lg font-bold text-zinc-900 outline-none focus:border-emerald-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:focus:border-emerald-500 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-zinc-400">
                  Label (opsional)
                </label>
                <input
                  type="text"
                  value={draftLabel}
                  onChange={(e) => setDraftLabel(e.target.value)}
                  placeholder="Sedang mengerjakan apa?"
                  maxLength={50}
                  className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2.5 text-center text-sm text-zinc-700 outline-none placeholder:text-zinc-400 focus:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:placeholder:text-zinc-500 dark:focus:border-zinc-500"
                />
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={cancelSettings}
                className="flex-1 rounded-lg bg-zinc-100 px-4 py-2.5 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
              >
                Batal
              </button>
              <button
                onClick={saveSettings}
                className="flex-1 rounded-lg bg-red-500 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-red-600"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation dialog */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="mx-4 w-full max-w-xs rounded-2xl bg-white p-6 shadow-xl dark:bg-zinc-900">
            <h3 className="mb-2 text-lg font-bold text-zinc-900 dark:text-zinc-100">
              Yakin mau berhenti?
            </h3>
            <p className="mb-5 text-sm text-zinc-500 dark:text-zinc-400">
              Progress sesi ini akan hilang dan tidak bisa dikembalikan.
            </p>
            <div className="flex gap-3">
              <button
                onClick={cancelPending}
                className="flex-1 rounded-lg bg-zinc-100 px-4 py-2.5 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
              >
                Lanjutkan
              </button>
              <button
                onClick={confirmPending}
                className="flex-1 rounded-lg bg-red-500 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-red-600"
              >
                Menyerah
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
