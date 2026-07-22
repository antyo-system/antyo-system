"use client";

import { useState, useEffect, useMemo } from "react";
import {
  type Session,
  loadSessions,
  deleteSession,
  updateSession,
  getTotalFocusMinutes,
} from "../lib/sessions";

type ViewMode = "day" | "week";
type FilterType = "all" | "work" | "break";

const HOUR_HEIGHT = 60; // px per hour
const START_HOUR = 0;
const END_HOUR = 24;
const HOURS = Array.from({ length: END_HOUR - START_HOUR }, (_, i) => i + START_HOUR);
const DAY_NAMES_SHORT = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];

function getMonday(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  d.setDate(diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function formatHour(hour: number): string {
  return `${hour.toString().padStart(2, "0")}:00`;
}

function formatDateShort(date: Date): string {
  return date.toLocaleDateString("id-ID", { day: "numeric", month: "short" });
}

function formatDateFull(date: Date): string {
  return date.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatTimeFull(date: Date): string {
  return date.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
}

function formatMinutes(m: number): string {
  const h = Math.floor(m / 60);
  const min = m % 60;
  if (h === 0) return `${min}m`;
  if (min === 0) return `${h}j`;
  return `${h}j ${min}m`;
}

// --- Session Block Component ---
function SessionBlock({
  session,
  onClick,
  narrow,
}: {
  session: Session;
  onClick: (s: Session) => void;
  narrow?: boolean;
}) {
  const start = new Date(session.startTime);
  const end = new Date(session.endTime);

  const startMinutes = start.getHours() * 60 + start.getMinutes();
  const endMinutes = end.getHours() * 60 + end.getMinutes();
  const durationPx = Math.max(((endMinutes - startMinutes) / 60) * HOUR_HEIGHT, 20);
  const topPx = ((startMinutes - START_HOUR * 60) / 60) * HOUR_HEIGHT;

  const isWork = session.type === "work";

  return (
    <button
      onClick={() => onClick(session)}
      className={`absolute left-1 right-1 overflow-hidden rounded-md border px-1.5 py-0.5 text-left transition-opacity hover:opacity-80 ${
        isWork
          ? "border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950/50 dark:text-red-300"
          : "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300"
      }`}
      style={{ top: `${topPx}px`, height: `${durationPx}px`, minHeight: "20px" }}
    >
      <span className={`block truncate font-medium ${narrow ? "text-[10px]" : "text-xs"}`}>
        {session.label}
      </span>
      {durationPx > 30 && (
        <span className={`block truncate text-[10px] opacity-70`}>
          {formatTimeFull(start)} – {formatTimeFull(end)}
        </span>
      )}
    </button>
  );
}

// --- Session Detail Modal ---
function SessionDetailModal({
  session,
  onClose,
  onDelete,
  onUpdate,
}: {
  session: Session;
  onClose: () => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, label: string) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(session.label);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const start = new Date(session.startTime);
  const end = new Date(session.endTime);
  const isWork = session.type === "work";

  function handleSave() {
    if (draft.trim()) {
      onUpdate(session.id, draft.trim());
    }
    setEditing(false);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div
        className="mx-4 w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl dark:bg-zinc-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="mb-4 flex items-start justify-between">
          <div
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              isWork
                ? "bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400"
                : "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400"
            }`}
          >
            {isWork ? "Fokus" : "Istirahat"}
          </div>
          <button
            onClick={onClose}
            className="text-zinc-400 transition-colors hover:text-zinc-600 dark:hover:text-zinc-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Label */}
        {editing ? (
          <div className="mb-4 flex gap-2">
            <input
              type="text"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSave()}
              maxLength={50}
              className="flex-1 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-900 outline-none focus:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
              autoFocus
            />
            <button
              onClick={handleSave}
              className="rounded-lg bg-zinc-900 px-3 py-2 text-xs font-medium text-white dark:bg-zinc-100 dark:text-zinc-900"
            >
              OK
            </button>
          </div>
        ) : (
          <button
            onClick={() => setEditing(true)}
            className="mb-4 text-left text-lg font-bold text-zinc-900 transition-colors hover:text-zinc-600 dark:text-zinc-100 dark:hover:text-zinc-300"
          >
            {session.label}
          </button>
        )}

        {/* Details */}
        <div className="space-y-2 text-sm text-zinc-500 dark:text-zinc-400">
          <div className="flex justify-between">
            <span>Tanggal</span>
            <span className="font-medium text-zinc-700 dark:text-zinc-300">{formatDateFull(start)}</span>
          </div>
          <div className="flex justify-between">
            <span>Waktu</span>
            <span className="font-medium text-zinc-700 dark:text-zinc-300">
              {formatTimeFull(start)} – {formatTimeFull(end)}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Durasi</span>
            <span className="font-medium text-zinc-700 dark:text-zinc-300">
              {formatMinutes(session.durationMinutes)}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-5 flex gap-3">
          {!confirmDelete ? (
            <button
              onClick={() => setConfirmDelete(true)}
              className="flex-1 rounded-lg bg-zinc-100 px-4 py-2.5 text-sm font-medium text-red-500 transition-colors hover:bg-red-50 dark:bg-zinc-800 dark:hover:bg-red-900/20"
            >
              Hapus
            </button>
          ) : (
            <button
              onClick={() => onDelete(session.id)}
              className="flex-1 rounded-lg bg-red-500 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-red-600"
            >
              Yakin Hapus?
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// --- Main Calendar Component ---
export default function CalendarView({ refreshKey }: { refreshKey: number }) {
  const [view, setView] = useState<ViewMode>("day");
  const [currentDate, setCurrentDate] = useState(() => new Date());
  const [filter, setFilter] = useState<FilterType>("all");
  const [sessions, setSessions] = useState<Session[]>([]);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);

  // Load sessions
  useEffect(() => {
    setSessions(loadSessions());
  }, [refreshKey]);

  // Navigate
  function goToday() {
    setCurrentDate(new Date());
  }

  function goPrev() {
    const d = new Date(currentDate);
    if (view === "day") d.setDate(d.getDate() - 1);
    else d.setDate(d.getDate() - 7);
    setCurrentDate(d);
  }

  function goNext() {
    const d = new Date(currentDate);
    if (view === "day") d.setDate(d.getDate() + 1);
    else d.setDate(d.getDate() + 7);
    setCurrentDate(d);
  }

  // Filtered sessions
  const weekStart = useMemo(() => getMonday(currentDate), [currentDate]);

  const visibleSessions = useMemo(() => {
    let list: Session[];
    if (view === "day") {
      list = sessions.filter((s) => isSameDay(new Date(s.startTime), currentDate));
    } else {
      const end = new Date(weekStart);
      end.setDate(end.getDate() + 7);
      list = sessions.filter((s) => {
        const d = new Date(s.startTime);
        return d >= weekStart && d < end;
      });
    }

    if (filter !== "all") {
      list = list.filter((s) => s.type === filter);
    }

    return list;
  }, [sessions, view, currentDate, weekStart, filter]);

  const totalFocus = useMemo(() => getTotalFocusMinutes(visibleSessions), [visibleSessions]);

  // Actions
  function handleDelete(id: string) {
    deleteSession(id);
    setSessions(loadSessions());
    setSelectedSession(null);
  }

  function handleUpdate(id: string, newLabel: string) {
    updateSession(id, { label: newLabel });
    setSessions(loadSessions());
    setSelectedSession((prev) => (prev?.id === id ? { ...prev, label: newLabel } : prev));
  }

  // Week days
  const weekDays = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(weekStart);
      d.setDate(d.getDate() + i);
      return d;
    });
  }, [weekStart]);

  return (
    <div className="flex h-full flex-col">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3 border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
        {/* Nav */}
        <div className="flex items-center gap-1">
          <button
            onClick={goPrev}
            className="rounded-lg p-1.5 text-zinc-500 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            onClick={goToday}
            className="rounded-lg px-2.5 py-1 text-xs font-medium text-zinc-600 transition-colors hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
          >
            Hari Ini
          </button>
          <button
            onClick={goNext}
            className="rounded-lg p-1.5 text-zinc-500 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        {/* Date label */}
        <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          {view === "day"
            ? formatDateFull(currentDate)
            : `${formatDateShort(weekDays[0])} – ${formatDateShort(weekDays[6])}`}
        </span>

        <div className="ml-auto flex items-center gap-2">
          {/* Filter */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as FilterType)}
            className="rounded-lg border border-zinc-200 bg-white px-2 py-1 text-xs text-zinc-600 outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400"
          >
            <option value="all">Semua</option>
            <option value="work">Fokus</option>
            <option value="break">Istirahat</option>
          </select>

          {/* View toggle */}
          <div className="flex rounded-lg border border-zinc-200 dark:border-zinc-700">
            <button
              onClick={() => setView("day")}
              className={`px-3 py-1 text-xs font-medium transition-colors ${
                view === "day"
                  ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                  : "text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-800"
              } rounded-l-lg`}
            >
              Hari
            </button>
            <button
              onClick={() => setView("week")}
              className={`px-3 py-1 text-xs font-medium transition-colors ${
                view === "week"
                  ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                  : "text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-800"
              } rounded-r-lg`}
            >
              Minggu
            </button>
          </div>
        </div>
      </div>

      {/* Summary bar */}
      <div className="flex items-center gap-4 border-b border-zinc-100 px-4 py-2 dark:border-zinc-800/50">
        <span className="text-xs text-zinc-400">
          {visibleSessions.length} sesi
        </span>
        <span className="text-xs text-zinc-400">·</span>
        <span className="text-xs font-medium text-red-500">
          Fokus: {formatMinutes(totalFocus)}
        </span>
      </div>

      {/* Calendar grid */}
      <div className="flex-1 overflow-auto">
        {view === "day" ? (
          <DayGrid
            sessions={visibleSessions}
            date={currentDate}
            onClickSession={setSelectedSession}
          />
        ) : (
          <WeekGrid
            sessions={visibleSessions}
            weekDays={weekDays}
            today={new Date()}
            onClickSession={setSelectedSession}
          />
        )}
      </div>

      {/* Detail modal */}
      {selectedSession && (
        <SessionDetailModal
          session={selectedSession}
          onClose={() => setSelectedSession(null)}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
}

// --- Day Grid ---
function DayGrid({
  sessions,
  date,
  onClickSession,
}: {
  sessions: Session[];
  date: Date;
  onClickSession: (s: Session) => void;
}) {
  const daySessions = sessions.filter((s) => isSameDay(new Date(s.startTime), date));

  return (
    <div className="relative flex">
      {/* Time gutter */}
      <div className="sticky left-0 z-10 w-14 flex-shrink-0 bg-white dark:bg-black">
        {HOURS.map((h) => (
          <div
            key={h}
            className="relative border-b border-zinc-100 dark:border-zinc-800/50"
            style={{ height: `${HOUR_HEIGHT}px` }}
          >
            <span className="absolute -top-2 right-2 text-[10px] text-zinc-400">
              {formatHour(h)}
            </span>
          </div>
        ))}
      </div>

      {/* Sessions column */}
      <div className="relative flex-1">
        {/* Hour lines */}
        {HOURS.map((h) => (
          <div
            key={h}
            className="border-b border-zinc-100 dark:border-zinc-800/50"
            style={{ height: `${HOUR_HEIGHT}px` }}
          />
        ))}

        {/* Session blocks */}
        {daySessions.map((session) => (
          <SessionBlock
            key={session.id}
            session={session}
            onClick={onClickSession}
          />
        ))}
      </div>
    </div>
  );
}

// --- Week Grid ---
function WeekGrid({
  sessions,
  weekDays,
  today,
  onClickSession,
}: {
  sessions: Session[];
  weekDays: Date[];
  today: Date;
  onClickSession: (s: Session) => void;
}) {
  return (
    <div className="flex">
      {/* Time gutter */}
      <div className="sticky left-0 z-10 w-14 flex-shrink-0 bg-white dark:bg-black">
        {/* Header spacer */}
        <div className="h-12 border-b border-zinc-200 dark:border-zinc-800" />
        {HOURS.map((h) => (
          <div
            key={h}
            className="relative border-b border-zinc-100 dark:border-zinc-800/50"
            style={{ height: `${HOUR_HEIGHT}px` }}
          >
            <span className="absolute -top-2 right-2 text-[10px] text-zinc-400">
              {formatHour(h)}
            </span>
          </div>
        ))}
      </div>

      {/* Day columns */}
      {weekDays.map((day, i) => {
        const isToday = isSameDay(day, today);
        const daySessions = sessions.filter((s) => isSameDay(new Date(s.startTime), day));

        return (
          <div key={i} className="flex-1 min-w-0 border-l border-zinc-100 dark:border-zinc-800/50">
            {/* Day header */}
            <div
              className={`sticky top-0 z-10 flex h-12 flex-col items-center justify-center border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-black ${
                isToday ? "bg-red-50 dark:bg-red-950/20" : ""
              }`}
            >
              <span className="text-[10px] font-medium uppercase text-zinc-400">
                {DAY_NAMES_SHORT[i]}
              </span>
              <span
                className={`text-sm font-bold ${
                  isToday ? "text-red-500" : "text-zinc-700 dark:text-zinc-300"
                }`}
              >
                {day.getDate()}
              </span>
            </div>

            {/* Hour lines + session blocks wrapper */}
            <div className="relative">
              {HOURS.map((h) => (
                <div
                  key={h}
                  className="border-b border-zinc-100 dark:border-zinc-800/50"
                  style={{ height: `${HOUR_HEIGHT}px` }}
                />
              ))}

              {/* Session blocks */}
              {daySessions.map((session) => (
                <SessionBlock
                  key={session.id}
                  session={session}
                  onClick={onClickSession}
                  narrow
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
