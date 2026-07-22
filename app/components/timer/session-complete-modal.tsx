"use client";

import { useState } from "react";
import { useTimer } from "@/app/lib/timer-context";
import { Sparkles, Trophy, Flame, Check, X } from "lucide-react";
import { addJournalEntry } from "@/app/lib/storage";

export default function SessionCompleteModal() {
  const { showCompleteOverlay, lastCompletedSession, closeCompleteOverlay } = useTimer();
  const [reflectionNote, setReflectionNote] = useState("");
  const [saved, setSaved] = useState(false);

  if (!showCompleteOverlay || !lastCompletedSession) return null;

  const handleSaveReflection = (e: React.FormEvent) => {
    e.preventDefault();
    if (reflectionNote.trim()) {
      addJournalEntry({
        date: new Date().toISOString().slice(0, 10),
        title: `Completed Focus Session: ${lastCompletedSession.title}`,
        content: reflectionNote,
        tag: "win",
        moodEmoji: "🚀",
      });
    }
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      setReflectionNote("");
      closeCompleteOverlay();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-in fade-in">
      <div className="w-full max-w-md rounded-3xl border border-indigo-500/30 bg-zinc-900 p-6 text-white shadow-2xl space-y-5">
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="h-6 w-6 text-amber-400" />
            <h3 className="text-base font-extrabold tracking-wide text-zinc-100 uppercase">
              Focus Session Complete!
            </h3>
          </div>
          <button
            onClick={closeCompleteOverlay}
            className="rounded-lg p-1 text-zinc-400 hover:bg-zinc-800 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* XP Badge Banner */}
        <div className="flex items-center justify-between rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-4 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 text-xl backdrop-blur-md">
              {lastCompletedSession.skill.icon}
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">
                {lastCompletedSession.title}
              </h4>
              <span className="text-[11px] text-indigo-100">
                {lastCompletedSession.durationMinutes} Minutes Deep Work
              </span>
            </div>
          </div>

          <div className="flex flex-col items-end">
            <span className="text-xl font-black text-amber-300">
              +{lastCompletedSession.xpEarned} XP
            </span>
            <span className="text-[10px] text-indigo-100 font-semibold">Earned</span>
          </div>
        </div>

        {/* Reflection Form */}
        <form onSubmit={handleSaveReflection} className="space-y-3">
          <label className="text-xs font-bold text-zinc-300 block">
            Record Session Reflection Note
          </label>
          <textarea
            rows={3}
            value={reflectionNote}
            onChange={(e) => setReflectionNote(e.target.value)}
            placeholder="What did you achieve during this focus block? (Saved automatically to Story Journal)"
            className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 p-3 text-xs text-zinc-100 placeholder:text-zinc-500 focus:border-indigo-500 focus:outline-none"
          />

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={closeCompleteOverlay}
              className="rounded-xl px-4 py-2 text-xs font-semibold text-zinc-400 hover:bg-zinc-800"
            >
              Skip Note
            </button>
            <button
              type="submit"
              disabled={saved}
              className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-700 shadow-md"
            >
              {saved ? (
                <>
                  <Check className="h-4 w-4 text-emerald-400" />
                  <span>Saved to Story!</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  <span>Save to Story Journal</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
