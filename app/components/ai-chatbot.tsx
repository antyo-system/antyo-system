"use client";

import { useState } from "react";
import { Sparkles, Send, Bot, User, Brain, Heart, Zap, RefreshCw, X, MessageSquare } from "lucide-react";
import { addXP } from "@/app/lib/storage";

export interface ChatMessage {
  id: string;
  sender: "user" | "azul" | "azel";
  text: string;
  timestamp: string;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "msg-1",
    sender: "azul",
    text: "Operator, I am AZUL — your Strategic Life & Productivity Optimization Companion. What focus goal or cashflow target shall we optimize today?",
    timestamp: "10:00 AM",
  },
  {
    id: "msg-2",
    sender: "azel",
    text: "Welcome back! I am AZEL — your Mindfulness & Emotional Sustainability Companion. Remember to take deep breaths between sessions. How are you feeling today?",
    timestamp: "10:01 AM",
  },
];

export default function AIChatbot() {
  const [activeCompanion, setActiveCompanion] = useState<"azul" | "azel">("azul");
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userText = input.trim();
    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: "user",
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);
    addXP(10); // Reward XP for AI consultation

    // Simulate intelligent AI companion response
    setTimeout(() => {
      let aiReply = "";
      if (activeCompanion === "azul") {
        if (userText.toLowerCase().includes("focus") || userText.toLowerCase().includes("time")) {
          aiReply = `[AZUL STRATEGY] To maximize cognitive throughput for "${userText}", schedule a 45-minute Deep Work block. Disable notification feeds and execute 1 priority task at a time.`;
        } else if (userText.toLowerCase().includes("money") || userText.toLowerCase().includes("finance")) {
          aiReply = `[AZUL FINANCE] Analyzing cashflow intent. Recommend capping 'Wants' category to 20% of net income and routing 30% directly to long-term Investment assets.`;
        } else {
          aiReply = `[AZUL SYSTEM] Roger that, Operator. Processed intent: "${userText}". Recommendation: Break this milestone down into 3 actionable tasks in Antyo Focus and execute immediately.`;
        }
      } else {
        if (userText.toLowerCase().includes("tired") || userText.toLowerCase().includes("stress") || userText.toLowerCase().includes("capek")) {
          aiReply = `[AZEL MINDFULNESS] I hear you. Rest is an essential part of sustainable performance. Take a 10-minute break, drink 500mL of water, and pause all screens. You're doing great!`;
        } else if (userText.toLowerCase().includes("happy") || userText.toLowerCase().includes("win")) {
          aiReply = `[AZEL CELEBRATION] Outstanding achievement! Celebrating your progress. Record this moment in your Story Journal to lock in the positive momentum!`;
        } else {
          aiReply = `[AZEL EMPATHY] Reflecting on "${userText}". Trust the process, maintain your daily streak, and remember that consistent small steps lead to extraordinary growth.`;
        }
      }

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: activeCompanion,
        text: aiReply,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 700);
  };

  const filteredMessages = messages.filter(
    (m) => m.sender === "user" || m.sender === activeCompanion
  );

  return (
    <div className="flex flex-col h-[520px] rounded-3xl border border-indigo-500/30 bg-zinc-900/90 shadow-2xl backdrop-blur-xl overflow-hidden">
      {/* HUD Header & Companion Switcher */}
      <div className="flex items-center justify-between border-b border-zinc-800 p-4 bg-zinc-950/80">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-xl font-black text-xs text-white shadow-lg ${
              activeCompanion === "azul"
                ? "bg-gradient-to-br from-indigo-500 to-cyan-500 shadow-indigo-500/30"
                : "bg-gradient-to-br from-pink-500 to-purple-500 shadow-pink-500/30"
            }`}
          >
            {activeCompanion === "azul" ? "AZ" : "AZ"}
          </div>

          <div>
            <h3 className="text-sm font-extrabold text-zinc-100 flex items-center gap-1.5">
              <span>{activeCompanion === "azul" ? "AZUL — Strategy AI" : "AZEL — Mindfulness AI"}</span>
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            </h3>
            <span className="text-[10px] text-zinc-400 font-mono">
              {activeCompanion === "azul" ? "Optimization Specialist" : "Empathy & Sustainability"}
            </span>
          </div>
        </div>

        {/* Companion Tab Switcher */}
        <div className="flex items-center gap-1.5 rounded-2xl bg-zinc-900 p-1 border border-zinc-800">
          <button
            type="button"
            onClick={() => setActiveCompanion("azul")}
            className={`flex items-center gap-1 rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
              activeCompanion === "azul"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <Brain className="h-3.5 w-3.5" />
            <span>Azul</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveCompanion("azel")}
            className={`flex items-center gap-1 rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
              activeCompanion === "azel"
                ? "bg-pink-600 text-white shadow-md shadow-pink-600/30"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <Heart className="h-3.5 w-3.5" />
            <span>Azel</span>
          </button>
        </div>
      </div>

      {/* Messages Feed */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-zinc-950/40">
        {filteredMessages.map((msg) => {
          const isUser = msg.sender === "user";
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 ${isUser ? "flex-row-reverse" : "flex-row"}`}
            >
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl font-bold text-xs text-white shadow-md ${
                  isUser
                    ? "bg-purple-600"
                    : msg.sender === "azul"
                    ? "bg-indigo-600"
                    : "bg-pink-600"
                }`}
              >
                {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
              </div>

              <div
                className={`max-w-[80%] rounded-2xl p-3 text-xs leading-relaxed shadow-sm ${
                  isUser
                    ? "bg-indigo-600 text-white rounded-tr-none"
                    : msg.sender === "azul"
                    ? "bg-zinc-900 border border-indigo-500/30 text-zinc-100 rounded-tl-none"
                    : "bg-zinc-900 border border-pink-500/30 text-zinc-100 rounded-tl-none"
                }`}
              >
                <p>{msg.text}</p>
                <span className="mt-1 block text-[9px] text-zinc-400 text-right">
                  {msg.timestamp}
                </span>
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-indigo-400 font-mono animate-pulse">
            <Bot className="h-4 w-4" />
            <span>{activeCompanion.toUpperCase()} is analyzing life signals...</span>
          </div>
        )}
      </div>

      {/* Input Bar */}
      <form onSubmit={handleSend} className="p-3 border-t border-zinc-800 bg-zinc-950/90 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Ask ${activeCompanion === "azul" ? "Azul for strategy or focus advice..." : "Azel for mindful check-in..."}`}
          className="flex-1 rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-xs text-zinc-100 placeholder:text-zinc-500 focus:border-indigo-500 focus:outline-none"
        />
        <button
          type="submit"
          disabled={isTyping}
          className={`flex h-10 w-10 items-center justify-center rounded-2xl text-white shadow-lg transition-transform active:scale-95 ${
            activeCompanion === "azul" ? "bg-indigo-600 hover:bg-indigo-700" : "bg-pink-600 hover:bg-pink-700"
          }`}
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}
