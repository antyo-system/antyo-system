"use client";

import { useState, useEffect } from "react";
import { Search, Plus, Bell, ShieldAlert, Sparkles, X, Terminal } from "lucide-react";
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
      <header className="flex h-16 w-full items-center justify-between border-b border-indigo-500/20 bg-zinc-950/90 px-6 backdrop-blur-md text-zinc-100">
        {/* Left: Date & Status */}
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-400">
              SYSTEM ACTIVE • HUD v2.0
            </span>
            <span className="text-xs font-bold text-white">
              {currentDateString || "Today"}
            </span>
          </div>

          {sabbath.enabled && (
            <div className="flex items-center gap-1.5 rounded-full border border-amber-500/50 bg-amber-950/60 px-3 py-0.5 text-xs font-bold text-amber-300">
              <ShieldAlert className="h-3.5 w-3.5" />
              <span>Sabbath Active</span>
            </div>
          )}
        </div>

        {/* Center: Global Search Bar */}
        <div className="relative hidden max-w-md flex-1 md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            placeholder="Search signals, tasks, transactions, contacts, story..."
            className="w-full rounded-2xl border border-zinc-800 bg-zinc-900/80 py-2 pl-9 pr-4 text-xs text-white placeholder:text-zinc-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setQuickLogOpen(true)}
            className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 px-3.5 py-2 text-xs font-bold text-white shadow-lg shadow-indigo-600/30 hover:brightness-110 active:scale-95 transition-all"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Log Signal</span>
          </button>

          <div className="h-6 w-px bg-zinc-800" />

          {/* User Profile avatar */}
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 font-black text-white text-xs shadow-md shadow-indigo-500/30">
              AN
            </div>
          </div>
        </div>
      </header>

      {/* Quick Log Signal Modal */}
      {quickLogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-in fade-in">
          <div className="w-full max-w-md rounded-3xl border border-indigo-500/30 bg-zinc-900 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-indigo-400 animate-pulse" />
                <h3 className="text-sm font-extrabold text-white">
                  Quick Signal Entry
                </h3>
              </div>
              <button
                onClick={() => setQuickLogOpen(false)}
                className="rounded-lg p-1 text-zinc-400 hover:bg-zinc-800 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="text-xs text-zinc-400">
              Select a domain module to record your latest life entry:
            </p>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <a
                href="/focus"
                className="flex flex-col gap-1 rounded-2xl border border-indigo-500/30 bg-zinc-950 p-3.5 hover:border-indigo-400 hover:bg-indigo-950/40 transition-all"
              >
                <span className="text-xs font-bold text-white">⏱️ Focus Task</span>
                <span className="text-[10px] text-zinc-400">Log work or start Pomodoro</span>
              </a>

              <a
                href="/finance"
                className="flex flex-col gap-1 rounded-2xl border border-emerald-500/30 bg-zinc-950 p-3.5 hover:border-emerald-400 hover:bg-emerald-950/40 transition-all"
              >
                <span className="text-xs font-bold text-white">💰 Transaction</span>
                <span className="text-[10px] text-zinc-400">Log income or expense</span>
              </a>

              <a
                href="/health"
                className="flex flex-col gap-1 rounded-2xl border border-blue-500/30 bg-zinc-950 p-3.5 hover:border-blue-400 hover:bg-blue-950/40 transition-all"
              >
                <span className="text-xs font-bold text-white">💧 Health Metric</span>
                <span className="text-[10px] text-zinc-400">Record water, sleep, workout</span>
              </a>

              <a
                href="/story"
                className="flex flex-col gap-1 rounded-2xl border border-purple-500/30 bg-zinc-950 p-3.5 hover:border-purple-400 hover:bg-purple-950/40 transition-all"
              >
                <span className="text-xs font-bold text-white">📖 Story Journal</span>
                <span className="text-[10px] text-zinc-400">Write micro-reflection</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
