"use client";

import { useTimer } from "@/app/lib/timer-context";
import { Clock, Zap, Target, Flame } from "lucide-react";

const DURATION_PRESETS = [
  { label: "15m Express", focusMin: 15, breakMin: 3, icon: Zap },
  { label: "25m Standard", focusMin: 25, breakMin: 5, icon: Clock },
  { label: "45m Deep Work", focusMin: 45, breakMin: 10, icon: Target },
  { label: "90m Flow State", focusMin: 90, breakMin: 15, icon: Flame },
];

export default function TimerDurationPicker() {
  const { duration, setDuration, status } = useTimer();

  return (
    <div className="space-y-2">
      <label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 block uppercase tracking-wider">
        Duration Presets
      </label>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {DURATION_PRESETS.map((preset) => {
          const Icon = preset.icon;
          const isSelected = duration === preset.focusMin * 60;
          return (
            <button
              key={preset.focusMin}
              disabled={status === "running"}
              onClick={() => setDuration(preset.focusMin * 60, preset.breakMin * 60)}
              className={`flex items-center justify-center gap-2 rounded-xl p-2.5 text-xs font-bold transition-all ${
                isSelected
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-600/30 scale-105"
                  : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{preset.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
