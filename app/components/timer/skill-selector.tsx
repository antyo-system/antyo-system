"use client";

import { useTimer, SKILL_PRESETS, SkillItem } from "@/app/lib/timer-context";
import { Sparkles, Code, Palette, PenTool, PieChart, Heart } from "lucide-react";

export default function SkillSelector() {
  const { selectedSkill, setSelectedSkill, status } = useTimer();

  return (
    <div className="space-y-2">
      <label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 block uppercase tracking-wider">
        Target Skill / Focus Domain
      </label>

      <div className="flex flex-wrap gap-2">
        {SKILL_PRESETS.map((skill) => {
          const isSelected = selectedSkill.id === skill.id;
          return (
            <button
              key={skill.id}
              disabled={status === "running"}
              onClick={() => setSelectedSkill(skill)}
              className={`flex items-center gap-2 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
                isSelected
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30 scale-105"
                  : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
              }`}
            >
              <span>{skill.icon}</span>
              <span>{skill.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
