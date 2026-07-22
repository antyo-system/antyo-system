"use client";

import { useState, useEffect } from "react";
import { getHealthLogs, addHealthLog } from "@/app/lib/storage";
import { HealthLog } from "@/app/lib/types";
import { Activity, Moon, Droplet, Dumbbell, Smile, Zap, Plus } from "lucide-react";

export default function HealthPage() {
  const [logs, setLogs] = useState<HealthLog[]>([]);
  const [showModal, setShowModal] = useState(false);

  // Health Form State
  const [sleepHours, setSleepHours] = useState(7.5);
  const [waterMl, setWaterMl] = useState(2500);
  const [workoutMinutes, setWorkoutMinutes] = useState(30);
  const [moodScore, setMoodScore] = useState(4);
  const [energyScore, setEnergyScore] = useState(4);

  useEffect(() => {
    setLogs(getHealthLogs());
  }, []);

  const handleCreateHealthLog = (e: React.FormEvent) => {
    e.preventDefault();
    const created = addHealthLog({
      date: new Date().toISOString().slice(0, 10),
      sleepHours: Number(sleepHours),
      waterMl: Number(waterMl),
      workoutMinutes: Number(workoutMinutes),
      moodScore: Number(moodScore),
      energyScore: Number(energyScore),
    });

    setLogs([created, ...logs]);
    setShowModal(false);
  };

  const latest = logs[0] || {
    sleepHours: 7.5,
    waterMl: 2500,
    workoutMinutes: 30,
    moodScore: 4,
    energyScore: 4,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">
            Health & Wellness OS
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Tracking sleep hygiene, hydration, physical training, and energy vitality.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white shadow-md hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
          <span>Log Daily Metrics</span>
        </button>
      </div>

      {/* 5 Health Signal Metric Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {/* Sleep */}
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">Sleep</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
              <Moon className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 text-2xl font-extrabold text-indigo-600 dark:text-indigo-400">
            {latest.sleepHours} <span className="text-xs font-normal">hrs</span>
          </div>
          <span className="mt-1 block text-[11px] text-zinc-500">Target: 7.5 - 8.5 hrs</span>
        </div>

        {/* Water */}
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">Water</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
              <Droplet className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 text-2xl font-extrabold text-blue-600 dark:text-blue-400">
            {(latest.waterMl / 1000).toFixed(1)} <span className="text-xs font-normal">L</span>
          </div>
          <span className="mt-1 block text-[11px] text-zinc-500">Target: 2.5 - 3.0 L</span>
        </div>

        {/* Workout */}
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">Workout</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
              <Dumbbell className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
            {latest.workoutMinutes} <span className="text-xs font-normal">mins</span>
          </div>
          <span className="mt-1 block text-[11px] text-zinc-500">Active movement</span>
        </div>

        {/* Mood */}
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">Mood</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400">
              <Smile className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 text-2xl font-extrabold text-amber-600 dark:text-amber-400">
            {latest.moodScore} <span className="text-xs font-normal">/ 5</span>
          </div>
          <span className="mt-1 block text-[11px] text-zinc-500">Emotional state</span>
        </div>

        {/* Energy */}
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">Energy</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-50 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400">
              <Zap className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 text-2xl font-extrabold text-purple-600 dark:text-purple-400">
            {latest.energyScore} <span className="text-xs font-normal">/ 5</span>
          </div>
          <span className="mt-1 block text-[11px] text-zinc-500">Vitality level</span>
        </div>
      </div>

      {/* Health History Table */}
      <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-4">
          Health Telemetry Logs
        </h2>

        <div className="space-y-3">
          {logs.map((log) => (
            <div
              key={log.id}
              className="flex items-center justify-between rounded-2xl border border-zinc-100 bg-zinc-50/50 p-4 dark:border-zinc-800 dark:bg-zinc-950/60"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 font-bold text-xs">
                  {log.date.slice(8, 10)}
                </div>
                <div>
                  <h3 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                    Log Entry — {log.date}
                  </h3>
                  <span className="text-[10px] text-zinc-500">
                    Mood: {log.moodScore}/5 • Energy: {log.energyScore}/5
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-6 text-xs font-semibold">
                <span className="text-indigo-600 dark:text-indigo-400">{log.sleepHours}h Sleep</span>
                <span className="text-blue-600 dark:text-blue-400">
                  {(log.waterMl / 1000).toFixed(1)}L Water
                </span>
                <span className="text-emerald-600 dark:text-emerald-400">
                  {log.workoutMinutes}m Workout
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Health Log Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <form
            onSubmit={handleCreateHealthLog}
            className="w-full max-w-md space-y-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-xl dark:border-zinc-800 dark:bg-zinc-900"
          >
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
              Record Health Signals
            </h3>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                Sleep Duration (Hours)
              </label>
              <input
                type="number"
                step="0.5"
                min="0"
                max="16"
                value={sleepHours}
                onChange={(e) => setSleepHours(Number(e.target.value))}
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 p-2.5 text-xs text-zinc-900 focus:outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                Water Intake (mL)
              </label>
              <input
                type="number"
                step="250"
                min="0"
                max="6000"
                value={waterMl}
                onChange={(e) => setWaterMl(Number(e.target.value))}
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 p-2.5 text-xs text-zinc-900 focus:outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                Workout Duration (Minutes)
              </label>
              <input
                type="number"
                step="5"
                min="0"
                max="300"
                value={workoutMinutes}
                onChange={(e) => setWorkoutMinutes(Number(e.target.value))}
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 p-2.5 text-xs text-zinc-900 focus:outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  Mood (1-5)
                </label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={moodScore}
                  onChange={(e) => setMoodScore(Number(e.target.value))}
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50 p-2.5 text-xs text-zinc-900 focus:outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  Energy (1-5)
                </label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={energyScore}
                  onChange={(e) => setEnergyScore(Number(e.target.value))}
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50 p-2.5 text-xs text-zinc-900 focus:outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
                />
              </div>
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
                className="rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700"
              >
                Save Metrics
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
