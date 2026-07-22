"use client";

import { useState } from "react";
import { Clock, Plus, Target, CheckCircle2, AlertTriangle, Calendar as CalendarIcon } from "lucide-react";

export interface PlanBlock {
  id: string;
  title: string;
  startTime: string; // "09:00"
  endTime: string;   // "11:00"
  category: "deep" | "study" | "creative" | "admin";
  completed: boolean;
}

export interface RealBlock {
  id: string;
  title: string;
  startTime: string; // "09:15"
  endTime: string;   // "10:45"
  durationMinutes: number;
  type: "focus" | "break";
}

const DEFAULT_PLANS: PlanBlock[] = [
  { id: "p-1", title: "ANTYO ERP Focus OS Architecture", startTime: "09:00", endTime: "11:00", category: "deep", completed: true },
  { id: "p-2", title: "Finance Module Cashflow Integration", startTime: "11:30", endTime: "13:00", category: "deep", completed: true },
  { id: "p-3", title: "Health Metrics & Telemetry Testing", startTime: "14:00", endTime: "15:30", category: "admin", completed: false },
  { id: "p-4", title: "Story Journaling & AI Feedback", startTime: "16:00", endTime: "17:00", category: "creative", completed: false },
];

const DEFAULT_REALS: RealBlock[] = [
  { id: "r-1", title: "ANTYO ERP Focus OS Architecture", startTime: "09:15", endTime: "11:05", durationMinutes: 110, type: "focus" },
  { id: "r-2", title: "Finance Module Cashflow Integration", startTime: "11:35", endTime: "12:55", durationMinutes: 80, type: "focus" },
];

export default function PlanVsRealView() {
  const [plans, setPlans] = useState<PlanBlock[]>(DEFAULT_PLANS);
  const [reals, setReals] = useState<RealBlock[]>(DEFAULT_REALS);
  const [showAddPlanModal, setShowAddPlanModal] = useState(false);

  // Form State
  const [newTitle, setNewTitle] = useState("");
  const [newStart, setNewStart] = useState("09:00");
  const [newEnd, setNewEnd] = useState("10:00");
  const [newCategory, setNewCategory] = useState<PlanBlock["category"]>("deep");

  const totalPlannedMinutes = plans.reduce((acc, p) => {
    const [sh, sm] = p.startTime.split(":").map(Number);
    const [eh, em] = p.endTime.split(":").map(Number);
    return acc + (eh * 60 + em - (sh * 60 + sm));
  }, 0);

  const totalRealizedMinutes = reals.reduce((acc, r) => acc + r.durationMinutes, 0);

  const adherenceRatio = Math.min(100, Math.round((totalRealizedMinutes / (totalPlannedMinutes || 1)) * 100));

  const handleAddPlan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newBlock: PlanBlock = {
      id: `p-${Date.now()}`,
      title: newTitle,
      startTime: newStart,
      endTime: newEnd,
      category: newCategory,
      completed: false,
    };

    setPlans([...plans, newBlock]);
    setNewTitle("");
    setShowAddPlanModal(false);
  };

  const togglePlanComplete = (id: string) => {
    setPlans(plans.map((p) => (p.id === id ? { ...p, completed: !p.completed } : p)));
  };

  return (
    <div className="space-y-6">
      {/* Top Comparative Summary Bar */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <span className="text-xs font-semibold text-zinc-500">Planned Focus Target</span>
          <div className="mt-1 text-2xl font-extrabold text-indigo-600 dark:text-indigo-400">
            {(totalPlannedMinutes / 60).toFixed(1)} <span className="text-xs font-normal">Hours</span>
          </div>
          <span className="text-[10px] text-zinc-400">Sum of scheduled plan blocks</span>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <span className="text-xs font-semibold text-zinc-500">Realized Focus Execution</span>
          <div className="mt-1 text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
            {(totalRealizedMinutes / 60).toFixed(1)} <span className="text-xs font-normal">Hours</span>
          </div>
          <span className="text-[10px] text-zinc-400">Completed Pomodoro sessions</span>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <span className="text-xs font-semibold text-zinc-500">Plan Adherence Rate</span>
          <div className="mt-1 text-2xl font-extrabold text-purple-600 dark:text-purple-400">
            {adherenceRatio}%
          </div>
          <span className="text-[10px] text-zinc-400">Execution accuracy</span>
        </div>
      </div>

      {/* Main Dual-Track Timeline Schedule View */}
      <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 space-y-4">
        <div className="flex items-center justify-between pb-4 border-b border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5 text-indigo-500" />
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
              Schedule Feed: Plan vs. Realized Execution
            </h3>
          </div>

          <button
            onClick={() => setShowAddPlanModal(true)}
            className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-md hover:bg-indigo-700"
          >
            <Plus className="h-4 w-4" />
            <span>Add Planned Block</span>
          </button>
        </div>

        {/* Comparative Dual Columns Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Left Column: PLANNED BLOCKS */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                <Target className="h-4 w-4" /> Planned Target Schedule
              </span>
              <span className="text-[10px] text-zinc-400">{plans.length} Blocks</span>
            </div>

            <div className="space-y-2.5">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  onClick={() => togglePlanComplete(plan.id)}
                  className={`flex cursor-pointer items-center justify-between rounded-2xl border p-4 transition-all ${
                    plan.completed
                      ? "border-emerald-200 bg-emerald-50/40 dark:border-emerald-900/50 dark:bg-emerald-950/20"
                      : "border-zinc-200 bg-zinc-50/50 hover:border-indigo-400 dark:border-zinc-800 dark:bg-zinc-950/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle2
                      className={`h-5 w-5 ${
                        plan.completed ? "text-emerald-500" : "text-zinc-300 dark:text-zinc-600"
                      }`}
                    />
                    <div>
                      <h4
                        className={`text-xs font-bold ${
                          plan.completed ? "line-through text-zinc-400" : "text-zinc-900 dark:text-zinc-100"
                        }`}
                      >
                        {plan.title}
                      </h4>
                      <span className="text-[10px] text-zinc-500 font-medium">
                        {plan.startTime} - {plan.endTime} • {plan.category.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold uppercase text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950 px-2 py-0.5 rounded-md">
                    Target
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: REALIZED EXECUTION LOGS */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                <Clock className="h-4 w-4" /> Realized Focus Logs
              </span>
              <span className="text-[10px] text-zinc-400">{reals.length} Sessions</span>
            </div>

            <div className="space-y-2.5">
              {reals.map((real) => (
                <div
                  key={real.id}
                  className="flex items-center justify-between rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4 dark:border-emerald-900/60 dark:bg-emerald-950/30"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-600 text-white font-bold text-xs">
                      ✓
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                        {real.title}
                      </h4>
                      <span className="text-[10px] text-zinc-500 font-medium">
                        {real.startTime} - {real.endTime} ({real.durationMinutes} mins)
                      </span>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold uppercase text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded-md">
                    Realized
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Add Plan Modal */}
      {showAddPlanModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <form
            onSubmit={handleAddPlan}
            className="w-full max-w-md space-y-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-xl dark:border-zinc-800 dark:bg-zinc-900"
          >
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
              Schedule Planned Focus Block
            </h3>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                Plan Title / Objective
              </label>
              <input
                type="text"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. Code ANTYO ERP Focus Suite"
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 p-2.5 text-xs text-zinc-900 focus:outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  Start Time
                </label>
                <input
                  type="time"
                  required
                  value={newStart}
                  onChange={(e) => setNewStart(e.target.value)}
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50 p-2.5 text-xs text-zinc-900 focus:outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  End Time
                </label>
                <input
                  type="time"
                  required
                  value={newEnd}
                  onChange={(e) => setNewEnd(e.target.value)}
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50 p-2.5 text-xs text-zinc-900 focus:outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                Category
              </label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value as any)}
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 p-2.5 text-xs text-zinc-900 focus:outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
              >
                <option value="deep">Deep Work</option>
                <option value="study">Study / Research</option>
                <option value="creative">Creative</option>
                <option value="admin">Admin / Ops</option>
              </select>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowAddPlanModal(false)}
                className="rounded-xl px-4 py-2 text-xs font-semibold text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-700"
              >
                Save Planned Block
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
