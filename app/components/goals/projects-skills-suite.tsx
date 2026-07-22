"use client";

import { useState } from "react";
import { FolderGit2, Trophy, Plus, CheckCircle2, Target, Flame, Layers } from "lucide-react";

export interface ProjectItem {
  id: string;
  name: string;
  category: string;
  deadline: string;
  progressPercent: number;
  targetFocusHours: number;
  completedFocusHours: number;
  status: "active" | "completed" | "paused";
}

export interface SkillProgress {
  id: string;
  name: string;
  icon: string;
  level: number;
  currentXp: number;
  targetXp: number;
  targetHours: number;
  completedHours: number;
}

const DEFAULT_PROJECTS: ProjectItem[] = [
  {
    id: "proj-1",
    name: "ANTYO System ERP Life OS Launch",
    category: "Fullstack Engineering",
    deadline: "2026-08-01",
    progressPercent: 85,
    targetFocusHours: 40,
    completedFocusHours: 34,
    status: "active",
  },
  {
    id: "proj-2",
    name: "Kembang Seladang PWA Mobile",
    category: "Mobile & Web",
    deadline: "2026-08-15",
    progressPercent: 60,
    targetFocusHours: 30,
    completedFocusHours: 18,
    status: "active",
  },
];

const DEFAULT_SKILLS: SkillProgress[] = [
  { id: "sk-1", name: "Fullstack Engineering", icon: "💻", level: 8, currentXp: 1250, targetXp: 1500, targetHours: 50, completedHours: 42 },
  { id: "sk-2", name: "UI/UX & Product Design", icon: "🎨", level: 6, currentXp: 820, targetXp: 1000, targetHours: 30, completedHours: 24 },
  { id: "sk-3", name: "Writing & Reflection", icon: "✍️", level: 5, currentXp: 500, targetXp: 800, targetHours: 20, completedHours: 15 },
];

export default function ProjectsSkillsSuite() {
  const [projects, setProjects] = useState<ProjectItem[]>(DEFAULT_PROJECTS);
  const [skills, setSkills] = useState<SkillProgress[]>(DEFAULT_SKILLS);
  const [showProjectModal, setShowProjectModal] = useState(false);

  // Form State
  const [projName, setProjName] = useState("");
  const [projCategory, setProjCategory] = useState("Fullstack Engineering");
  const [projDeadline, setProjDeadline] = useState("2026-09-01");
  const [projTargetHours, setProjTargetHours] = useState(20);

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projName.trim()) return;

    const newProj: ProjectItem = {
      id: `proj-${Date.now()}`,
      name: projName,
      category: projCategory,
      deadline: projDeadline,
      progressPercent: 0,
      targetFocusHours: Number(projTargetHours),
      completedFocusHours: 0,
      status: "active",
    };

    setProjects([newProj, ...projects]);
    setProjName("");
    setShowProjectModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FolderGit2 className="h-5 w-5 text-indigo-500" />
          <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
            Projects, Goals & Skill Leveling Progression
          </h2>
        </div>

        <button
          onClick={() => setShowProjectModal(true)}
          className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-md hover:bg-indigo-700"
        >
          <Plus className="h-4 w-4" />
          <span>New Project Goal</span>
        </button>
      </div>

      {/* Main Dual Grid: Active Projects & Skill Tree */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left Column (7 Cols): Active Projects */}
        <div className="lg:col-span-7 space-y-4">
          <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
            Active Projects & Target Hours
          </h3>

          <div className="space-y-3">
            {projects.map((p) => (
              <div
                key={p.id}
                className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                      {p.name}
                    </h4>
                    <span className="text-[11px] text-zinc-500">
                      {p.category} • Deadline: {p.deadline}
                    </span>
                  </div>

                  <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-[10px] font-semibold text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
                    {p.completedFocusHours} / {p.targetFocusHours} Focus Hrs
                  </span>
                </div>

                {/* Progress bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] font-semibold text-zinc-600 dark:text-zinc-400">
                    <span>Milestone Progress</span>
                    <span>{p.progressPercent}%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500"
                      style={{ width: `${p.progressPercent}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column (5 Cols): Skill Progression */}
        <div className="lg:col-span-5 space-y-4">
          <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
            Skill Trees & Level Stats
          </h3>

          <div className="space-y-3">
            {skills.map((s) => (
              <div
                key={s.id}
                className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">{s.icon}</span>
                    <div>
                      <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                        {s.name}
                      </h4>
                      <span className="text-[10px] text-zinc-500">
                        {s.completedHours} / {s.targetHours} Target Hours
                      </span>
                    </div>
                  </div>

                  <span className="rounded-lg bg-purple-600 px-2.5 py-1 text-xs font-bold text-white shadow-sm">
                    LV. {s.level}
                  </span>
                </div>

                {/* XP Bar */}
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                    style={{ width: `${(s.currentXp / s.targetXp) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* New Project Modal */}
      {showProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <form
            onSubmit={handleCreateProject}
            className="w-full max-w-md space-y-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-xl dark:border-zinc-800 dark:bg-zinc-900"
          >
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
              Create New Project Goal
            </h3>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                Project Name
              </label>
              <input
                type="text"
                required
                value={projName}
                onChange={(e) => setProjName(e.target.value)}
                placeholder="e.g. Next.js 16 Web App Optimization"
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 p-2.5 text-xs text-zinc-900 focus:outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  Target Focus Hours
                </label>
                <input
                  type="number"
                  min="1"
                  max="500"
                  value={projTargetHours}
                  onChange={(e) => setProjTargetHours(Number(e.target.value))}
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50 p-2.5 text-xs text-zinc-900 focus:outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  Target Deadline
                </label>
                <input
                  type="date"
                  value={projDeadline}
                  onChange={(e) => setProjDeadline(e.target.value)}
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50 p-2.5 text-xs text-zinc-900 focus:outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowProjectModal(false)}
                className="rounded-xl px-4 py-2 text-xs font-semibold text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-700"
              >
                Save Project
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
