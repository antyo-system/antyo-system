"use client";

import { useState, useEffect } from "react";
import { getJournalEntries, addJournalEntry, getAIMessages } from "@/app/lib/storage";
import { JournalEntry, AIMessage } from "@/app/lib/types";
import { BookOpen, Sparkles, Plus, Tag, Heart, MessageSquare, Brain, Send } from "lucide-react";

export default function StoryPage() {
  const [journals, setJournals] = useState<JournalEntry[]>([]);
  const [aiMessages, setAiMessages] = useState<AIMessage[]>([]);
  const [showModal, setShowModal] = useState(false);

  // Form state
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState<JournalEntry["tag"]>("reflection");
  const [emoji, setEmoji] = useState("🚀");

  // AI Dialogue Interactive Input
  const [userQuery, setUserQuery] = useState("");
  const [selectedCompanion, setSelectedCompanion] = useState<"azul" | "azel">("azul");

  useEffect(() => {
    setJournals(getJournalEntries());
    setAiMessages(getAIMessages());
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

  const handleAskAI = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userQuery.trim()) return;

    const replyMessage =
      selectedCompanion === "azul"
        ? `[AZUL STRATEGY] Analyzed "${userQuery}". Recommendation: Break this focus area into 3 distinct 25-minute pomodoro blocks and review after execution.`
        : `[AZEL MINDFULNESS] Reflecting on "${userQuery}". You are making consistent progress. Remember to breathe and keep your daily streak sustainable.`;

    const newAIMessage: AIMessage = {
      id: `aim-${Date.now()}`,
      companion: selectedCompanion,
      message: replyMessage,
      timestamp: "Just now",
      category: selectedCompanion === "azul" ? "strategy" : "mindfulness",
    };

    setAiMessages([newAIMessage, ...aiMessages]);
    setUserQuery("");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">
            Story & AI Companions OS
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Personal life reflection, milestone journaling, and guidance from Azul & Azel.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 rounded-xl bg-purple-600 px-4 py-2.5 text-xs font-semibold text-white shadow-md hover:bg-purple-700"
        >
          <Plus className="h-4 w-4" />
          <span>Write Reflection</span>
        </button>
      </div>

      {/* Main Grid: Story Entries & AI Dialogue */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Story Journal Feed */}
        <div className="lg:col-span-7 space-y-4">
          <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
            Life Reflections & Daily Wins
          </h2>

          <div className="space-y-4">
            {journals.map((j) => (
              <div
                key={j.id}
                className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">{j.moodEmoji || "✨"}</span>
                    <div>
                      <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                        {j.title}
                      </h3>
                      <span className="text-[10px] text-zinc-400">{j.date}</span>
                    </div>
                  </div>

                  <span className="rounded-full bg-purple-50 px-3 py-1 text-[10px] font-semibold uppercase text-purple-600 dark:bg-purple-950/60 dark:text-purple-300">
                    {j.tag}
                  </span>
                </div>

                <p className="text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
                  {j.content}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* AI Companions Interactive Hub */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-3xl border border-indigo-200 bg-indigo-50/40 p-6 dark:border-indigo-900/50 dark:bg-indigo-950/30 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                  AI Companion Dialogue
                </h3>
              </div>

              {/* Companion selector pill */}
              <div className="flex rounded-xl bg-white/80 p-1 backdrop-blur-md dark:bg-zinc-900">
                <button
                  type="button"
                  onClick={() => setSelectedCompanion("azul")}
                  className={`rounded-lg px-2.5 py-1 text-[11px] font-bold transition-colors ${
                    selectedCompanion === "azul"
                      ? "bg-indigo-600 text-white"
                      : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
                  }`}
                >
                  Azul (Strategy)
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedCompanion("azel")}
                  className={`rounded-lg px-2.5 py-1 text-[11px] font-bold transition-colors ${
                    selectedCompanion === "azel"
                      ? "bg-pink-600 text-white"
                      : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
                  }`}
                >
                  Azel (Empathy)
                </button>
              </div>
            </div>

            {/* AI Messages History */}
            <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
              {aiMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`rounded-2xl p-4 text-xs leading-relaxed ${
                    msg.companion === "azul"
                      ? "border border-indigo-200 bg-white text-zinc-800 dark:border-indigo-900/60 dark:bg-zinc-900 dark:text-zinc-200"
                      : "border border-pink-200 bg-white text-zinc-800 dark:border-pink-900/60 dark:bg-zinc-900 dark:text-zinc-200"
                  }`}
                >
                  <div className="flex items-center justify-between pb-1.5 border-b border-zinc-100 dark:border-zinc-800 mb-2">
                    <span
                      className={`font-bold uppercase text-[10px] ${
                        msg.companion === "azul"
                          ? "text-indigo-600 dark:text-indigo-400"
                          : "text-pink-600 dark:text-pink-400"
                      }`}
                    >
                      {msg.companion === "azul" ? "Azul • Strategy" : "Azel • Mindful"}
                    </span>
                    <span className="text-[9px] text-zinc-400">{msg.timestamp}</span>
                  </div>
                  <p>{msg.message}</p>
                </div>
              ))}
            </div>

            {/* Interactive Query Input Form */}
            <form onSubmit={handleAskAI} className="relative">
              <input
                type="text"
                value={userQuery}
                onChange={(e) => setUserQuery(e.target.value)}
                placeholder={`Ask ${selectedCompanion === "azul" ? "Azul for strategy..." : "Azel for mindful insight..."}`}
                className="w-full rounded-2xl border border-zinc-200 bg-white py-3 pl-4 pr-10 text-xs text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl bg-indigo-600 p-2 text-white hover:bg-indigo-700"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Add Journal Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <form
            onSubmit={handleCreateEntry}
            className="w-full max-w-md space-y-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-xl dark:border-zinc-800 dark:bg-zinc-900"
          >
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
              Write Story & Journal Entry
            </h3>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                Title / Theme
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Completed ANTYO ERP System Launch"
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 p-2.5 text-xs text-zinc-900 focus:outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  Tag Category
                </label>
                <select
                  value={tag}
                  onChange={(e) => setTag(e.target.value as any)}
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50 p-2.5 text-xs text-zinc-900 focus:outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
                >
                  <option value="reflection">Reflection</option>
                  <option value="win">Major Win</option>
                  <option value="gratitude">Gratitude</option>
                  <option value="challenge">Challenge</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  Mood Emoji
                </label>
                <input
                  type="text"
                  value={emoji}
                  onChange={(e) => setEmoji(e.target.value)}
                  placeholder="e.g. 🚀, 🧠, 🌊"
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50 p-2.5 text-xs text-zinc-900 focus:outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                Journal Reflection Content
              </label>
              <textarea
                required
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your detailed thoughts, reflections, and insights..."
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 p-2.5 text-xs text-zinc-900 focus:outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="rounded-xl px-4 py-2 text-xs font-semibold text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-xl bg-purple-600 px-4 py-2 text-xs font-semibold text-white hover:bg-purple-700"
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
