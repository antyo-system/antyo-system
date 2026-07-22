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
  Zap,
  Bot,
} from "lucide-react";
import { getSabbathState, toggleSabbathMode, getUserStats } from "@/app/lib/storage";
import { SabbathState, UserStats } from "@/app/lib/types";

const NAV_ITEMS = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard, domain: "all" },
  { name: "Antyo Focus", href: "/focus", icon: Timer, domain: "time" },
  { name: "Finance", href: "/finance", icon: Wallet, domain: "finance" },
  { name: "Health", href: "/health", icon: Activity, domain: "health" },
  { name: "Relationship", href: "/relationship", icon: Users, domain: "relationship" },
  { name: "Story & AI Chat", href: "/story", icon: BookOpen, domain: "story" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [sabbath, setSabbath] = useState<SabbathState>({
    enabled: false,
    pausedDomains: { time: false, finance: false, health: false, relationship: false, story: false },
  });
  const [stats, setStats] = useState<UserStats>({
    level: 4,
    xp: 1450,
    xpToNextLevel: 2000,
    dailyStreak: 12,
    lifeBalanceScore: 88,
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
      className={`relative flex flex-col border-r border-indigo-500/20 bg-zinc-950 text-zinc-100 transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Brand Header */}
      <div className="flex h-16 items-center justify-between border-b border-indigo-500/20 px-4 bg-zinc-950/80">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30">
            <Sparkles className="h-5 w-5 text-amber-300 animate-pulse" />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-base font-black tracking-wider text-white">
                ANTYO <span className="text-indigo-400 cyber-glow-text">OS</span>
              </span>
              <span className="text-[10px] font-mono font-bold tracking-widest text-indigo-400">
                SYSTEM GAME HUD
              </span>
            </div>
          )}
        </Link>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-900 hover:text-white transition-colors"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 space-y-1.5 p-3">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex items-center gap-3 rounded-2xl px-3.5 py-3 text-xs font-bold transition-all ${
                isActive
                  ? "bg-gradient-to-r from-indigo-600/80 to-purple-600/80 text-white shadow-lg shadow-indigo-600/20 border border-indigo-400/40"
                  : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100"
              }`}
            >
              <Icon
                className={`h-5 w-5 shrink-0 transition-transform group-hover:scale-110 ${
                  isActive ? "text-amber-300" : "text-zinc-500"
                }`}
              />
              {!collapsed && <span>{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Sabbath Mode Banner Card */}
      {!collapsed && (
        <div className="mx-3 mb-3 rounded-2xl border border-amber-500/30 bg-amber-950/30 p-3 text-amber-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {sabbath.enabled ? (
                <ShieldAlert className="h-4 w-4 text-amber-400 animate-bounce" />
              ) : (
                <Shield className="h-4 w-4 text-zinc-500" />
              )}
              <span className="text-xs font-bold uppercase tracking-wider">Sabbath Mode</span>
            </div>
            <button
              onClick={handleSabbathToggle}
              className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                sabbath.enabled ? "bg-amber-500" : "bg-zinc-800"
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  sabbath.enabled ? "translate-x-4" : "translate-x-0"
                }`}
              />
            </button>
          </div>
          <p className="mt-1 text-[10px] leading-tight text-amber-300/80 font-mono">
            {sabbath.enabled ? "Telemetry & AI paused." : "All systems operational."}
          </p>
        </div>
      )}

      {/* User Level RPG Card at Bottom */}
      <div className="border-t border-indigo-500/20 p-3 bg-zinc-950">
        <div className="flex items-center gap-3 rounded-2xl bg-zinc-900/90 border border-indigo-500/30 p-3 shadow-md">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 font-extrabold text-white text-xs shadow-md shadow-indigo-500/30">
            L{stats.level}
          </div>
          {!collapsed && (
            <div className="flex flex-1 flex-col overflow-hidden">
              <div className="flex items-center justify-between text-xs font-extrabold text-white">
                <span className="truncate">Operator Lv.{stats.level}</span>
                <span className="flex items-center gap-1 text-amber-400">
                  <Flame className="h-3.5 w-3.5" /> {stats.dailyStreak}d
                </span>
              </div>
              {/* RPG Progress bar */}
              <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-zinc-800 border border-zinc-700">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-sm"
                  style={{ width: `${Math.min(100, (stats.xp / stats.xpToNextLevel) * 100)}%` }}
                />
              </div>
              <span className="mt-1 text-[10px] font-mono text-indigo-300">
                {stats.xp} / {stats.xpToNextLevel} XP
              </span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
