"use client";

import { useState, useEffect } from "react";
import { Search, Plus, Bell, ShieldAlert, Sparkles, X } from "lucide-react";
import { getSabbathState } from "@/app/lib/storage";
import { SabbathState } from "@/app/lib/types";

export default function Header() {
  const [sabbath, setSabbath] = useState<SabbathState>({
    enabled: false,
    pausedDomains: { time: false, finance: false, health: false, relationship: false, story: false },
  });

  const [currentDateString, setCurrentDateString] = useState("");
  const [quickLogOpen, setQuickLogOpen] = useState(false);

  useEffect(() => {
    setSabbath(getSabbathState());

    const now = new Date();
    setCurrentDateString(
      now.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    );
  }, []);

  return (
    <>
      <header className="flex h-16 w-full items-center justify-between border-b border-zinc-200 bg-white/80 px-6 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/80">
        {/* Left: Date & Status */}
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              System Active
            </span>
            <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
              {currentDateString || "Today"}
            </span>
          </div>

          {sabbath.enabled && (
            <div className="flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800 dark:border-amber-800 dark:bg-amber-950/50 dark:text-amber-300">
              <ShieldAlert className="h-3.5 w-3.5" />
              <span>Sabbath Active</span>
            </div>
          )}
        </div>

        {/* Center: Global Search Bar */}
        <div className="relative hidden max-w-md flex-1 md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400 dark:text-zinc-500" />
          <input
            type="text"
            placeholder="Search signals, tasks, transactions, contacts, story..."
            className="w-full rounded-xl border border-zinc-200 bg-zinc-50 py-2 pl-9 pr-4 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:bg-zinc-950"
          />
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setQuickLogOpen(true)}
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-3.5 py-2 text-xs font-semibold text-white shadow-md shadow-indigo-600/20 transition-transform hover:bg-indigo-700 active:scale-95"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Log Signal</span>
          </button>

          <div className="h-6 w-px bg-zinc-200 dark:bg-zinc-800" />

          {/* User Profile avatar */}
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 font-semibold text-white text-xs shadow-md">
              AN
            </div>
          </div>
        </div>
      </header>

      {/* Quick Log Signal Modal */}
      {quickLogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-6 shadow-2xl dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-100 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  Quick Signal Entry
                </h3>
              </div>
              <button
                onClick={() => setQuickLogOpen(false)}
                className="rounded-lg p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="py-3 text-xs text-zinc-500 dark:text-zinc-400">
              Select a domain module to record your latest life entry:
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <a
                href="/focus"
                className="flex flex-col gap-1 rounded-xl border border-zinc-200 p-3 hover:border-indigo-500 hover:bg-indigo-50/50 dark:border-zinc-800 dark:hover:bg-indigo-950/30"
              >
                <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">⏱️ Focus Task</span>
                <span className="text-[10px] text-zinc-500">Log work or start Pomodoro</span>
              </a>

              <a
                href="/finance"
                className="flex flex-col gap-1 rounded-xl border border-zinc-200 p-3 hover:border-emerald-500 hover:bg-emerald-50/50 dark:border-zinc-800 dark:hover:bg-emerald-950/30"
              >
                <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">💰 Transaction</span>
                <span className="text-[10px] text-zinc-500">Log income or expense</span>
              </a>

              <a
                href="/health"
                className="flex flex-col gap-1 rounded-xl border border-zinc-200 p-3 hover:border-blue-500 hover:bg-blue-50/50 dark:border-zinc-800 dark:hover:bg-blue-950/30"
              >
                <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">💧 Health Metric</span>
                <span className="text-[10px] text-zinc-500">Record water, sleep, workout</span>
              </a>

              <a
                href="/story"
                className="flex flex-col gap-1 rounded-xl border border-zinc-200 p-3 hover:border-purple-500 hover:bg-purple-50/50 dark:border-zinc-800 dark:hover:bg-purple-950/30"
              >
                <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">📖 Story Journal</span>
                <span className="text-[10px] text-zinc-500">Write micro-reflection</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
