export interface Session {
  id: string;
  label: string;
  type: "work" | "break";
  startTime: string; // ISO string
  endTime: string; // ISO string
  durationMinutes: number;
}

const STORAGE_KEY = "antyo-pomodoro-sessions";

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function loadSessions(): Session[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

export function saveSessions(sessions: Session[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
}

export function addSession(
  session: Omit<Session, "id">,
): Session {
  const newSession: Session = { ...session, id: generateId() };
  const sessions = loadSessions();
  sessions.push(newSession);
  saveSessions(sessions);
  return newSession;
}

export function deleteSession(id: string): void {
  const sessions = loadSessions().filter((s) => s.id !== id);
  saveSessions(sessions);
}

export function updateSession(id: string, updates: Partial<Omit<Session, "id">>): void {
  const sessions = loadSessions().map((s) =>
    s.id === id ? { ...s, ...updates } : s,
  );
  saveSessions(sessions);
}

export function getSessionsForDate(date: Date): Session[] {
  const sessions = loadSessions();
  const dayStart = new Date(date);
  dayStart.setHours(0, 0, 0, 0);
  const dayEnd = new Date(date);
  dayEnd.setHours(23, 59, 59, 999);

  return sessions.filter((s) => {
    const start = new Date(s.startTime);
    return start >= dayStart && start <= dayEnd;
  });
}

export function getSessionsForWeek(weekStart: Date): Session[] {
  const sessions = loadSessions();
  const start = new Date(weekStart);
  start.setHours(0, 0, 0, 0);
  const end = new Date(start);
  end.setDate(end.getDate() + 7);

  return sessions.filter((s) => {
    const sStart = new Date(s.startTime);
    return sStart >= start && sStart < end;
  });
}

export function getTotalFocusMinutes(sessions: Session[]): number {
  return sessions
    .filter((s) => s.type === "work")
    .reduce((sum, s) => sum + s.durationMinutes, 0);
}
