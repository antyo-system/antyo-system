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
} from "lucide-react";

import {
  getUserStats,
  getSabbathState,
  getTransactions,
  getHealthLogs,
  getContacts,
  getJournalEntries,
  getAIMessages,
  getFocusTasks,
} from "@/app/lib/storage";

import {
  UserStats,
  SabbathState,
  Transaction,
  HealthLog,
  Contact,
  JournalEntry,
  AIMessage,
  FocusTask,
} from "@/app/lib/types";

import RadarChart, { PillarData } from "@/app/components/radar-chart";

export default function Dashboard() {
  const [stats, setStats] = useState<UserStats | null>(null);
  const [sabbath, setSabbath] = useState<SabbathState | null>(null);
  const [tasks, setTasks] = useState<FocusTask[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [healthLogs, setHealthLogs] = useState<HealthLog[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [journals, setJournals] = useState<JournalEntry[]>([]);
  const [aiMessages, setAiMessages] = useState<AIMessage[]>([]);

  useEffect(() => {
    setStats(getUserStats());
    setSabbath(getSabbathState());
    setTasks(getFocusTasks());
    setTransactions(getTransactions());
    setHealthLogs(getHealthLogs());
    setContacts(getContacts());
    setJournals(getJournalEntries());
    setAiMessages(getAIMessages());
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
    <div className="space-y-6">
      {/* Sabbath Mode Warning Banner */}
      {sabbath.enabled && (
        <div className="flex items-center gap-3 rounded-2xl border border-amber-300 bg-amber-500/10 p-4 text-amber-900 dark:border-amber-900/50 dark:text-amber-200">
          <ShieldAlert className="h-6 w-6 text-amber-600 dark:text-amber-400 shrink-0" />
          <div className="flex-1">
            <h4 className="text-sm font-bold">SABBATH MODE IS ACTIVE</h4>
            <p className="text-xs text-amber-700 dark:text-amber-300">
              System telemetry, automated tracking, and AI optimization recommendations are currently paused. Enjoy your rest period.
            </p>
          </div>
        </div>
      )}

      {/* Hero Welcome & Score Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900 via-purple-900 to-zinc-900 p-6 text-white shadow-xl">
        <div className="relative z-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-amber-300" />
              <span>ANTYO Life OS Command Center</span>
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
              Welcome back, Operator
            </h1>
            <p className="max-w-xl text-xs leading-relaxed text-indigo-200/80 sm:text-sm">
              Your 5 core life domains are balanced and operational. Keep your focus streak alive today.
            </p>
          </div>

          {/* Score Gauge Widget */}
          <div className="flex items-center gap-4 rounded-2xl bg-white/10 p-4 backdrop-blur-md">
            <div className="flex flex-col items-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-200">
                Life Balance
              </span>
              <span className="text-3xl font-black text-amber-300">{stats.lifeBalanceScore}</span>
              <span className="text-[10px] text-zinc-300">/ 100 PTS</span>
            </div>

            <div className="h-10 w-px bg-white/20" />

            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-xs font-semibold">
                <Flame className="h-4 w-4 text-amber-400" />
                <span>{stats.dailyStreak} Day Streak</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-indigo-200">
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
          className="group relative flex flex-col justify-between rounded-2xl border border-zinc-200 bg-white p-5 transition-all hover:border-indigo-500 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
        >
          <div className="flex items-center justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
              <Timer className="h-5 w-5" />
            </div>
            <ArrowUpRight className="h-4 w-4 text-zinc-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-indigo-500" />
          </div>
          <div className="mt-4 space-y-1">
            <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
              Antyo Focus
            </span>
            <div className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
              {pendingTasksCount} Tasks Pending
            </div>
            <p className="text-[11px] text-indigo-600 dark:text-indigo-400 font-medium">
              Start Pomodoro Session →
            </p>
          </div>
        </Link>

        {/* Finance Card */}
        <Link
          href="/finance"
          className="group relative flex flex-col justify-between rounded-2xl border border-zinc-200 bg-white p-5 transition-all hover:border-emerald-500 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
        >
          <div className="flex items-center justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
              <Wallet className="h-5 w-5" />
            </div>
            <ArrowUpRight className="h-4 w-4 text-zinc-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-emerald-500" />
          </div>
          <div className="mt-4 space-y-1">
            <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
              Finance Cashflow
            </span>
            <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
              +Rp {(netCashflow / 1000000).toFixed(1)}M
            </div>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
              Net balance this month
            </p>
          </div>
        </Link>

        {/* Health Card */}
        <Link
          href="/health"
          className="group relative flex flex-col justify-between rounded-2xl border border-zinc-200 bg-white p-5 transition-all hover:border-blue-500 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
        >
          <div className="flex items-center justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
              <Activity className="h-5 w-5" />
            </div>
            <ArrowUpRight className="h-4 w-4 text-zinc-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-blue-500" />
          </div>
          <div className="mt-4 space-y-1">
            <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
              Health Signals
            </span>
            <div className="flex items-center gap-3 text-sm font-bold text-zinc-900 dark:text-zinc-100">
              <span className="flex items-center gap-1 text-blue-500">
                <Droplet className="h-3.5 w-3.5" /> {(todayHealth.waterMl / 1000).toFixed(1)}L
              </span>
              <span className="flex items-center gap-1 text-purple-500">
                <Moon className="h-3.5 w-3.5" /> {todayHealth.sleepHours}h
              </span>
            </div>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
              Daily hydration & sleep
            </p>
          </div>
        </Link>

        {/* Relationship & Story Card */}
        <Link
          href="/story"
          className="group relative flex flex-col justify-between rounded-2xl border border-zinc-200 bg-white p-5 transition-all hover:border-purple-500 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
        >
          <div className="flex items-center justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400">
              <BookOpen className="h-5 w-5" />
            </div>
            <ArrowUpRight className="h-4 w-4 text-zinc-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-purple-500" />
          </div>
          <div className="mt-4 space-y-1">
            <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
              Story & Journal
            </span>
            <div className="text-sm font-bold truncate text-zinc-900 dark:text-zinc-100">
              {journals[0]?.title || "No Entry Today"}
            </div>
            <p className="text-[11px] text-purple-600 dark:text-purple-400 font-medium">
              View Life Reflections →
            </p>
          </div>
        </Link>
      </div>

      {/* Main Grid: 5 Pillars RPG Radar Chart & AI Companions / Activity */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left Column (5 Cols): RPG Radar Stat Wheel */}
        <div className="lg:col-span-5 flex flex-col">
          <RadarChart pillars={pillarScores} />
        </div>

        {/* Right Column (7 Cols): AI Companions Feed & Tasks */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-indigo-500" />
              <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                AI Companions Feed (Azul & Azel)
              </h2>
            </div>
            <span className="text-xs text-zinc-500">Autonomous Optimization</span>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Azul Card */}
            <div className="flex flex-col justify-between rounded-2xl border border-indigo-200 bg-indigo-50/40 p-5 dark:border-indigo-900/50 dark:bg-indigo-950/20">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white font-bold text-xs shadow-md">
                      AZ
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-indigo-950 dark:text-indigo-200">
                        AZUL — Strategy & Focus
                      </h3>
                      <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-medium">
                        Optimization Specialist
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
                  "{aiMessages.find((m) => m.companion === "azul")?.message || "Focus on deep work blocks early in the morning for maximum cognitive throughput."}"
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-indigo-200/60 pt-3 text-[11px] text-indigo-700 dark:border-indigo-900/60 dark:text-indigo-300">
                <span>Recommendation: Deep Work</span>
                <span className="font-semibold text-indigo-600 dark:text-indigo-400">+100 XP Potential</span>
              </div>
            </div>

            {/* Azel Card */}
            <div className="flex flex-col justify-between rounded-2xl border border-pink-200 bg-pink-50/40 p-5 dark:border-pink-900/50 dark:bg-pink-950/20">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-pink-600 text-white font-bold text-xs shadow-md">
                      AZ
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-pink-950 dark:text-pink-200">
                        AZEL — Mindful & Empathy
                      </h3>
                      <span className="text-[10px] text-pink-600 dark:text-pink-400 font-medium">
                        Sustainability Specialist
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
                  "{aiMessages.find((m) => m.companion === "azel")?.message || "Great work keeping your streak. Take a mindful 5-minute break and hydrate before your next session."}"
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-pink-200/60 pt-3 text-[11px] text-pink-700 dark:border-pink-900/60 dark:text-pink-300">
                <span>Check-in: Wellness</span>
                <span className="font-semibold text-pink-600 dark:text-pink-400">12-Day Streak Active</span>
              </div>
            </div>
          </div>

          {/* Priority Focus Tasks List */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                Priority Focus Tasks
              </h3>
              <Link href="/focus" className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                View All ({tasks.length}) →
              </Link>
            </div>

            <div className="mt-3 space-y-2">
              {tasks.slice(0, 3).map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between rounded-xl bg-zinc-50 p-3 dark:bg-zinc-950/60"
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle2
                      className={`h-4 w-4 ${
                        task.completed
                          ? "text-emerald-500"
                          : "text-zinc-300 dark:text-zinc-600"
                      }`}
                    />
                    <span
                      className={`text-xs font-medium ${
                        task.completed
                          ? "line-through text-zinc-400"
                          : "text-zinc-800 dark:text-zinc-200"
                      }`}
                    >
                      {task.title}
                    </span>
                  </div>
                  <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-semibold text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
                    {task.pomodorosCompleted}/{task.pomodorosEstimate} Poms
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
