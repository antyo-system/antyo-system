"use client";

import { useTimer } from "@/app/lib/timer-context";
import { Play, Pause, SkipForward, Maximize2, Sparkles, Volume2 } from "lucide-react";
import Link from "next/link";

export default function FloatingMiniPlayer() {
  const {
    status,
    sessionType,
    timeLeft,
    currentTitle,
    selectedSkill,
    ambientSound,
    startTimer,
    pauseTimer,
    skipSession,
  } = useTimer();

  if (status === "idle") return null;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeFormatted = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  return (
    <div className="fixed bottom-5 right-5 z-40 flex items-center gap-3.5 rounded-2xl border border-indigo-500/30 bg-zinc-900/90 p-3.5 text-white shadow-2xl backdrop-blur-xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-4">
      {/* Skill & Title info */}
      <div className="flex items-center gap-2.5 border-r border-zinc-800 pr-3.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600/30 text-lg shadow-inner">
          {selectedSkill.icon}
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold tracking-wide text-zinc-100 truncate max-w-[120px]">
              {currentTitle || selectedSkill.name}
            </span>
            <span className="rounded-full bg-indigo-500/20 px-2 py-0.5 text-[9px] font-bold uppercase text-indigo-300">
              {sessionType}
            </span>
          </div>
          <span className="text-base font-extrabold font-mono text-amber-300 tracking-wider">
            {timeFormatted}
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2">
        {ambientSound !== "none" && (
          <span title={`Sound: ${ambientSound}`}>
            <Volume2 className="h-4 w-4 text-indigo-400 animate-pulse" />
          </span>
        )}

        {status === "running" ? (
          <button
            onClick={pauseTimer}
            className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 transition-all"
            title="Pause"
          >
            <Pause className="h-4 w-4" />
          </button>
        ) : (
          <button
            onClick={startTimer}
            className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md hover:bg-indigo-700 transition-all"
            title="Resume"
          >
            <Play className="h-4 w-4" />
          </button>
        )}

        <button
          onClick={skipSession}
          className="flex h-8 w-8 items-center justify-center rounded-xl bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white transition-all"
          title="Skip"
        >
          <SkipForward className="h-4 w-4" />
        </button>

        <Link
          href="/focus"
          className="flex h-8 w-8 items-center justify-center rounded-xl bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white transition-all"
          title="Open Focus Suite"
        >
          <Maximize2 className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
