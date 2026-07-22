"use client";

import { useTimer } from "@/app/lib/timer-context";
import { Play, Pause, RotateCcw, SkipForward, Sparkles, Flame, Clock } from "lucide-react";
import SkillSelector from "@/app/components/timer/skill-selector";
import AmbientSoundSelector from "@/app/components/timer/ambient-sound";
import TimerDurationPicker from "@/app/components/timer/timer-duration-picker";

export default function PomodoroTimer() {
  const {
    status,
    sessionType,
    duration,
    breakDuration,
    timeLeft,
    currentTitle,
    selectedSkill,
    setCurrentTitle,
    startTimer,
    pauseTimer,
    resetTimer,
    skipSession,
  } = useTimer();

  const totalSec = sessionType === "focus" ? duration : breakDuration;
  const progress = totalSec > 0 ? (totalSec - timeLeft) / totalSec : 0;
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeFormatted = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  // SVG Ring calculation
  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - progress * circumference;

  return (
    <div className="flex flex-col items-center w-full space-y-6">
      {/* Top Session Title Input & Mode Badge */}
      <div className="flex flex-col items-center gap-2 w-full max-w-md">
        <div className="flex items-center gap-2">
          <span
            className={`rounded-full px-3 py-1 text-xs font-extrabold uppercase tracking-wider ${
              sessionType === "focus"
                ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300"
                : "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
            }`}
          >
            {sessionType === "focus" ? "🎯 DEEP WORK FOCUS" : "☕ REST BREAK"}
          </span>
        </div>

        <input
          type="text"
          value={currentTitle}
          onChange={(e) => setCurrentTitle(e.target.value)}
          placeholder="What is your primary focus objective?"
          className="w-full text-center text-sm font-semibold text-zinc-900 placeholder:text-zinc-400 bg-transparent border-b border-transparent hover:border-zinc-300 focus:border-indigo-500 focus:outline-none py-1 dark:text-zinc-100 dark:placeholder:text-zinc-500"
        />
      </div>

      {/* SVG Countdown Ring Display */}
      <div className="relative flex items-center justify-center my-2">
        <svg width="280" height="280" className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx="140"
            cy="140"
            r={radius}
            className="stroke-zinc-100 dark:stroke-zinc-800"
            strokeWidth="12"
            fill="transparent"
          />
          {/* Progress circle */}
          <circle
            cx="140"
            cy="140"
            r={radius}
            className={`transition-all duration-500 ease-out ${
              sessionType === "focus"
                ? "stroke-indigo-600 dark:stroke-indigo-500"
                : "stroke-emerald-500"
            }`}
            strokeWidth="12"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>

        {/* Center Countdown Display */}
        <div className="absolute flex flex-col items-center text-center">
          <span className="text-4xl font-extrabold font-mono tracking-tight text-zinc-900 dark:text-zinc-100">
            {timeFormatted}
          </span>
          <span className="mt-1 flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400">
            <span>{selectedSkill.icon}</span>
            <span>{selectedSkill.name}</span>
          </span>
        </div>
      </div>

      {/* Controls Deck */}
      <div className="flex items-center gap-4">
        {status === "running" ? (
          <button
            onClick={pauseTimer}
            className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500 text-white shadow-lg shadow-amber-500/30 hover:bg-amber-600 transition-all active:scale-95"
            title="Pause"
          >
            <Pause className="h-6 w-6" />
          </button>
        ) : (
          <button
            onClick={startTimer}
            className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-700 transition-all active:scale-95"
            title="Start"
          >
            <Play className="h-6 w-6 ml-0.5" />
          </button>
        )}

        <button
          onClick={resetTimer}
          className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700 transition-all active:scale-95"
          title="Reset"
        >
          <RotateCcw className="h-5 w-5" />
        </button>

        <button
          onClick={skipSession}
          className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700 transition-all active:scale-95"
          title="Skip"
        >
          <SkipForward className="h-5 w-5" />
        </button>
      </div>

      {/* Advanced Control Widgets */}
      <div className="w-full space-y-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
        <TimerDurationPicker />
        <SkillSelector />
        <AmbientSoundSelector />
      </div>
    </div>
  );
}
