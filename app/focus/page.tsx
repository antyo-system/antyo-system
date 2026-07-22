"use client";

import { useState, useEffect } from "react";
import PomodoroTimer from "@/app/components/pomodoro-timer";
import PlanVsRealView from "@/app/components/calendar/plan-vs-real-view";
import FocusCameraWeb from "@/app/components/timer/focus-camera-web";
import ProjectsSkillsSuite from "@/app/components/goals/projects-skills-suite";

import { getFocusTasks, addFocusTask, toggleTaskComplete } from "@/app/lib/storage";
import { FocusTask } from "@/app/lib/types";
import { Plus, CheckCircle2, Circle, Clock, Layers, Sparkles } from "lucide-react";

export default function FocusPage() {
  const [tasks, setTasks] = useState<FocusTask[]>([]);
  const [activeTab, setActiveTab] = useState<"timer" | "plan_vs_real" | "projects_skills">("timer");
  const [showTaskModal, setShowTaskModal] = useState(false);

  // New task form fields
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState<FocusTask["category"]>("deep");
  const [newPriority, setNewPriority] = useState<FocusTask["priority"]>("high");
  const [newEstPoms, setNewEstPoms] = useState(3);

  useEffect(() => {
    setTasks(getFocusTasks());
  }, []);

  const handleToggleTask = (id: string) => {
    const updated = toggleTaskComplete(id);
    setTasks(updated);
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const created = addFocusTask({
      title: newTitle,
      category: newCategory,
      priority: newPriority,
      completed: false,
      pomodorosEstimate: Number(newEstPoms),
      pomodorosCompleted: 0,
    });
    setTasks([created, ...tasks]);
    setNewTitle("");
    setShowTaskModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">
            Antyo Focus OS — Advanced Suite
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Time optimization, Plan vs Real adherence, MediaPipe Smart Vision camera, and Project Goals.
          </p>
        </div>

        {/* Tab Navigation Pill Bar */}
        <div className="flex items-center rounded-2xl bg-zinc-200/80 p-1 backdrop-blur-md dark:bg-zinc-900">
          <button
            onClick={() => setActiveTab("timer")}
            className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all ${
              activeTab === "timer"
                ? "bg-indigo-600 text-white shadow-md"
                : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            }`}
          >
            Timer & Tasks
          </button>
          <button
            onClick={() => setActiveTab("plan_vs_real")}
            className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all ${
              activeTab === "plan_vs_real"
                ? "bg-indigo-600 text-white shadow-md"
                : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            }`}
          >
            Plan vs Realized
          </button>
          <button
            onClick={() => setActiveTab("projects_skills")}
            className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all ${
              activeTab === "projects_skills"
                ? "bg-indigo-600 text-white shadow-md"
                : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            }`}
          >
            Projects & Skills
          </button>
        </div>
      </div>

      {/* MediaPipe Smart AI Camera Focus Guard (Available across all tabs) */}
      <FocusCameraWeb />

      {/* TAB 1: Main Timer Deck & Active Tasks */}
      {activeTab === "timer" && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Timer Column */}
          <div className="lg:col-span-7 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex flex-col items-center">
              <PomodoroTimer />
            </div>
          </div>

          {/* Task Management Column */}
          <div className="lg:col-span-5 flex flex-col rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-100 dark:border-zinc-800">
              <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                Active Focus Tasks
              </h2>
              <button
                onClick={() => setShowTaskModal(true)}
                className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white shadow-md hover:bg-indigo-700"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>New Task</span>
              </button>
            </div>

            <div className="mt-4 flex-1 space-y-3 overflow-y-auto max-h-[480px] pr-1">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => handleToggleTask(task.id)}
                  className={`group flex cursor-pointer items-center justify-between rounded-2xl border p-3.5 transition-all ${
                    task.completed
                      ? "border-zinc-200 bg-zinc-50/50 opacity-60 dark:border-zinc-800 dark:bg-zinc-950/40"
                      : "border-zinc-200 bg-white hover:border-indigo-500 dark:border-zinc-800 dark:bg-zinc-900"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {task.completed ? (
                      <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                    ) : (
                      <Circle className="h-5 w-5 text-zinc-300 group-hover:text-indigo-500 shrink-0 dark:text-zinc-600" />
                    )}
                    <div>
                      <h3
                        className={`text-xs font-semibold ${
                          task.completed
                            ? "line-through text-zinc-400"
                            : "text-zinc-900 dark:text-zinc-100"
                        }`}
                      >
                        {task.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="rounded-md bg-zinc-100 px-2 py-0.5 text-[10px] font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                          {task.category.toUpperCase()}
                        </span>
                        <span
                          className={`rounded-md px-2 py-0.5 text-[10px] font-medium ${
                            task.priority === "high"
                              ? "bg-red-50 text-red-600 dark:bg-red-950/60 dark:text-red-400"
                              : task.priority === "medium"
                              ? "bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400"
                              : "bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400"
                          }`}
                        >
                          {task.priority.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400">
                    <Clock className="h-3.5 w-3.5" />
                    <span>
                      {task.pomodorosCompleted}/{task.pomodorosEstimate} Poms
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Plan vs Real Schedule Feed */}
      {activeTab === "plan_vs_real" && <PlanVsRealView />}

      {/* TAB 3: Projects & Skills Suite */}
      {activeTab === "projects_skills" && <ProjectsSkillsSuite />}

      {/* New Task Modal */}
      {showTaskModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <form
            onSubmit={handleCreateTask}
            className="w-full max-w-md space-y-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-xl dark:border-zinc-800 dark:bg-zinc-900"
          >
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
              Create New Focus Task
            </h3>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                Task Title
              </label>
              <input
                type="text"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. Implement user authentication layer"
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 p-2.5 text-xs text-zinc-900 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
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

              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  Priority
                </label>
                <select
                  value={newPriority}
                  onChange={(e) => setNewPriority(e.target.value as any)}
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50 p-2.5 text-xs text-zinc-900 focus:outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
                >
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                Estimated Pomodoros (25m each)
              </label>
              <input
                type="number"
                min="1"
                max="10"
                value={newEstPoms}
                onChange={(e) => setNewEstPoms(Number(e.target.value))}
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 p-2.5 text-xs text-zinc-900 focus:outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowTaskModal(false)}
                className="rounded-xl px-4 py-2 text-xs font-semibold text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-700"
              >
                Save Task
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
