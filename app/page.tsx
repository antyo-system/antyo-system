"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Timer,
  Wallet,
  Activity,
  Users,
  BookOpen,
  Sparkles,
  Flame,
  ShieldAlert,
  ArrowUpRight,
  TrendingUp,
  Droplet,
  Moon,
  Heart,
  CheckCircle2,
  Brain,
  MessageSquare,
  Bot,
} from "lucide-react";

import {
  getUserStats,
  getSabbathState,
  getTransactions,
  getHealthLogs,
  getContacts,
  getJournalEntries,
  getFocusTasks,
} from "@/app/lib/storage";

import {
  UserStats,
  SabbathState,
  Transaction,
  HealthLog,
  Contact,
  JournalEntry,
  FocusTask,
} from "@/app/lib/types";

import RadarChart, { PillarData } from "@/app/components/radar-chart";
import AIChatbot from "@/app/components/ai-chatbot";

export default function Dashboard() {
  const [stats, setStats] = useState<UserStats | null>(null);
  const [sabbath, setSabbath] = useState<SabbathState | null>(null);
  const [tasks, setTasks] = useState<FocusTask[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [healthLogs, setHealthLogs] = useState<HealthLog[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [journals, setJournals] = useState<JournalEntry[]>([]);

  useEffect(() => {
    setStats(getUserStats());
    setSabbath(getSabbathState());
    setTasks(getFocusTasks());
    setTransactions(getTransactions());
    setHealthLogs(getHealthLogs());
    setContacts(getContacts());
    setJournals(getJournalEntries());
  }, []);

  if (!stats || !sabbath) return null;

  // Financial calculations
  const monthlyIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
  const monthlyExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);
  const netCashflow = monthlyIncome - monthlyExpense;

  // Health signals (latest log)
  const todayHealth = healthLogs[0] || { sleepHours: 0, waterMl: 0, workoutMinutes: 0 };

  // Pending focus tasks count
  const pendingTasksCount = tasks.filter((t) => !t.completed).length;

  // Compute 5 Pillars dynamic scores for Radar Chart
  const timeScore = tasks.length > 0 ? Math.round((tasks.filter((t) => t.completed).length / tasks.length) * 100) || 75 : 80;
  const financeScore = monthlyIncome > 0 ? Math.min(100, Math.round((netCashflow / monthlyIncome) * 100 + 40)) : 85;
  const healthScore = Math.min(100, Math.round(((todayHealth.sleepHours / 8) * 50 + (todayHealth.waterMl / 2500) * 50))) || 82;
  const relationshipScore = contacts.length > 0 ? Math.round((contacts.filter((c) => c.healthStatus === "healthy").length / contacts.length) * 100) : 80;
  const storyScore = journals.length > 0 ? Math.min(100, journals.length * 40 + 20) : 88;

  const pillarScores: PillarData[] = [
    { name: "Time", key: "time", score: timeScore, icon: "⏱️", color: "text-indigo-400" },
    { name: "Finance", key: "finance", score: financeScore, icon: "💰", color: "text-emerald-400" },
    { name: "Health", key: "health", score: healthScore, icon: "💧", color: "text-blue-400" },
    { name: "Relationship", key: "relationship", score: relationshipScore, icon: "👥", color: "text-pink-400" },
    { name: "Story", key: "story", score: storyScore, icon: "📖", color: "text-purple-400" },
  ];

  return (
    <div className="space-y-6 bg-zinc-950 text-zinc-100 min-h-screen p-1">
      {/* Sabbath Mode Warning Banner */}
      {sabbath.enabled && (
        <div className="flex items-center gap-3 rounded-2xl border border-amber-500/40 bg-amber-950/40 p-4 text-amber-200 shadow-lg">
          <ShieldAlert className="h-6 w-6 text-amber-400 shrink-0 animate-pulse" />
          <div className="flex-1">
            <h4 className="text-xs font-bold uppercase tracking-wider">SABBATH MODE ACTIVE</h4>
            <p className="text-xs text-amber-300/80 font-mono">
              System telemetry, automated tracking, and AI optimization recommendations are currently paused.
            </p>
          </div>
        </div>
      )}

      {/* Hero Welcome & Game System Score Card */}
      <div className="relative overflow-hidden rounded-3xl border border-indigo-500/30 bg-gradient-to-r from-indigo-950 via-purple-950 to-zinc-950 p-6 text-white shadow-2xl">
        <div className="relative z-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-3 py-1 text-xs font-mono font-bold text-indigo-300 backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-amber-300 animate-pulse" />
              <span>ANTYO SYSTEM GAME HUD</span>
            </div>
            <h1 className="text-2xl font-black tracking-tight sm:text-3xl">
              Welcome back, <span className="text-indigo-400 cyber-glow-text">Operator</span>
            </h1>
            <p className="max-w-xl text-xs leading-relaxed text-indigo-200/80 sm:text-sm font-mono">
              Your 5 core life domains are balanced and operational. Keep your focus streak alive today.
            </p>
          </div>

          {/* Score Gauge Widget */}
          <div className="flex items-center gap-4 rounded-2xl border border-indigo-500/30 bg-zinc-900/80 p-4 backdrop-blur-md shadow-xl">
            <div className="flex flex-col items-center">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-300">
                Life Balance
              </span>
              <span className="text-3xl font-black text-amber-400 cyber-glow-text">{stats.lifeBalanceScore}</span>
              <span className="text-[10px] text-zinc-400 font-mono">/ 100 PTS</span>
            </div>

            <div className="h-10 w-px bg-zinc-800" />

            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <Flame className="h-4 w-4 text-amber-400" />
                <span>{stats.dailyStreak} Day Streak</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-300">
                <Brain className="h-4 w-4 text-indigo-400" />
                <span>Level {stats.level} Operator</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Core Quick Domain Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Focus Card */}
        <Link
          href="/focus"
          className="group relative flex flex-col justify-between rounded-3xl border border-indigo-500/20 bg-zinc-900/80 p-5 transition-all hover:border-indigo-500 hover:shadow-xl hover:shadow-indigo-500/10"
        >
          <div className="flex items-center justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
              <Timer className="h-5 w-5" />
            </div>
            <ArrowUpRight className="h-4 w-4 text-zinc-500 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-indigo-400" />
          </div>
          <div className="mt-4 space-y-1">
            <span className="text-xs font-semibold text-zinc-400">Antyo Focus</span>
            <div className="text-xl font-extrabold text-white">{pendingTasksCount} Tasks Pending</div>
            <p className="text-[11px] text-indigo-400 font-bold">Start Pomodoro Session →</p>
          </div>
        </Link>

        {/* Finance Card */}
        <Link
          href="/finance"
          className="group relative flex flex-col justify-between rounded-3xl border border-emerald-500/20 bg-zinc-900/80 p-5 transition-all hover:border-emerald-500 hover:shadow-xl hover:shadow-emerald-500/10"
        >
          <div className="flex items-center justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              <Wallet className="h-5 w-5" />
            </div>
            <ArrowUpRight className="h-4 w-4 text-zinc-500 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-emerald-400" />
          </div>
          <div className="mt-4 space-y-1">
            <span className="text-xs font-semibold text-zinc-400">Finance Cashflow</span>
            <div className="text-xl font-extrabold text-emerald-400">+Rp {(netCashflow / 1000000).toFixed(1)}M</div>
            <p className="text-[11px] text-zinc-400">Net balance this month</p>
          </div>
        </Link>

        {/* Health Card */}
        <Link
          href="/health"
          className="group relative flex flex-col justify-between rounded-3xl border border-blue-500/20 bg-zinc-900/80 p-5 transition-all hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/10"
        >
          <div className="flex items-center justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/30">
              <Activity className="h-5 w-5" />
            </div>
            <ArrowUpRight className="h-4 w-4 text-zinc-500 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-blue-400" />
          </div>
          <div className="mt-4 space-y-1">
            <span className="text-xs font-semibold text-zinc-400">Health Signals</span>
            <div className="flex items-center gap-3 text-sm font-bold text-white">
              <span className="flex items-center gap-1 text-blue-400">
                <Droplet className="h-3.5 w-3.5" /> {(todayHealth.waterMl / 1000).toFixed(1)}L
              </span>
              <span className="flex items-center gap-1 text-purple-400">
                <Moon className="h-3.5 w-3.5" /> {todayHealth.sleepHours}h
              </span>
            </div>
            <p className="text-[11px] text-zinc-400">Daily hydration & sleep</p>
          </div>
        </Link>

        {/* Relationship & Story Card */}
        <Link
          href="/story"
          className="group relative flex flex-col justify-between rounded-3xl border border-purple-500/20 bg-zinc-900/80 p-5 transition-all hover:border-purple-500 hover:shadow-xl hover:shadow-purple-500/10"
        >
          <div className="flex items-center justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/30">
              <BookOpen className="h-5 w-5" />
            </div>
            <ArrowUpRight className="h-4 w-4 text-zinc-500 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-purple-400" />
          </div>
          <div className="mt-4 space-y-1">
            <span className="text-xs font-semibold text-zinc-400">Story & Journal</span>
            <div className="text-sm font-bold truncate text-white">{journals[0]?.title || "No Entry Today"}</div>
            <p className="text-[11px] text-purple-400 font-bold">View Life Reflections →</p>
          </div>
        </Link>
      </div>

      {/* Main Grid: 5 Pillars RPG Radar Chart & Interactive AI Chatbot */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left Column (5 Cols): RPG Radar Stat Wheel */}
        <div className="lg:col-span-5 flex flex-col">
          <RadarChart pillars={pillarScores} />
        </div>

        {/* Right Column (7 Cols): Interactive Azul & Azel AI Chatbot */}
        <div className="lg:col-span-7 flex flex-col">
          <AIChatbot />
        </div>
      </div>
    </div>
  );
}
