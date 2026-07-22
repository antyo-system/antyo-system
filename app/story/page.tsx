"use client";

import { useState, useEffect } from "react";
import { getJournalEntries, addJournalEntry } from "@/app/lib/storage";
import { JournalEntry } from "@/app/lib/types";
import { BookOpen, Sparkles, Plus, Tag, Heart, MessageSquare, Brain } from "lucide-react";
import AIChatbot from "@/app/components/ai-chatbot";

export default function StoryPage() {
  const [journals, setJournals] = useState<JournalEntry[]>([]);
  const [showModal, setShowModal] = useState(false);

  // Form state
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState<JournalEntry["tag"]>("reflection");
  const [emoji, setEmoji] = useState("🚀");

  useEffect(() => {
    setJournals(getJournalEntries());
  }, []);

  const handleCreateEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const created = addJournalEntry({
      date: new Date().toISOString().slice(0, 10),
      title,
      content,
      tag,
      moodEmoji: emoji,
    });

    setJournals([created, ...journals]);
    setTitle("");
    setContent("");
    setShowModal(false);
  };

  return (
    <div className="space-y-6 bg-zinc-950 text-zinc-100 min-h-screen p-1">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-white">
            Story & AI Companions OS
          </h1>
          <p className="text-xs text-zinc-400 font-mono">
            Personal life reflection, milestone journaling, and interactive dialogue with Azul & Azel.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 rounded-2xl bg-purple-600 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-purple-600/30 hover:bg-purple-700"
        >
          <Plus className="h-4 w-4" />
          <span>Write Reflection</span>
        </button>
      </div>

      {/* Main Grid: Story Entries & Dedicated AI Chatbot */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Story Journal Feed */}
        <div className="lg:col-span-7 space-y-4">
          <h2 className="text-base font-bold text-white">
            Life Reflections & Daily Wins
          </h2>

          <div className="space-y-4">
            {journals.map((j) => (
              <div
                key={j.id}
                className="rounded-3xl border border-indigo-500/20 bg-zinc-900/90 p-6 shadow-xl space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">{j.moodEmoji || "✨"}</span>
                    <div>
                      <h3 className="text-sm font-bold text-white">
                        {j.title}
                      </h3>
                      <span className="text-[10px] text-zinc-400 font-mono">{j.date}</span>
                    </div>
                  </div>

                  <span className="rounded-full bg-purple-950/80 border border-purple-500/30 px-3 py-1 text-[10px] font-bold uppercase text-purple-300">
                    {j.tag}
                  </span>
                </div>

                <p className="text-xs leading-relaxed text-zinc-300">
                  {j.content}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* AI Companions Interactive Chatbot */}
        <div className="lg:col-span-5 flex flex-col space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-indigo-400 animate-pulse" />
            <span>Interactive AI Companions</span>
          </h2>
          <AIChatbot />
        </div>
      </div>

      {/* Add Journal Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-in fade-in">
          <form
            onSubmit={handleCreateEntry}
            className="w-full max-w-md space-y-4 rounded-3xl border border-purple-500/30 bg-zinc-900 p-6 shadow-2xl"
          >
            <h3 className="text-base font-bold text-white">
              Write Story & Journal Entry
            </h3>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-300">
                Title / Theme
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Completed ANTYO ERP Game System Design"
                className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 p-2.5 text-xs text-white focus:border-purple-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-300">
                  Tag Category
                </label>
                <select
                  value={tag}
                  onChange={(e) => setTag(e.target.value as any)}
                  className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 p-2.5 text-xs text-white focus:outline-none"
                >
                  <option value="reflection">Reflection</option>
                  <option value="win">Major Win</option>
                  <option value="gratitude">Gratitude</option>
                  <option value="challenge">Challenge</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-300">
                  Mood Emoji
                </label>
                <input
                  type="text"
                  value={emoji}
                  onChange={(e) => setEmoji(e.target.value)}
                  placeholder="e.g. 🚀, 🧠, 🌊"
                  className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 p-2.5 text-xs text-white focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-300">
                Journal Reflection Content
              </label>
              <textarea
                required
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your detailed thoughts, reflections, and insights..."
                className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 p-2.5 text-xs text-white focus:outline-none"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="rounded-xl px-4 py-2 text-xs font-semibold text-zinc-400 hover:bg-zinc-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-xl bg-purple-600 px-4 py-2 text-xs font-bold text-white hover:bg-purple-700 shadow-md"
              >
                Save Story Entry
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
