"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Timer,
  Wallet,
  Activity,
  Users,
  BookOpen,
  Shield,
  ShieldAlert,
  ChevronLeft,
  ChevronRight,
  Flame,
  Award,
  Sparkles,
} from "lucide-react";
import { getSabbathState, toggleSabbathMode, getUserStats } from "@/app/lib/storage";
import { SabbathState, UserStats } from "@/app/lib/types";

const NAV_ITEMS = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard, domain: "all" },
  { name: "Antyo Focus", href: "/focus", icon: Timer, domain: "time" },
  { name: "Finance", href: "/finance", icon: Wallet, domain: "finance" },
  { name: "Health", href: "/health", icon: Activity, domain: "health" },
  { name: "Relationship", href: "/relationship", icon: Users, domain: "relationship" },
  { name: "Story", href: "/story", icon: BookOpen, domain: "story" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [sabbath, setSabbath] = useState<SabbathState>({
    enabled: false,
    pausedDomains: { time: false, finance: false, health: false, relationship: false, story: false },
  });
  const [stats, setStats] = useState<UserStats>({
    level: 1,
    xp: 0,
    xpToNextLevel: 1000,
    dailyStreak: 0,
    lifeBalanceScore: 80,
  });

  useEffect(() => {
    setSabbath(getSabbathState());
    setStats(getUserStats());
  }, []);

  const handleSabbathToggle = () => {
    const next = toggleSabbathMode();
    setSabbath(next);
  };

  return (
    <aside
      className={`relative flex flex-col border-r border-zinc-200 bg-white transition-all duration-300 dark:border-zinc-800 dark:bg-zinc-950 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Brand Header */}
      <div className="flex h-16 items-center justify-between border-b border-zinc-200 px-4 dark:border-zinc-800">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white shadow-md shadow-purple-500/20">
            <Sparkles className="h-5 w-5" />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-base font-bold tracking-wider text-zinc-900 dark:text-zinc-100">
                ANTYO <span className="text-indigo-600 dark:text-indigo-400">ERP</span>
              </span>
              <span className="text-[10px] font-medium tracking-tight text-zinc-500 dark:text-zinc-400">
                Life Operating System
              </span>
            </div>
          )}
        </Link>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="rounded-lg p-1.5 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 space-y-1 p-3">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                isActive
                  ? "bg-indigo-50 text-indigo-700 shadow-sm dark:bg-indigo-950/60 dark:text-indigo-300"
                  : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100"
              }`}
            >
              <Icon
                className={`h-5 w-5 shrink-0 transition-transform group-hover:scale-110 ${
                  isActive
                    ? "text-indigo-600 dark:text-indigo-400"
                    : "text-zinc-400 dark:text-zinc-500"
                }`}
              />
              {!collapsed && <span>{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Sabbath Mode Banner Card */}
      {!collapsed && (
        <div className="mx-3 mb-3 rounded-xl border border-amber-200 bg-amber-50/50 p-3 text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/20 dark:text-amber-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {sabbath.enabled ? (
                <ShieldAlert className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              ) : (
                <Shield className="h-5 w-5 text-zinc-400 dark:text-zinc-500" />
              )}
              <span className="text-xs font-semibold">Sabbath Mode</span>
            </div>
            <button
              onClick={handleSabbathToggle}
              className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                sabbath.enabled ? "bg-amber-600" : "bg-zinc-300 dark:bg-zinc-700"
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  sabbath.enabled ? "translate-x-4" : "translate-x-0"
                }`}
              />
            </button>
          </div>
          <p className="mt-1 text-[11px] leading-tight text-amber-700 dark:text-amber-300">
            {sabbath.enabled ? "Telemetry & AI analysis paused." : "All life signals active."}
          </p>
        </div>
      )}

      {/* User Stats Card at Bottom */}
      <div className="border-t border-zinc-200 p-3 dark:border-zinc-800">
        <div className="flex items-center gap-3 rounded-xl bg-zinc-50 p-2.5 dark:bg-zinc-900/80">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-600 font-bold text-white text-xs shadow-sm">
            L{stats.level}
          </div>
          {!collapsed && (
            <div className="flex flex-1 flex-col overflow-hidden">
              <div className="flex items-center justify-between text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                <span className="truncate">Operator Level</span>
                <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400">
                  <Flame className="h-3 w-3" /> {stats.dailyStreak}d
                </span>
              </div>
              {/* Progress bar */}
              <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
                  style={{ width: `${Math.min(100, (stats.xp / stats.xpToNextLevel) * 100)}%` }}
                />
              </div>
              <span className="mt-1 text-[10px] text-zinc-500 dark:text-zinc-400">
                {stats.xp} / {stats.xpToNextLevel} XP
              </span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
